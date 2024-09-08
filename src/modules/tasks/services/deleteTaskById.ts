import taskApi from '../api';

const deleteTaskById = async (taskId: number) => {
  try {
    const response = await taskApi.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default deleteTaskById;
