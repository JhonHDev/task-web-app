import { useDispatch } from 'react-redux';

import formatDateToDMY from '../../../../shared/helpers/formatDateToDMY';
import useModal from '../../../../shared/hooks/useModal';

import { Task } from '../../models/Task';
import { TypeOfColumn } from '../../models/TypeOfColumn';

import { addTask } from '../../slices/singleTaskSlice';

import FormTaskModal from '../FormTaskModal';
import TaskDropArea from '../TaskDropArea';

interface Props {
  task: Task;
  setActiveCardId: React.Dispatch<React.SetStateAction<number>>;
  setOldColumnId: React.Dispatch<React.SetStateAction<TypeOfColumn | undefined>>;
  handleOnDropTask: () => void;
}

const TaskCard = ({ task, setActiveCardId, setOldColumnId, handleOnDropTask }: Props) => {
  const dispatch = useDispatch();

  const formTaskModal = useModal();

  const handleOpenModalToUpdateTask = () => {
    dispatch(addTask(task));
    formTaskModal.openModal();
  };

  return (
    <>
      <article
        draggable
        onDragStart={(e: React.DragEvent<HTMLElement>) => {
          setActiveCardId(task.id);
          const oldColumnId = (e.target as HTMLElement).parentElement?.id as TypeOfColumn;
          setOldColumnId(oldColumnId);
        }}
        onDragEnd={() => setActiveCardId(0)}
        onClick={handleOpenModalToUpdateTask}
        className="w-full max-w-[274px] bg-white border py-4 px-6 cursor-pointer shadow rounded-sm hover:scale-105 transition-all"
      >
        <div className="flex flex-col gap-6">
          <div className="flex justify-start gap-2 items-center">
            {task.image ? (
              <div className="w-[40px] h-[40px] border rounded-full overflow-hidden flex justify-center items-center">
                <img src={task.image} alt="Imagen de una tarea" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-[40px] h-[40px] border rounded-full overflow-hidden flex justify-center items-center">
                <img
                  src={'/images/img-deafult.jpg'}
                  alt="Imagen de una tarea"
                  className="w-full object-center object-cover"
                />
              </div>
            )}

            <h3 className="font-bold capitalize text-md">{task.name}</h3>
          </div>

          <div>
            <p className="capitalize text-sm">{task.description}</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-start items-start">
              <span className="text-sm font-semibold">Prioridad</span>
              <span className="text-sm font-light">{task.priority}</span>
            </div>

            <div className="flex flex-col justify-start items-end">
              <span className="text-sm font-semibold">Estado</span>
              <span className="text-sm font-light">{task.status}</span>
            </div>
          </div>

          <div className="flex justify-end">
            <span className="text-gray-400 text-sm">{formatDateToDMY(task.due_date)}</span>
          </div>
        </div>
      </article>

      <TaskDropArea handleOnDropTask={handleOnDropTask} />

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
