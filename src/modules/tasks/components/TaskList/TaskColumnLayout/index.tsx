import { GroupByState } from '../../../models/GroupByState';
import { TaskPriority, TaskStatus } from '../../../models/Task';
import { TypeOfColumn } from '../../../models/TypeOfColumn';

interface Props {
  groupBy: GroupByState;
  taskPriority: TaskPriority;
  taskStatus: TaskStatus;
  taskListLength: number;
  typeOfColumn: TypeOfColumn;
  children: React.ReactNode;
}

const TaskColumnLayout = ({ groupBy, taskPriority, taskStatus, taskListLength, typeOfColumn, children }: Props) => {
  return (
    <div className="flex flex-col self-start gap-3 w-full md:max-w-[300px] 2xl:max-w-[360px] ">
      {groupBy === GroupByState.Priority ? (
        <h3 className="text-xl text-gray-700">
          <span className="font-semibold">{taskPriority}:</span> {taskListLength}
        </h3>
      ) : (
        <h3 className="text-xl text-gray-700">
          <span className="font-semibold">{taskStatus}:</span> {taskListLength}
        </h3>
      )}

      <div
        id={typeOfColumn}
        className="min-h-[200px]  bg-[#F4F5F7] flex flex-col gap-4 rounded-sm justify-center items-center py-5 px-4"
      >
        {children}
      </div>
    </div>
  );
};

export default TaskColumnLayout;
