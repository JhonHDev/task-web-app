import { useSelector } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { RootState } from '../../../config/redux/store';
import { TypeOfColumn } from '../models/TypeOfColumn';
import { Task, TaskPriority, TaskStatus } from '../models/Task';

import getAllTasks from '../services/getAllTasks';
import useUpdateTaskStateMutation from './useUpdateTaskStateMutation';
import { GroupByState } from '../models/GroupByState';

interface OnDropTaskFn {
  typeOfFilter: string;
  taskId: number;
  OldColumnName: TypeOfColumn;
  newColumnName: TypeOfColumn;
  columnPriorityName?: TaskPriority;
  columnStatusName?: TaskStatus;
  taskIndex: number;
}

interface Props {
  oldColumnId: TypeOfColumn | undefined;
}

const useTasks = ({ oldColumnId }: Props) => {
  const queryClient = useQueryClient();

  const { groupBy } = useSelector((state: RootState) => state.groupTasksState);
  const { filteredTasks } = useSelector((state: RootState) => state.filteredTasks);

  const updateTaskStateMutation = useUpdateTaskStateMutation();

  const {
    data: tasks,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['getAllTasks', { groupBy }],
    queryFn: () => getAllTasks({ groupBy }),
    staleTime: 3600000, // Fresh data by 1 Hour
  });

  const handleOnDropTask = ({
    typeOfFilter,
    taskId,
    OldColumnName,
    newColumnName,
    columnPriorityName,
    columnStatusName,
    taskIndex,
  }: OnDropTaskFn) => {
    if (!tasks || !oldColumnId) {
      return;
    }

    // Se obtiene la tarea seleccionada
    const selectedTask = tasks[OldColumnName].find((task) => task.id === taskId) as Task;

    // Se elimina la tarea de la columna donde estaba
    const updatedOldColumn = tasks[OldColumnName].filter((task) => task.id !== taskId);

    // Se actualiza la prioridad o estado de la tarea
    const updatedTask = {
      ...selectedTask,
      priority: typeOfFilter === GroupByState.Priority ? columnPriorityName : selectedTask.priority,
      status: typeOfFilter === GroupByState.Status ? columnStatusName : selectedTask.status,
    } as Task;

    if (OldColumnName === newColumnName) {
      // Actualizar taskIndex si la tarea no cambia de columna ni de estado o prioridad
      const updatedColumn = [
        ...updatedOldColumn.slice(0, taskIndex),
        updatedTask,
        ...updatedOldColumn.slice(taskIndex),
      ];

      // Actualiza el cache local
      queryClient.setQueryData(['getAllTasks', { groupBy }], (oldData: typeof tasks | undefined) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          [OldColumnName]: updatedColumn,
        };
      });

      return;
    }

    // Se crea un nuevo array de tareas con la tarea actualizada y ordenada segun el taskIndex
    const updatedNewColumn = [
      ...tasks[newColumnName].slice(0, taskIndex),
      updatedTask,
      ...tasks[newColumnName].slice(taskIndex),
    ];

    // Se actualiza la lista de tareas de la columna vieja y de la nueva
    queryClient.setQueryData(['getAllTasks', { groupBy }], (oldData: typeof tasks | undefined) => {
      if (!oldData) return oldData;

      const updatedData = {
        ...oldData,
        [OldColumnName]: updatedOldColumn,
        [newColumnName]: updatedNewColumn,
      };

      return updatedData;
    });

    updateTaskStateMutation.mutate({
      ...updatedTask,
    });
  };

  return {
    tasks,
    isLoading,
    isFetching,
    filteredTasks,
    handleOnDropTask,
  };
};

export default useTasks;
