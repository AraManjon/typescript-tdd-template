import { Note } from '../entities/note';

export interface TaskRepository {
  save(task: Note): Promise<void | undefined>;
  foundTaskUpdateStatus(id: string, state: string): Promise<Note | undefined>;
  findTaskAndDeleteTaskById(id: string): Promise<Note | undefined>;
  getTaskById(id: string): Promise<Note>;
  getCloneAllTasks(): Promise<[string, Note][] | undefined>;
}
