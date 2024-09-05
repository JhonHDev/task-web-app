import { useQuery } from '@tanstack/react-query';

import TaskCard from '../TaskCard';
import getAllTasks from '../../services/getAllTasks';

const TaskList = () => {
  const { data: tasks, isFetching } = useQuery({
    queryKey: ['getAllTasks'],
    queryFn: getAllTasks,
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
    <section className="flex flex-wrap gap-8 md:gap-4 lg:gap-5 justify-start items-center">
      {tasks && tasks.map((task) => <TaskCard key={task.id} task={task} />)}
    </section>
  );
};

export default TaskList;
