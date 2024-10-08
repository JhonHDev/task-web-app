import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { filterTasks, resetFilters } from '../../../slices/filteredTasksSlice';
import { RootState } from '../../../../../config/redux/store';

type FormFiels = {
  searchValue: string;
};

const TaskInputSearch = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFiels>();

  const dispatch = useDispatch();
  const { groupBy } = useSelector((state: RootState) => state.groupTasksState);

  useEffect(() => {
    reset();
    dispatch(resetFilters());
  }, [groupBy, reset, dispatch]);

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative w-full max-w-screen-sm">
      <input
        type="search"
        placeholder="Buscar tarea"
        className="border border-gray-300 px-6 py-3 rounded-lg w-full pr-12  focus:outline-none"
        {...register('searchValue', {
          required: {
            value: true,
            message: 'Nombre requerido',
          },
          onChange: (e) => {
            const name = e.target.value as string;

            dispatch(
              filterTasks({
                name,
              })
            );
          },
        })}
      />

      <img
        src={'/images/search-icon.png'}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
      />

      {errors.searchValue && <span className="text-red-500 -mt-2">{errors.searchValue.message}</span>}
    </form>
  );
};

export default TaskInputSearch;
