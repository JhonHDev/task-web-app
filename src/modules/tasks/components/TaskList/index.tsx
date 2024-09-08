import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../config/redux/store';
import { Task, TaskPriority, TaskStatus } from '../../models/Task';
import { GroupByState } from '../../models/GroupByState';
import { TypeOfColumn } from '../../models/TypeOfColumn';

import getAllTasks from '../../services/getAllTasks';

import TaskCard from '../TaskCard';
import TaskDropArea from '../TaskDropArea';
import useUpdateTaskStateMutation from '../../hooks/useUpdateTaskStateMutation';

interface OnDropTaskFn {
  typeOfFilter: string;
  taskId: number;
  OldColumnName: TypeOfColumn;
  newColumnName: TypeOfColumn;
  columnPriorityName?: TaskPriority;
  columnStatusName?: TaskStatus;
  taskIndex: number;
}
const TaskList = () => {
  const queryClient = useQueryClient();

  const { groupBy } = useSelector((state: RootState) => state.groupTasksState);

  const { data: tasks, isFetching } = useQuery({
    queryKey: ['getAllTasks', { groupBy }],
    queryFn: () => getAllTasks({ groupBy }),
    staleTime: 3600000, // Fresh data by 1 Hour
  });

  const updateTaskStateMutation = useUpdateTaskStateMutation();

  const [activeCardId, setActiveCardId] = useState<number>(0);
  const [oldColumnId, setOldColumnId] = useState<TypeOfColumn>();

  const [taskListLengths, setTaskListLengths] = useState({
    arrayOneLength: 0,
    arrayTwoLength: 0,
    arrayThreeLength: 0,
  });

  useEffect(() => {
    setTaskListLengths({
      arrayOneLength: tasks?.arrayOne.length || 0,
      arrayTwoLength: tasks?.arrayTwo.length || 0,
      arrayThreeLength: tasks?.arrayThree.length || 0,
    });
  }, [tasks]);

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

  if (isFetching) {
    return (
      <section className="flex flex-wrap gap-8 md:gap-4 lg:gap-5 justify-center items-center m-auto w-full">
        <div className="flex items-center justify-cente">
          <div className="relative">
            <div className="w-[90px] h-[90px] border-t-8 border-b-8 border-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {groupBy === GroupByState.Priority ? (
        <h2 className="text-2xl font-medium text-gray-800">Tareas por prioridad</h2>
      ) : (
        <h2 className="text-2xl font-medium text-gray-800">Tareas por estado</h2>
      )}

      <section className="flex flex-wrap gap-6 md:gap-4 lg:gap-5 justify-start items-center animate__animated animate__fadeIn">
        {tasks && (
          <>
            <div className="flex flex-col self-start gap-3 w-full md:max-w-[260px] 2xl:max-w-[300px] ">
              {groupBy === GroupByState.Priority ? (
                <h3 className="text-xl text-gray-700">
                  {TaskPriority.Low}: {taskListLengths.arrayOneLength}
                </h3>
              ) : (
                <h3 className="text-xl text-gray-700">
                  {TaskStatus.ToDo}: {taskListLengths.arrayOneLength}
                </h3>
              )}

              <div
                id={TypeOfColumn.arrayOne}
                className="min-h-[200px]  bg-[#F4F5F7] flex flex-col gap-4 rounded-sm justify-center items-center py-5 px-4"
              >
                <>
                  <TaskDropArea
                    handleOnDropTask={() =>
                      handleOnDropTask({
                        typeOfFilter: groupBy,
                        taskId: activeCardId,
                        newColumnName: TypeOfColumn.arrayOne,
                        OldColumnName: oldColumnId || TypeOfColumn.arrayOne,
                        columnPriorityName: TaskPriority.Low,
                        columnStatusName: TaskStatus.ToDo,
                        taskIndex: 0,
                      })
                    }
                  />

                  {tasks.arrayOne.map((task, index) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      setActiveCardId={setActiveCardId}
                      setOldColumnId={setOldColumnId}
                      handleOnDropTask={() =>
                        handleOnDropTask({
                          typeOfFilter: groupBy,
                          taskId: activeCardId,
                          newColumnName: TypeOfColumn.arrayOne,
                          OldColumnName: oldColumnId || TypeOfColumn.arrayOne,
                          columnPriorityName: TaskPriority.Low,
                          columnStatusName: TaskStatus.ToDo,
                          taskIndex: index + 1,
                        })
                      }
                    />
                  ))}
                </>
              </div>
            </div>

            <div className="flex flex-col self-start gap-3 w-full md:max-w-[260px] 2xl:max-w-[300px]">
              {groupBy === GroupByState.Priority ? (
                <h3 className="text-xl text-gray-700">
                  {TaskPriority.Medium}: {taskListLengths.arrayTwoLength}
                </h3>
              ) : (
                <h3 className="text-xl text-gray-700">
                  {TaskStatus.InProgress}: {taskListLengths.arrayTwoLength}
                </h3>
              )}

              <div
                id={TypeOfColumn.arrayTwo}
                className=" min-h-[200px]  bg-[#F4F5F7] flex flex-col gap-4 rounded-sm justify-center items-center py-5 px-4"
              >
                <>
                  <TaskDropArea
                    handleOnDropTask={() =>
                      handleOnDropTask({
                        typeOfFilter: groupBy,
                        taskId: activeCardId,
                        newColumnName: TypeOfColumn.arrayTwo,
                        OldColumnName: oldColumnId as TypeOfColumn,
                        columnPriorityName: TaskPriority.Medium,
                        columnStatusName: TaskStatus.InProgress,
                        taskIndex: 0,
                      })
                    }
                  />

                  {tasks.arrayTwo.map((task, index) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      setActiveCardId={setActiveCardId}
                      setOldColumnId={setOldColumnId}
                      handleOnDropTask={() =>
                        handleOnDropTask({
                          typeOfFilter: groupBy,
                          taskId: activeCardId,
                          newColumnName: TypeOfColumn.arrayTwo,
                          OldColumnName: oldColumnId as TypeOfColumn,
                          columnPriorityName: TaskPriority.Medium,
                          columnStatusName: TaskStatus.InProgress,
                          taskIndex: index + 1,
                        })
                      }
                    />
                  ))}
                </>
              </div>
            </div>

            <div className="flex flex-col self-start gap-3 w-full md:max-w-[260px] 2xl:max-w-[300px]">
              {groupBy === GroupByState.Priority ? (
                <h3 className="text-xl text-gray-700">
                  {TaskPriority.High}: {taskListLengths.arrayThreeLength}
                </h3>
              ) : (
                <h3 className="text-xl text-gray-700">
                  {TaskStatus.Completed}: {taskListLengths.arrayThreeLength}
                </h3>
              )}

              <div
                id={TypeOfColumn.arrayThree}
                className=" min-h-[200px]  bg-[#F4F5F7] flex flex-col gap-4 rounded-sm justify-center items-center py-5 px-4"
              >
                <>
                  <TaskDropArea
                    handleOnDropTask={() =>
                      handleOnDropTask({
                        typeOfFilter: groupBy,
                        taskId: activeCardId,
                        newColumnName: TypeOfColumn.arrayThree,
                        OldColumnName: oldColumnId as TypeOfColumn,
                        columnPriorityName: TaskPriority.High,
                        columnStatusName: TaskStatus.Completed,
                        taskIndex: 0,
                      })
                    }
                  />

                  {tasks.arrayThree.map((task, index) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      setActiveCardId={setActiveCardId}
                      setOldColumnId={setOldColumnId}
                      handleOnDropTask={() =>
                        handleOnDropTask({
                          typeOfFilter: groupBy,
                          taskId: activeCardId,
                          newColumnName: TypeOfColumn.arrayThree,
                          OldColumnName: oldColumnId || TypeOfColumn.arrayThree,
                          columnPriorityName: TaskPriority.High,
                          columnStatusName: TaskStatus.Completed,
                          taskIndex: index + 0,
                        })
                      }
                    />
                  ))}
                </>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default TaskList;
