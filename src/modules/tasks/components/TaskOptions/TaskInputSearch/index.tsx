import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { filterTasksByName } from '../../../slices/filteredTasksSlice';

type FormFiels = {
  searchValue: string;
};

const TaskInputSearch = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormFiels>();

  const dispatch = useDispatch();

  const onSubmit = () => {
    const { searchValue } = getValues();
    dispatch(filterTasksByName(searchValue));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full  max-w-screen-sm">
      <input
        type="search"
        placeholder="Buscar tarea"
        className="border px-6 py-3 rounded-xl w-full max-w-screen-sm"
        {...register('searchValue', {
          required: {
            value: true,
            message: 'Nombre requerido',
          },
          minLength: {
            value: 3,
            message: 'Mínimo 3 caracteres',
          },
          onChange: (e) => {
            dispatch(filterTasksByName(e.target.value));
          },
        })}
      />

      {errors.searchValue && <span className="text-red-500 -mt-2">{errors.searchValue.message}</span>}
    </form>
  );
};

export default TaskInputSearch;
