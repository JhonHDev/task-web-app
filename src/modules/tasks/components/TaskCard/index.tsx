import formatDateToDMY from '../../../../shared/helpers/formatDateToDMY';
import { Task } from '../../models/Task';

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  return (
    <article className="relative w-full h-[524px] md:max-w-[280px] md:h-[400px] lg:max-w-[280px] lg:min-h-[400px]  shadow-md">
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
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <span className="font-medium">Estado: </span>
            <span className="border py-1 px-3 rounded-full text-sm">{task.status}</span>
          </div>

          <div className="flex gap-2">
            <label htmlFor={task.id.toString()} className="cursor-pointer">
              <span>Seleccionar: </span>
              <input type="checkbox" name="" id={task.id.toString()} className="px-1 cursor-pointer" />
            </label>
          </div>
        </div>

        <h4 className="font-bold">{task.name}</h4>
        <p className="md:w-[260px] break-words">{task.description}</p>

        <div className="absolute w-full bottom-0 left-0 px-3 flex justify-between items-center py-2">
          <div className="flex">
            Priodad: <span className="px-1">{task.priority}</span>
          </div>

          <div className="flex">
            <span className="text-gray-400">{formatDateToDMY(task.created_at)}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
