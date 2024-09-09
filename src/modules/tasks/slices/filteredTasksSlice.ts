import { createSlice } from '@reduxjs/toolkit';
import { Task, TaskPriority, TaskStatus } from '../models/Task';

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

interface FilterTasksPayload {
  name?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}

const filteredTasksSlice = createSlice({
  name: 'filteredTasks',
  initialState,
  reducers: {
    addInitalTasks: (state, action) => {
      state.initialTasks = action.payload;
      state.filteredTasks = action.payload;
    },
    filterTasks: (state, action: { payload: FilterTasksPayload }) => {
      const { name, priority, status } = action.payload;

      const filterTaskListFn = (task: Task) => {
        const matchesName = name ? task.name.toLowerCase().includes(name.toLowerCase()) : true;
        const matchesPriority = priority ? task.priority === priority : true;
        const matchesStatus = status ? task.status === status : true;

        return matchesName && matchesPriority && matchesStatus;
      };

      state.filteredTasks.arrayOne = state.initialTasks.arrayOne.filter(filterTaskListFn);
      state.filteredTasks.arrayTwo = state.initialTasks.arrayTwo.filter(filterTaskListFn);
      state.filteredTasks.arrayThree = state.initialTasks.arrayThree.filter(filterTaskListFn);
    },
    resetFilters: (state) => {
      state.filteredTasks = state.initialTasks;
    },
  },
});

export const { addInitalTasks, filterTasks, resetFilters } = filteredTasksSlice.actions;

export default filteredTasksSlice;
