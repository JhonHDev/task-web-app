import { GroupByState } from '../models/GroupByState';
import { Task, TaskPriority, TaskStatus } from '../models/Task';

interface TaskObjectArray {
  0: Task[];
  1: Task[];
  2: Task[];
}

interface Params {
  tasks: Task[];
  groupTasksBy: GroupByState;
}

const groupTasksByPriorityOrState = ({ tasks, groupTasksBy }: Params) => {
  const taskObjectArray: TaskObjectArray = {
    0: [],
    1: [],
    2: [],
  };

  tasks.forEach((task) => {
    if (groupTasksBy === GroupByState.Priority) {
      switch (task.priority) {
        case TaskPriority.Low:
          taskObjectArray[0] = [task, ...taskObjectArray[0]];
          break;

        case TaskPriority.Medium:
          taskObjectArray[1] = [task, ...taskObjectArray[1]];
          break;

        case TaskPriority.High:
          taskObjectArray[2] = [task, ...taskObjectArray[2]];
          break;

        default:
          break;
      }
    }

    if (groupTasksBy === GroupByState.Status) {
      switch (task.status) {
        case TaskStatus.ToDo:
          taskObjectArray[0] = [task, ...taskObjectArray[0]];
          break;

        case TaskStatus.InProgress:
          taskObjectArray[1] = [task, ...taskObjectArray[1]];
          break;

        case TaskStatus.Completed:
          taskObjectArray[2] = [task, ...taskObjectArray[2]];
          break;

        default:
          break;
      }
    }
  });

  return {
    arrayOne: taskObjectArray[0],
    arrayTwo: taskObjectArray[1],
    arrayThree: taskObjectArray[2],
  };
};

export default groupTasksByPriorityOrState;
