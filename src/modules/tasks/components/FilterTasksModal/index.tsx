interface Props {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const FilterTasksModal = ({ isModalOpen, openModal, closeModal }: Props) => {
  return (
    <div
      className={`fixed z-50 inset-0 flex items-center justify-center transition-opacity duration-600 ease-linear ${
        isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Fondo oscuro */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={openModal}
      ></div>

      {/* Contenido del modal */}
      <div
        className={`bg-white p-6 rounded-lg shadow-lg z-10 w-11/12 max-w-lg md:w-3/4 lg:w-1/2 transition-transform duration-300 ease-linear ${
          isModalOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        {/* Botón de cierre */}
        <button onClick={closeModal} type="button" className="text-gray-500 hover:text-gray-700 float-right">
          &times;
        </button>

        {/* Contenido del modal */}
        <div className="mt-4 min-h-[30vh]">
          <h2>Filtros</h2>
        </div>
      </div>
    </div>
  );
};

export default FilterTasksModal;
