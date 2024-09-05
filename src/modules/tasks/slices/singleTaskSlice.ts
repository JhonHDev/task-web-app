import { createSlice } from '@reduxjs/toolkit';
import TaskState from '../models/TaskState';

const initialState: TaskState = {
  task: null,
};

const singleTaskSlice = createSlice({
  name: 'singleTask',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.task = action.payload;
    },
    removeTask: (state) => {
      state.task = null;
    },
  },
});

export const { addTask, removeTask } = singleTaskSlice.actions;

export default singleTaskSlice;
