import useModal from '../../../../shared/hooks/useModal';

import TaskInputSearch from './TaskInputSearch';
import TaskModalButtons from './TaskModalButtons';
import FormTaskModal from '../FormTaskModal';
import FilterTasksModal from '../FilterTasksModal';

interface Props {
  createTaskModal: {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
}

const TaskOptions = ({ createTaskModal }: Props) => {
  const filterTasksModal = useModal();

  return (
    <>
      <div className="flex flex-wrap gap-5 justify-between items-center order-2 lg:order-1">
        <TaskInputSearch />
        <TaskModalButtons />
      </div>

      {createTaskModal.isModalOpen && (
        <FormTaskModal
          isModalOpen={createTaskModal.isModalOpen}
          openModal={createTaskModal.openModal}
          closeModal={createTaskModal.closeModal}
        />
      )}

      {filterTasksModal.isModalOpen && (
        <FilterTasksModal
          isModalOpen={filterTasksModal.isModalOpen}
          openModal={filterTasksModal.openModal}
          closeModal={filterTasksModal.closeModal}
        />
      )}
    </>
  );
};

export default TaskOptions;
