export interface Task {
  id: number;
  created_at: string;
  name: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string;
  description: string;
  image: string | null;
}

export enum TaskPriority {
  High = 'Alta',
  Medium = 'Media',
  Low = 'Baja',
}

export enum TaskStatus {
  Completed = 'Completada',
  InProgress = 'En progreso',
  ToDo = 'Por hacer',
}
