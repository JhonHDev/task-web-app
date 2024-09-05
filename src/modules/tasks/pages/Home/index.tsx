import AppLayout from '../../../../shared/pages/AppLayout';

import TaskBanner from '../../components/TaskBanner';
import TaskOptions from '../../components/TaskOptions';
import TaskList from '../../components/TaskList';

const Home = () => {
  return (
    <AppLayout>
      <section className="grid gap-12 mb-14">
        <TaskBanner />
        <TaskOptions />
        <TaskList />
      </section>
    </AppLayout>
  );
};

export default Home;
