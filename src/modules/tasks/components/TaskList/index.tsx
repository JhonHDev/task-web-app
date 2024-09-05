import { Task, TaskPriority, TaskStatus } from '../../models/Task';
import TaskCard from '../TaskCard';

const list: Task[] = [
  {
    id: 1,
    created_at: '2024-09-02T12:16:02.895672+00:00',
    name: 'Completar el proyecto',
    status: TaskStatus.ToDo,
    priority: TaskPriority.High,
    due_date: '2024-09-15',
    description: 'Finalizar todas las tareas del proyecto',
    image:
      'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913',
  },
  {
    id: 2,
    created_at: '2024-09-02T12:16:02.895672+00:00',
    name: 'Revisar el código',
    status: TaskStatus.InProgress,
    priority: TaskPriority.Medium,
    due_date: '2024-09-10',
    description: 'Hacer una revisión exhaustiva del código',
    image:
      'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913',
  },
  {
    id: 3,
    created_at: '2024-09-02T12:16:02.895672+00:00',
    name: 'Configurar servidor',
    status: TaskStatus.InProgress,
    priority: TaskPriority.Medium,
    due_date: '2024-09-15',
    description: 'Configurar y desplegar el servidor',
    image:
      'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913',
  },
];

const TaskList = () => {
  return (
    <section className="flex flex-wrap gap-8 md:gap-4 lg:gap-5 justify-start items-center">
      {list.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
};

export default TaskList;
