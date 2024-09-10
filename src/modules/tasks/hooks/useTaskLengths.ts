import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../config/redux/store';

interface TaskListObjLengths {
  arrayOneLength: number;
  arrayTwoLength: number;
  arrayThreeLength: number;
}

const useTaskLengths = () => {
  const { filteredTasks } = useSelector((state: RootState) => state.filteredTasks);

  const [taskListLengths, setTaskListLengths] = useState<TaskListObjLengths>({
    arrayOneLength: 0,
    arrayTwoLength: 0,
    arrayThreeLength: 0,
  });

  useEffect(() => {
    setTaskListLengths({
      arrayOneLength: filteredTasks?.arrayOne.length || 0,
      arrayTwoLength: filteredTasks?.arrayTwo.length || 0,
      arrayThreeLength: filteredTasks?.arrayThree.length || 0,
    });
  }, [filteredTasks]);

  return taskListLengths;
};

export default useTaskLengths;
