import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../config/redux/store';
import { TaskPriority, TaskStatus } from '../../models/Task';
import { GroupByState } from '../../models/GroupByState';

import getAllTasks from '../../services/getAllTasks';

//import TaskCard from '../TaskCard';

const TaskList = () => {
  const { groupBy } = useSelector((state: RootState) => state.groupTasksState);

  const { data: tasks, isFetching } = useQuery({
    queryKey: ['getAllTasks', { groupBy }],
    queryFn: () => getAllTasks({ groupBy }),
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
      {groupBy === GroupByState.Priority ? <h1>Tareas por Prioridad</h1> : <h3>Tareas por Estado</h3>}

      <section className="flex flex-wrap gap-8 md:gap-4 lg:gap-5 justify-start items-center animate__animated animate__fadeIn">
        {tasks && (
          <>
            <div className="flex flex-col gap-3 w-full md:max-w-[300px]">
              {groupBy === GroupByState.Priority ? <div>{TaskPriority.Low}</div> : <div>{TaskStatus.ToDo}</div>}

              <div className=" min-h-[500px]  bg-[#F4F5F7]">
                {tasks.arrayOne.map((task) => (
                  <div key={task.id}>
                    {task.name} - {task.priority} {task.status}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:max-w-[300px]">
              {groupBy === GroupByState.Priority ? (
                <div>{TaskPriority.Medium}</div>
              ) : (
                <div>{TaskStatus.InProgress}</div>
              )}

              <div className=" min-h-[500px]  bg-[#F4F5F7]">
                {tasks.arrayTwo.map((task) => (
                  <div key={task.id}>
                    {task.name} - {task.priority} {task.status}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:max-w-[300px]">
              {groupBy === GroupByState.Priority ? <div>{TaskPriority.High}</div> : <div>{TaskStatus.Completed}</div>}

              <div className=" min-h-[500px]  bg-[#F4F5F7]">
                {tasks.arrayThree.map((task) => (
                  <div key={task.id}>
                    {task.name} - {task.priority} {task.status}
                  </div>
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
