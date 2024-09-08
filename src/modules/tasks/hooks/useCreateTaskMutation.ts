import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showSuccessAlert } from '../../../shared/helpers/alerts';

import createNewTask from '../services/createNewTask';

interface Params {
  closeModal: () => void;
}

const useCreateTaskMutation = ({ closeModal }: Params) => {
  const queryClient = useQueryClient();

  const taskCreateMutation = useMutation({
    mutationFn: createNewTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAllTasks'],
      });

      closeModal();
      showSuccessAlert('¡Tarea creada!');
    },
  });

  return taskCreateMutation;
};

export default useCreateTaskMutation;
