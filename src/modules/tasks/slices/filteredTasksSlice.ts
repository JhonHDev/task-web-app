import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../models/Task';

interface FilteredTasksState {
  initialTasks: {
    arrayOne: Task[] | [];
    arrayTwo: Task[] | [];
    arrayThree: Task[] | [];
  };
  filteredTasks: {
    arrayOne: Task[] | [];
    arrayTwo: Task[] | [];
    arrayThree: Task[] | [];
  };
}

const initialState: FilteredTasksState = {
  initialTasks: {
    arrayOne: [],
    arrayTwo: [],
    arrayThree: [],
  },
  filteredTasks: {
    arrayOne: [],
    arrayTwo: [],
    arrayThree: [],
  },
};

const filteredTasksSlice = createSlice({
  name: 'filteredTasks',
  initialState,
  reducers: {
    addInitalTasks: (state, action) => {
      state.initialTasks = action.payload;
      state.filteredTasks = action.payload;
    },
    filterTasksByName: (state, action) => {
      const searchTerm = action.payload.toLowerCase();

      state.filteredTasks.arrayOne = state.initialTasks.arrayOne.filter((task) =>
        task.name.toLowerCase().includes(searchTerm)
      );

      state.filteredTasks.arrayTwo = state.initialTasks.arrayTwo.filter((task) =>
        task.name.toLowerCase().includes(searchTerm)
      );

      state.filteredTasks.arrayThree = state.initialTasks.arrayThree.filter((task) =>
        task.name.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const { addInitalTasks, filterTasksByName } = filteredTasksSlice.actions;

export default filteredTasksSlice;
