import AppLayout from '../../../../shared/pages/AppLayout';

import useModal from '../../../../shared/hooks/useModal';

import TaskBanner from '../../components/TaskBanner';
import TaskOptions from '../../components/TaskOptions';
import TaskList from '../../components/TaskList';
import CreateTaskButton from '../../components/CreateTaskButton';

const Home = () => {
  const createTaskModal = useModal();

  return (
    <AppLayout>
      <section className="grid gap-10 mb-14">
        <TaskBanner />

        <div className="flex flex-wrap justify-between items-center">
          <TaskOptions createTaskModal={createTaskModal} />
          <CreateTaskButton openCreateTaskModal={createTaskModal.openModal} />
        </div>

        <TaskList />
      </section>
    </AppLayout>
  );
};

export default Home;
