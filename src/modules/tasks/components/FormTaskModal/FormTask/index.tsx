import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { RootState } from '../../../../../config/redux/store';
import { TaskPriority, TaskStatus } from '../../../models/Task';
import { showQuestionAlert } from '../../../../../shared/helpers/alerts';
import { saveTaskImgInCloudinary } from '../../../../../shared/services/cloudinary';

import useCreateTaskMutation from '../../../hooks/useCreateTaskMutation';
import useDeleteTaskMutation from '../../../hooks/useDeleteTaskMutation';
import useUpdateTaskMutation from '../../../hooks/useUpdateTaskMutation';

type FormFiels = {
  name: string;
  date: string;
  description: string;
  priority: string;
  status: string;
  img: string;
};

interface Props {
  isToUpdate: boolean;
  closeModal: () => void;
}

const FormTask = ({ isToUpdate, closeModal }: Props) => {
  const { task } = useSelector((state: RootState) => state.singleTask);

  const taskId = task?.id as number;

  const taskCreateMutation = useCreateTaskMutation({ closeModal });
  const taskDeleteMutation = useDeleteTaskMutation({ closeModal });
  const taskUpdateMutation = useUpdateTaskMutation({ closeModal });

  const [previewTaskImg, setPreviewTaskImg] = useState<string>();
  const [selectedTaskFileImg, setSelectedTaskFileImg] = useState<File>();
  const [isSavingImg, setIsSavingImg] = useState(false);

  const minDate = task
    ? new Date(task.created_at as string).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormFiels>();

  useEffect(() => {
    if (task && isToUpdate) {
      setValue('name', task.name);
      setValue('description', task.description);
      setValue('date', task.due_date);
      setValue('priority', task.priority);
      setValue('status', task.status);
      return;
    }
  }, [isToUpdate, task, setValue]);

  const removeSelectedFileImg = () => {
    const inputImgFile = document.getElementById('inputImgFile') as HTMLInputElement;
    inputImgFile.value = '';

    setPreviewTaskImg(undefined);
    setSelectedTaskFileImg(undefined);
  };

  const handleCreateTask = async () => {
    const result = await showQuestionAlert('¿Crear tarea?');

    if (!result.isConfirmed) {
      return;
    }

    const { name, date: due_date, description, priority, status } = getValues();

    let image;

    if (selectedTaskFileImg) {
      setIsSavingImg(true);
      image = await saveTaskImgInCloudinary(selectedTaskFileImg);
      setIsSavingImg(false);
    }

    taskCreateMutation.mutate({
      name,
      due_date,
      description,
      priority,
      status,
      image: image?.secure_url || null,
      created_at: new Date().toISOString(),
    });
  };

  const handleUpdateTask = async () => {
    const result = await showQuestionAlert('¿Actualizar tarea?');

    if (!result.isConfirmed) {
      return;
    }

    const { name, date: due_date, description, priority, status } = getValues();

    if (selectedTaskFileImg) {
      setIsSavingImg(true);
      const image = await saveTaskImgInCloudinary(selectedTaskFileImg);
      setIsSavingImg(false);

      taskUpdateMutation.mutate({
        id: taskId,
        name,
        due_date,
        description,
        priority,
        status,
        image: image?.secure_url || null,
      });

      return;
    }

    taskUpdateMutation.mutate({
      id: taskId,
      name,
      due_date,
      description,
      priority,
      status,
      image: task?.image || null,
    });
  };

  const handleDeleteTask = async () => {
    const result = await showQuestionAlert('¿Eliminar tarea?');

    if (!result.isConfirmed) {
      return;
    }

    taskDeleteMutation.mutate(taskId);
  };

  const onSubmit = async () => {
    if (isToUpdate) {
      await handleUpdateTask();
      return;
    }

    await handleCreateTask();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <h2 className="text-2xl font-medium px-6">{isToUpdate ? 'Actualizar tarea' : 'Crear tarea'}</h2>

      <div className="grid gap-8 h-[400px] overflow-y-scroll pt-4 pb-6 px-6">
        <div className="grid gap-4">
          {task?.image && !previewTaskImg && (
            <img src={task.image} alt="Imagen de la tarea" width={190} height={190} className="rounded-md" />
          )}

          {previewTaskImg && (
            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={removeSelectedFileImg}
                className="text-red-600 relative right-0"
                type="button"
                title="Remover imagen"
              >
                X
              </button>

              <img src={previewTaskImg} alt="Imagen de la tarea" width={190} height={190} className="rounded-md" />
            </div>
          )}

          <input
            type="file"
            id="inputImgFile"
            accept="image/*"
            className="w-full max-w-[300px]  md:max-w-[240px] lg:max-w-[360px]"
            disabled={selectedTaskFileImg ? true : false}
            {...register('img', {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];

                if (!file) {
                  setPreviewTaskImg('');
                  return;
                }

                setSelectedTaskFileImg(file);

                const imageUrl = URL.createObjectURL(file);
                setPreviewTaskImg(imageUrl);
              },
            })}
          />
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            className="border w-full rounded-lg py-2 px-4"
            {...register('name', {
              required: {
                value: true,
                message: 'El nombre es requerido',
              },
              minLength: {
                value: 3,
                message: 'Mínimo 3 caracteres',
              },
              maxLength: {
                value: 50,
                message: 'Máximo 50 caracteres',
              },
              pattern: {
                value: /^(?![ _])(?!.*[ _]$).*$/,
                message: 'Nombre no válido',
              },
            })}
          />

          {errors.name && <span className="text-red-500 -mt-2">{errors.name.message}</span>}

          <input
            type="date"
            min={minDate}
            className="border py-2 px-6 rounded-lg w-[240px] cursor-pointer"
            {...register('date', {
              required: {
                value: true,
                message: 'La fecha es requerida',
              },
            })}
          />

          {errors.date && <span className="text-red-500 -mt-2">{errors.date.message}</span>}

          <textarea
            placeholder="Descripción"
            className="border w-full rounded-lg py-2 px-4"
            {...register('description', {
              maxLength: {
                value: 120,
                message: 'Máximo 120 caracteres',
              },
            })}
          ></textarea>

          {errors.description && <span className="text-red-500 -mt-2">{errors.description.message}</span>}

          <div className="relative cursor-pointer">
            <select
              defaultValue={TaskPriority.Low}
              className=" relative w-full max-w-[200px] px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent cursor-pointer"
              {...register('priority', {
                required: {
                  value: true,
                  message: 'Prioridad requerida',
                },
              })}
            >
              <option value="" disabled>
                Elegir Prioridad
              </option>

              {Object.values(TaskPriority).map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>

            <svg
              className="absolute right-2/4 sm:left-1/3 sm:right-0  top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {errors.priority && <span className="text-red-500 -mt-2">{errors.priority.message}</span>}

          <div className="relative cursor-pointer">
            <select
              defaultValue={TaskStatus.ToDo}
              className=" relative w-full max-w-[200px] px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent cursor-pointer"
              {...register('status', {
                required: {
                  value: true,
                  message: 'Estado requerido',
                },
              })}
            >
              <option value="" disabled>
                Elegir Estado
              </option>

              {Object.values(TaskStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <svg
              className="absolute  right-2/4 sm:left-1/3 sm:right-0  top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {errors.status && <span className="text-red-500 -mt-2">{errors.status.message}</span>}

          <div className="flex flex-col gap-4 md:flex-row justify-between py-5">
            {isToUpdate ? (
              <button
                disabled={isSavingImg || taskUpdateMutation.isPending || taskDeleteMutation.isPending}
                type="submit"
                className={`w-full max-w-[280px] md:max-w-[180px] px-6 py-2 rounded-md text-white ${taskUpdateMutation.isPending || taskDeleteMutation.isPending ? 'bg-[#3b82f6b8]' : 'bg-blue-500'}`}
              >
                {isSavingImg || taskUpdateMutation.isPending ? 'Actualizando...' : 'Actualizar'}
              </button>
            ) : (
              <button
                disabled={isSavingImg || taskCreateMutation.isPending || taskDeleteMutation.isPending}
                type="submit"
                className={`w-full max-w-[280px] md:max-w-[180px] px-6 py-2 rounded-md text-white ${taskCreateMutation.isPending || taskDeleteMutation.isPending ? 'bg-[#3b82f6b8]' : 'bg-blue-500'} `}
              >
                {isSavingImg || taskCreateMutation.isPending ? 'Creando...' : 'Crear'}
              </button>
            )}

            {isToUpdate && (
              <button
                disabled={taskDeleteMutation.isPending || taskCreateMutation.isPending || taskUpdateMutation.isPending}
                onClick={handleDeleteTask}
                type="button"
                className={`w-full max-w-[280px] md:max-w-[180px] px-8 py-2 rounded-md text-white ${taskDeleteMutation.isPending || taskCreateMutation.isPending || taskUpdateMutation.isPending ? 'bg-[#ef4444b0]' : 'bg-red-500'} `}
              >
                {taskDeleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormTask;
