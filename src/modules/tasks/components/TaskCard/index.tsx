import { useDispatch } from 'react-redux';
import formatDateToDMY from '../../../../shared/helpers/formatDateToDMY';
import useModal from '../../../../shared/hooks/useModal';

import { Task } from '../../models/Task';
import { addTask } from '../../slices/singleTaskSlice';

import FormTaskModal from '../FormTaskModal';

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const dispatch = useDispatch();

  const formTaskModal = useModal();

  const handleOpenModalToUpdateTask = () => {
    dispatch(addTask(task));
    formTaskModal.openModal();
  };

  return (
    <>
      <article
        onClick={handleOpenModalToUpdateTask}
        className="relative w-full h-[524px] md:max-w-[280px] md:h-[400px] lg:max-w-[280px] lg:min-h-[400px] shadow-md cursor-pointer hover:scale-105 transition-all"
      >
        {task.image ? (
          <img
            src={task.image}
            alt="Imagen de una tarea"
            title={`Tarea: ${task.name}`}
            className="rounded-t-md overflow-hidden"
          />
        ) : (
          <div className="w-full h-full bg-gray-600"></div>
        )}

        <div className="p-3 flex flex-col gap-2">
          <h4 className="font-bold">{task.name}</h4>
          <p className="md:w-[260px] break-words">{task.description}</p>

          <div className="flex justify-start items-center">
            <div className="flex justify-start items-center gap-2">
              <span className="font-medium">Estado: </span>
              <span className="border py-1 px-3 rounded-full text-sm">{task.status}</span>
            </div>

            {/* <div className="flex gap-2">
              <label htmlFor={task.id.toString()} className="cursor-pointer">
                <span>Seleccionar: </span>
                <input type="checkbox" name="" id={task.id.toString()} className="px-1 cursor-pointer" />
              </label>
            </div> */}
          </div>

          <div className="absolute w-full bottom-0 left-0 px-3 flex justify-between items-center pb-2">
            <div className="flex">
              Priodad: <span className="px-1 font-light">{task.priority}</span>
            </div>

            <div className="flex">
              <span className="text-gray-400">{formatDateToDMY(task.created_at)}</span>
            </div>
          </div>
        </div>
      </article>

      {formTaskModal.isModalOpen && (
        <FormTaskModal
          isModalOpen={formTaskModal.isModalOpen}
          openModal={formTaskModal.openModal}
          closeModal={formTaskModal.closeModal}
          isToUpdate
        />
      )}
    </>
  );
};

export default TaskCard;
