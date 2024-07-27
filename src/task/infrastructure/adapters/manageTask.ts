import { Note } from '../../domain/entities/note';
import { TaskRepository } from '../../domain/repositories/manageTaskRepository';
import { isObject } from '../guards/repositoryGuards';

export class ManageTask implements TaskRepository {
  private readonly tasks: Map<string, Note> = new Map();
  //constructor() {}

  getTasks(): Map<string, Note> {
    return this.tasks;
  }

  isTaskById(id: string): boolean {
    if (this.tasks.has(id)) {
      return true;
    }
    return false;
  }

  async save(task: Note): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      try {
        if (this.tasks.size === 0) {
          task.setId('1');
          this.tasks.set('1', task);
          resolve();
        } else {
          const keys: string[] = [...this.tasks.keys()];
          const idTask: number = Math.max(...keys.map(Number));
          task.setId((idTask + 1).toString());
          this.tasks.set((idTask + 1).toString(), task);
          resolve();
        }
      } catch (error) {
        reject(new Error(`Error server, request not save task: ${error}`));
      }
    });
  }

  async getTaskById(idTask: string): Promise<Note> {
    return await new Promise<Note>((resolve, reject) => {
      try {
        const exist: boolean = this.isTaskById(idTask);
        if (!exist) {
          const message: Record<string, string> = {
            detail: `Error not exist the task ${idTask} in the BBDD`,
          };
          reject({ status: 404, message });
          return;
        }
        resolve(this.tasks.get(idTask)!);
      } catch (error) {
        reject(new Error(`Error server: ${error}`));
      }
    });
  }

  async foundTaskUpdateStatus(state: string, id: string): Promise<Note | undefined> {
    return await new Promise<Note | undefined>((resolve, reject) => {
      try {
        const exist: boolean = this.isTaskById(id);
        if (!exist) {
          const message: Record<string, string> = {
            detail: `Error the task ${id} for update to state to ${state}, not exist in the BBDD`,
          };
          reject({ status: 404, message });
          return;
        }
        const getNote: Note | undefined = this.tasks.get(id);
        if (isObject(getNote)) {
          getNote.status = getNote.asignStatusNote(state);
          resolve(getNote);
        } else {
          reject();
        }
      } catch (error) {
        reject(new Error(`Error server not update status: ${error}`));
      }
    });
  }

  async findTaskAndDeleteTaskById(idTask: string): Promise<Note | undefined> {
    return await new Promise<Note | undefined>((resolve, reject) => {
      try {
        const exist: boolean = this.isTaskById(idTask);
        if (!exist) {
          const message: Record<string, string> = {
            detail: `It's not possible to delete the task ${idTask} since it does not exist in the BBDD`,
          };
          reject({ status: 404, message });
          return;
        }
        const getCloneTask: Note | undefined = structuredClone(this.tasks.get(idTask));
        this.tasks.delete(idTask);
        resolve(getCloneTask);
      } catch (error) {
        reject(new Error(`Error server, request delete failed: ${error}`));
      }
    });
  }

  async getCloneAllTasks(): Promise<[string, Note][] | undefined> {
    return await new Promise<[string, Note][] | undefined>((resolve, reject) => {
      try {
        if (this.tasks.size === 0) {
          const message: Record<string, string> = {
            detail: `Error not found any tasks created in BBDD`,
          };
          reject({ status: 404, message });
          return;
        }
        const cloneTasks: Map<string, Note> = structuredClone(this.tasks);
        const sortDatas: [string, Note][] = Array.from(cloneTasks).sort(
          (a: [string, Note], b: [string, Note]) => a[1].name.localeCompare(b[1].name)
        );
        resolve(sortDatas);
      } catch (error) {
        reject(new Error(`Error server, request get all tasks failed: ${error}`));
      }
    });
  }
}
