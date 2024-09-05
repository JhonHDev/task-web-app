import useModal from '../../../../shared/hooks/useModal';
import CreateTaskModal from '../CreateTaskModal';
import FilterTasksModal from '../FilterTasksModal';

const TaskOptions = () => {
  const createTaskModal = useModal();
  const filterTasksModal = useModal();

  return (
    <>
      <div className="flex flex-wrap gap-5 justify-between items-center">
        <input
          type="search"
          name=""
          placeholder="Buscar tarea"
          className="border px-6 py-3 rounded-xl w-full max-w-screen-sm"
        />

        <div className="w-full md:w-auto flex justify-end md:justify-start items-center gap-4">
          <button
            onClick={createTaskModal.toggleModalOpen}
            className="bg-blue-500 text-white border rounded-lg py-2 px-10 flex justify-center items-center gap-4"
            type="button"
            title="Abrir modal de crear tarea"
          >
            Crear <span>+</span>
          </button>

          <button
            onClick={filterTasksModal.toggleModalOpen}
            className="text-[#333] border rounded-lg py-2 px-10 flex justify-center items-center gap-4"
            type="button"
            title="Abrir modal de filtros"
          >
            Filtrar <span>{'>'}</span>
          </button>
        </div>
      </div>

      {createTaskModal.isModalOpen && (
        <CreateTaskModal isModalOpen={createTaskModal.isModalOpen} toggleModalOpen={createTaskModal.toggleModalOpen} />
      )}

      {filterTasksModal.isModalOpen && (
        <FilterTasksModal
          isModalOpen={filterTasksModal.isModalOpen}
          toggleModalOpen={filterTasksModal.toggleModalOpen}
        />
      )}
    </>
  );
};

export default TaskOptions;
