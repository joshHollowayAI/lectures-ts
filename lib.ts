import type { Task } from './types.ts'

export function findTask(tasks: Task[], id: number) {
  const task = tasks.find((t: Task) => t.id === id);
  return task;
}