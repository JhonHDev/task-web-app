import { createSlice } from '@reduxjs/toolkit';
import { GroupByState } from '../models/GroupByState';

interface GroupTaskState {
  groupBy: GroupByState;
}

const initialState: GroupTaskState = {
  groupBy: GroupByState.Priority,
};

const groupTasksSlice = createSlice({
  name: 'groupTasks',
  initialState,
  reducers: {
    changeGroupTaskState: (state, action) => {
      state.groupBy = action.payload;
    },
    resetGroupTaskState: (state) => {
      state.groupBy = GroupByState.Priority;
    },
  },
});

export const { changeGroupTaskState, resetGroupTaskState } = groupTasksSlice.actions;

export default groupTasksSlice;
