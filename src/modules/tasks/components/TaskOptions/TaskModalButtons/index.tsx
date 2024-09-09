import { useDispatch, useSelector } from 'react-redux';

import { GroupByState } from '../../../models/GroupByState';
import { changeGroupTaskState } from '../../../slices/groupTasksSlice';
import { RootState } from '../../../../../config/redux/store';

interface Props {
  openCreateTaskModal: () => void;
  openFilterTasksModal: () => void;
}

const TaskModalButtons = ({ openCreateTaskModal }: Props) => {
  const dispatch = useDispatch();

  const { groupBy } = useSelector((state: RootState) => state.groupTasksState);

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

      <div className="relative cursor-pointer">
        <select
          onChange={handleSelectGroupChange}
          value={groupBy}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent cursor-pointer"
        >
          <option value="" disabled selected>
            Agrupar por:
          </option>
          <option value={GroupByState.Priority}>Prioridad</option>
          <option value={GroupByState.Status}>Estado</option>
        </select>

        <svg
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default TaskModalButtons;
