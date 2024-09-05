interface Props {
  openCreateTaskModal: () => void;
  openFilterTasksModal: () => void;
}

const TaskModalButtons = ({ openCreateTaskModal, openFilterTasksModal }: Props) => {
  return (
    <div className="w-full md:w-auto flex justify-start items-center gap-4">
      <button
        onClick={openCreateTaskModal}
        className="bg-blue-500 text-white border rounded-lg py-2 px-10 flex justify-center items-center gap-4"
        type="button"
        title="Abrir modal de crear tarea"
      >
        Crear <span>+</span>
      </button>

      <button
        onClick={openFilterTasksModal}
        className="text-[#333] border rounded-lg py-2 px-10 flex justify-center items-center gap-4"
        type="button"
        title="Abrir modal de filtros"
      >
        Filtrar <span>{'v'}</span>
      </button>
    </div>
  );
};

export default TaskModalButtons;
