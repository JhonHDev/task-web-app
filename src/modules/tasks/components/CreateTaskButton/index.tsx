interface Props {
  openCreateTaskModal: () => void;
}

const CreateTaskButton = ({ openCreateTaskModal }: Props) => {
  return (
    <div className="flex justify-end self-start my-4 2xl:mt-0 order-1 lg:order-2">
      <button
        onClick={openCreateTaskModal}
        className="w-full max-w-[300px] bg-blue-500 text-white border rounded-lg py-2 px-10 flex justify-center items-center gap-4"
        type="button"
        title="Abrir modal de crear tarea"
      >
        Crear <span>+</span>
      </button>
    </div>
  );
};

export default CreateTaskButton;
