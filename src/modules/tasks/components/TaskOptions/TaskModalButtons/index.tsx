import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../../config/redux/store';
import { GroupByState } from '../../../models/GroupByState';
import { TaskPriority, TaskStatus } from '../../../models/Task';

import { changeGroupTaskState } from '../../../slices/groupTasksSlice';
import { filterTasks, resetFilters } from '../../../slices/filteredTasksSlice';

const TaskModalButtons = () => {
  const dispatch = useDispatch();

  const { groupBy } = useSelector((state: RootState) => state.groupTasksState);

  const [priority, setPriority] = useState<TaskPriority | ''>('');
  const [status, setStatus] = useState<TaskStatus | ''>('');

  useEffect(() => {
    setPriority('');
    setStatus('');
    dispatch(resetFilters());
  }, [groupBy, dispatch]);

  const handleSelectGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const groupBy = e.target.value;

    if (!groupBy) {
      return;
    }

    dispatch(changeGroupTaskState(groupBy));
  };

  const handleSelectPriorityState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = e.target.value as TaskPriority;
    setPriority(priority);

    dispatch(
      filterTasks({
        priority,
      })
    );
  };

  const handleSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;
    setStatus(status);

    dispatch(
      filterTasks({
        status,
      })
    );
  };

  const handleResetTaskFilters = () => {
    setPriority('');
    setStatus('');
    dispatch(resetFilters());
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full md:w-auto flex justify-start items-center gap-4">
        <div className="flex flex-wrap gap-3">
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

          <div className="relative cursor-pointer">
            <select
              value={priority}
              onChange={handleSelectPriorityState}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent cursor-pointer"
            >
              <option value="" disabled selected>
                Filtrar por prioridad:
              </option>

              {Object.values(TaskPriority).map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
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

          <div className="relative cursor-pointer">
            <select
              value={status}
              onChange={handleSelectStatus}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent cursor-pointer"
            >
              <option value="" disabled selected>
                Filtrar por estado:
              </option>

              {Object.values(TaskStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
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
      </div>

      <div className="flex flex-wrap gap-4">
        {priority && (
          <span className="border py-1 px-6 min-w-[100px] text-center rounded-full hover:scale-105 transition-all hover:shadow cursor-pointer">
            {priority}
          </span>
        )}

        {status && (
          <span className="border py-1 px-6 min-w-[100px] text-center rounded-full hover:scale-105 transition-all hover:shadow cursor-pointer">
            {status}
          </span>
        )}

        {(priority || status) && (
          <button
            onClick={handleResetTaskFilters}
            className="text-red-400 hover:scale-150 transition-all"
            type="button"
            title="Limpiar filtro"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskModalButtons;
