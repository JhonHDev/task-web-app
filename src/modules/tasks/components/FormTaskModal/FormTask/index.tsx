import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { RootState } from '../../../../../config/redux/store';
import { TaskPriority, TaskStatus } from '../../../models/Task';
import { showQuestionAlert } from '../../../../../shared/helpers/alerts';

interface Props {
  isToUpdate: boolean;
}

type FormFiels = {
  name: string;
  date: string;
  description: string;
  priority: string;
  status: string;
  img: string;
};

const FormTask = ({ isToUpdate }: Props) => {
  const { task } = useSelector((state: RootState) => state.singleTask);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormFiels>();

  useEffect(() => {
    if (task) {
      setValue('name', task.name);
      setValue('description', task.description);
      setValue('date', task.due_date);
      setValue('priority', task.priority);
      setValue('status', task.status);
    }
  }, [task, setValue]);

  const onSubmit = async () => {
    const result = await showQuestionAlert('¿Actualizar tarea?');

    if (!result.isConfirmed) {
      return;
    }
  };

  const handleDeleteTask = async () => {
    const result = await showQuestionAlert('Eliminar tarea?');

    if (!result.isConfirmed) {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <h2 className="text-2xl font-medium px-6">{isToUpdate ? 'Actualizar tarea' : 'Crear tarea'}</h2>

      <div className="grid gap-8 h-[400px] overflow-y-scroll pt-4 pb-6 px-6">
        <div className="grid gap-4">
          {task?.image ? (
            <img src={task.image} alt="Imagen de la tarea" width={190} height={190} className="rounded-md" />
          ) : (
            <div className="w-[190px] h-[190px] bg-gray-200 border"></div>
          )}

          <input type="file" id="" accept="image/*" {...register('img')} />
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            className="border w-full rounded-lg py-2 px-4"
            {...register('name', {
              required: {
                value: true,
                message: 'El nombre es requerida',
              },
            })}
          />

          {errors.name && <span className="text-red-500 -mt-2">{errors.name.message}</span>}

          <input
            type="date"
            className="border py-2 px-6 rounded-lg w-[240px] cursor-pointer"
            {...register('date', {
              required: {
                value: true,
                message: 'El fecha es requerida',
              },
            })}
          />

          {errors.date && <span className="text-red-500 -mt-2">{errors.date.message}</span>}

          <textarea
            placeholder="Descripción"
            className="border w-full rounded-lg py-2 px-4"
            {...register('description', {
              required: {
                value: true,
                message: 'La descripción es requerida',
              },
            })}
          ></textarea>

          {errors.description && <span className="text-red-500 -mt-2">{errors.description.message}</span>}

          <select
            className="p-2 border rounded-lg w-[240px] px-1 cursor-pointer select-style"
            {...register('priority', {
              required: {
                value: true,
                message: 'Elige una opción ',
              },
            })}
          >
            <option value="">Elegir Prioridad</option>
            {Object.values(TaskPriority).map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>

          {errors.priority && <span className="text-red-500 -mt-2">{errors.priority.message}</span>}

          <select
            className="p-2 border rounded-lg w-[240px] px-1 cursor-pointer select-style"
            {...register('status', {
              required: {
                value: true,
                message: 'Elige una opción ',
              },
            })}
          >
            <option value="">Elegir Estado</option>
            {Object.values(TaskStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {errors.status && <span className="text-red-500 -mt-2">{errors.status.message}</span>}

          <div className="flex justify-between py-5">
            <button type="submit" className="px-6 py-2 rounded-md bg-blue-500 text-white">
              Actualizar
            </button>

            <button onClick={handleDeleteTask} type="button" className="px-8 py-2 rounded-md bg-red-500 text-white">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormTask;
