import taskApi from '../api';

import { Task } from '../models/Task';

const getAllTasks = async () => {
  try {
    const response = await taskApi.get('tasks');
    return response.data as Task[];
  } catch (error) {
    console.log(error);
  }
};

export default getAllTasks;
