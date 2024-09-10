import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../config/redux/store';
import { TaskPriority, TaskStatus } from '../../models/Task';
import { GroupByState } from '../../models/GroupByState';
import { TypeOfColumn } from '../../models/TypeOfColumn';
import { addInitalTasks } from '../../slices/filteredTasksSlice';

import useTaskLengths from '../../hooks/useTaskLengths';
import useTasks from '../../hooks/useTasks';

import TaskCard from '../TaskCard';
import TaskDropArea from '../TaskDropArea';
import TaskColumnLayout from './TaskColumnLayout';

const TaskList = () => {
  const dispatch = useDispatch();

  const [activeCardId, setActiveCardId] = useState<number>(0);
  const [oldColumnId, setOldColumnId] = useState<TypeOfColumn>();

  const { groupBy } = useSelector((state: RootState) => state.groupTasksState);
  const { tasks, isLoading, isFetching, filteredTasks, handleOnDropTask } = useTasks({ oldColumnId });

  const taskListLengths = useTaskLengths();

  useEffect(() => {
    if (!isLoading && tasks) {
      dispatch(addInitalTasks(tasks));
    }
  }, [tasks, isLoading, dispatch]);

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
        <h2 className="text-2xl font-medium text-gray-800">
          <span className="font-normal">Tareas por:</span> Prioridad
        </h2>
      ) : (
        <h2 className="text-2xl font-medium text-gray-800">
          <span className="font-normal">Tareas por:</span> Estado
        </h2>
      )}

      <section className="flex flex-wrap gap-6 md:gap-4 lg:gap-5 justify-start items-center animate__animated animate__fadeIn">
        {filteredTasks && (
          <>
            <TaskColumnLayout
              groupBy={groupBy}
              taskPriority={TaskPriority.Low}
              taskStatus={TaskStatus.ToDo}
              taskListLength={taskListLengths.arrayOneLength}
              typeOfColumn={TypeOfColumn.arrayOne}
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

                {filteredTasks.arrayOne.map((task, index) => (
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
            </TaskColumnLayout>

            <TaskColumnLayout
              groupBy={groupBy}
              taskPriority={TaskPriority.Medium}
              taskStatus={TaskStatus.InProgress}
              taskListLength={taskListLengths.arrayTwoLength}
              typeOfColumn={TypeOfColumn.arrayTwo}
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

                {filteredTasks.arrayTwo.map((task, index) => (
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
            </TaskColumnLayout>

            <TaskColumnLayout
              groupBy={groupBy}
              taskPriority={TaskPriority.High}
              taskStatus={TaskStatus.Completed}
              taskListLength={taskListLengths.arrayThreeLength}
              typeOfColumn={TypeOfColumn.arrayThree}
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

                {filteredTasks.arrayThree.map((task, index) => (
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
            </TaskColumnLayout>
          </>
        )}
      </section>
    </>
  );
};

export default TaskList;
