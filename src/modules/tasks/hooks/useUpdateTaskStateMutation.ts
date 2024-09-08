import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { RootState } from '../../../config/redux/store';
import { GroupByState } from '../models/GroupByState';

import updateTaskById from '../services/updateTaskById';

const useUpdateTaskStateMutation = () => {
  const queryClient = useQueryClient();

  const { groupBy } = useSelector((state: RootState) => state.groupTasksState);

  const taskUpdateMutation = useMutation({
    mutationFn: updateTaskById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'getAllTasks',
          { groupBy: groupBy === GroupByState.Priority ? GroupByState.Status : GroupByState.Priority },
        ],
      });
    },
  });

  return taskUpdateMutation;
};

export default useUpdateTaskStateMutation;
