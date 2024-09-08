import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { RootState } from '../../../config/redux/store';
import { GroupByState } from '../models/GroupByState';

import updateTaskById from '../services/updateTaskById';

const useUpdateTaskStateMutation = () => {
  const queryClient = useQueryClient();
  const { groupTasksState } = useSelector((state: RootState) => state);

  const taskUpdateMutation = useMutation({
    mutationFn: updateTaskById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'getAllTasks',
          { groupBy: groupTasksState.groupBy === GroupByState.Priority ? GroupByState.Status : GroupByState.Priority },
        ],
      });
    },
  });

  return taskUpdateMutation;
};

export default useUpdateTaskStateMutation;
