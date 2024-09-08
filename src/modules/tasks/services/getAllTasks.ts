import taskApi from '../api';
import groupTasksByPriorityOrState from '../helpers/groupTasksByPriorityOrState';

import { Task } from '../models/Task';
import { GroupByState } from '../models/GroupByState';

interface Params {
  groupBy: string;
}

const getAllTasks = async ({ groupBy }: Params) => {
  try {
    const response = await taskApi.get('/tasks');
    const tasks = (await response.data) as Task[];

    if (groupBy === GroupByState.Priority) {
      return groupTasksByPriorityOrState({ tasks, groupTasksBy: GroupByState.Priority });
    }

    if (groupBy === GroupByState.Status) {
      return groupTasksByPriorityOrState({ tasks, groupTasksBy: GroupByState.Status });
    }
  } catch (error) {
    console.log(error);
  }
};

export default getAllTasks;
