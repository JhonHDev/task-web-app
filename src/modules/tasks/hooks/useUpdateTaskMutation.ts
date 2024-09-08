import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { showSuccessAlert } from '../../../shared/helpers/alerts';
import { removeTask } from '../slices/singleTaskSlice';

import updateTaskById from '../services/updateTaskById';

interface Params {
  closeModal: () => void;
}

const useUpdateTaskMutation = ({ closeModal }: Params) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const taskCreateMutation = useMutation({
    mutationFn: updateTaskById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAllTasks'],
      });

      closeModal();
      dispatch(removeTask());
      showSuccessAlert('¡Tarea actualizada!');
    },
  });

  return taskCreateMutation;
};

export default useUpdateTaskMutation;
