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
  High = 'High',
  Low = 'Low',
  Medium = 'Medium',
}

export enum TaskStatus {
  Completed = 'Completed',
  InProgress = 'In progress',
  ToDo = 'To do',
}
