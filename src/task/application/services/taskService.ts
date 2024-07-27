import { Note } from '../../domain/entities/note';
import { Task } from '../../domain/entities/task';
import { TaskRepository } from '../../domain/repositories/manageTaskRepository';

export class TaskServiceInteractor {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createNewTask(name: string, content: string): Promise<Note | undefined> {
    const task = new Task(name, content);
    const getTask: Note | undefined = task.getNote();
    await this.taskRepository.save(getTask);
    return getTask;
  }

  async taskById(idTask: string): Promise<Note> {
    const task: Note = await this.taskRepository.getTaskById(idTask);
    return task;
  }

  async getAllTasks(): Promise<[string, Note][] | undefined> {
    const task: [string, Note][] | undefined = await this.taskRepository.getCloneAllTasks();
    return task;
  }

  async updateStatusTask(status: string, idTask: string): Promise<Note | undefined> {
    const taskUpdated: Note | undefined = await this.taskRepository.foundTaskUpdateStatus(
      status,
      idTask
    );
    return taskUpdated;
  }

  async deleteTaskById(idTask: string): Promise<Note | undefined> {
    const copyTaskDeleted: Note | undefined = await this.taskRepository.findTaskAndDeleteTaskById(
      idTask
    );
    return copyTaskDeleted;
  }
}
