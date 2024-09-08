import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../config/redux/store';
import { TaskPriority, TaskStatus } from '../../models/Task';
import { GroupByState } from '../../models/GroupByState';

import getAllTasks from '../../services/getAllTasks';

import TaskCard from '../TaskCard';

const TaskList = () => {
  const { groupBy } = useSelector((state: RootState) => state.groupTasksState);

  const { data: tasks, isFetching } = useQuery({
    queryKey: ['getAllTasks', { groupBy }],
    queryFn: () => getAllTasks({ groupBy }),
    staleTime: 3600000, // Fresh data by 1 Hour
  });

  if (isFetching) {
    return (
      <section className="flex flex-wrap gap-8 md:gap-4 lg:gap-5 justify-center items-center m-auto w-full">
        <div className="flex items-center justify-cente">
          <div className="relative">
            <div className="w-[90px] h-[90px] border-t-8 border-b-8 border-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {groupBy === GroupByState.Priority ? (
        <h2 className="text-2xl font-medium text-gray-800">Tareas por prioridad</h2>
      ) : (
        <h2 className="text-2xl font-medium text-gray-800">Tareas por estado</h2>
      )}

      <section className="flex flex-wrap gap-6 md:gap-4 lg:gap-5 justify-start items-center animate__animated animate__fadeIn">
        {tasks && (
          <>
            <div className="flex flex-col self-start gap-3 w-full md:max-w-[260px] 2xl:max-w-[300px] ">
              {groupBy === GroupByState.Priority ? (
                <h3 className="text-xl text-gray-700">
                  {TaskPriority.Low}: {tasks.arrayOne.length}
                </h3>
              ) : (
                <h3 className="text-xl text-gray-700">
                  {TaskStatus.ToDo}: {tasks.arrayOne.length}
                </h3>
              )}

              <div className="min-h-[200px]  bg-[#F4F5F7] flex flex-col gap-4 rounded-sm justify-center items-center py-5 px-4">
                {tasks.arrayOne.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            <div className="flex flex-col self-start gap-3 w-full md:max-w-[260px] 2xl:max-w-[300px]">
              {groupBy === GroupByState.Priority ? (
                <h3 className="text-xl text-gray-700">
                  {TaskPriority.Medium}: {tasks.arrayTwo.length}
                </h3>
              ) : (
                <h3 className="text-xl text-gray-700">
                  {TaskStatus.InProgress} : {tasks.arrayTwo.length}
                </h3>
              )}

              <div className=" min-h-[200px]  bg-[#F4F5F7] flex flex-col gap-4 rounded-sm justify-center items-center py-5 px-4">
                {tasks.arrayTwo.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            <div className="flex flex-col self-start gap-3 w-full md:max-w-[260px] 2xl:max-w-[300px]">
              {groupBy === GroupByState.Priority ? (
                <h3 className="text-xl text-gray-700">
                  {TaskPriority.High}: {tasks.arrayThree.length}
                </h3>
              ) : (
                <h3 className="text-xl text-gray-700">
                  {TaskStatus.Completed}: {tasks.arrayThree.length}
                </h3>
              )}

              <div className=" min-h-[200px]  bg-[#F4F5F7] flex flex-col gap-4 rounded-sm justify-center items-center py-5 px-4">
                {tasks.arrayThree.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default TaskList;
