import taskApi from '../api';

export interface Params {
  name: string;
  status: string;
  priority: string;
  description: string;
  image: string | null;
  created_at: string;
  due_date: string;
}

const createNewTask = async (task: Params) => {
  try {
    const response = await taskApi.post('/tasks', JSON.stringify(task), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default createNewTask;
