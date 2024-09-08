import taskApi from '../api';

export interface Params {
  id: number;
  name: string;
  status: string;
  priority: string;
  description: string;
  image: string | null;
  due_date: string;
}

const updateTaskById = async (task: Params) => {
  try {
    const response = await taskApi.put(`/tasks/${task.id}`, JSON.stringify(task), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default updateTaskById;
