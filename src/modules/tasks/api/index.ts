import axios from 'axios';

const taskApi = axios.create({
  baseURL: import.meta.env.VITE_APP_TASK_BASE_API,
});

export default taskApi;
