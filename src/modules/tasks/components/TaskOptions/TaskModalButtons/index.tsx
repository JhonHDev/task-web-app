import { useDispatch } from 'react-redux';

import { GroupByState } from '../../../models/GroupByState';
import { changeGroupTaskState } from '../../../slices/groupTasksSlice';

interface Props {
  openCreateTaskModal: () => void;
  openFilterTasksModal: () => void;
}

const TaskModalButtons = ({ openCreateTaskModal }: Props) => {
  const dispatch = useDispatch();

  const handleSelectGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const groupBy = e.target.value;

    if (!groupBy.trim()) {
      return;
    }

    dispatch(changeGroupTaskState(groupBy));
  };

  return (
    <div className="w-full md:w-auto flex justify-start items-center gap-4">
      <button
        onClick={openCreateTaskModal}
        className="bg-blue-500 text-white border rounded-lg py-2 px-10 flex justify-center items-center gap-4"
        type="button"
        title="Abrir modal de crear tarea"
      >
        Crear <span>+</span>
      </button>

      {/* <button
        onClick={openFilterTasksModal}
        className="text-[#333] border rounded-lg py-2 px-10 flex justify-center items-center gap-4"
        type="button"
        title="Abrir modal de filtros"
      >
        Filtrar <span>{'v'}</span>
      </button> */}

      <select
        onChange={handleSelectGroupChange}
        className="text-[#333] border rounded-lg py-3 px-4 flex justify-center items-center gap-4 cursor-pointer"
      >
        <option value="">Agrupar por:</option>
        <option value={GroupByState.Priority}>Prioridad</option>
        <option value={GroupByState.Status}>Estado</option>
      </select>
    </div>
  );
};

export default TaskModalButtons;
