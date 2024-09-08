import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { showSuccessAlert } from '../../../shared/helpers/alerts';
import { removeTask } from '../slices/singleTaskSlice';

import deleteTaskById from '../services/deleteTaskById';

interface Params {
  closeModal: () => void;
}

const useDeleteTaskMutation = ({ closeModal }: Params) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const taskCreateMutation = useMutation({
    mutationFn: deleteTaskById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAllTasks'],
      });

      closeModal();
      dispatch(removeTask());
      showSuccessAlert('¡Tarea eliminada!');
    },
  });

  return taskCreateMutation;
};

export default useDeleteTaskMutation;
