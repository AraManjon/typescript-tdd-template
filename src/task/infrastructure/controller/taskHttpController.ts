import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../../shared/response/httpResponse';
import { Note } from '../../domain/entities/note';
import { TaskServiceInteractor } from '../../application/services/taskService';

export class TaskController {
  constructor(
    private readonly taskservice: TaskServiceInteractor,
    private readonly httpResponse: HttpResponse
  ) {}

  //inserts
  postCreateTaskController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name, content } = req.body as { name: string; content: string };
      if (!name || !content) {
        this.httpResponse.statusBadRequest(res, { detail: 'All fields are required' });
      } else {
        const data: Note | undefined = await this.taskservice.createNewTask(name, content);
        this.httpResponse.statusCreated(res, data);
      }
    } catch (error: unknown) {
      this.httpResponse.statusError(res, {
        detail: 'The new task could not be created',
      });
    }
  };

  //getters
  getTaskIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idParam: string = req.params.id;
      if (!idParam) {
        this.httpResponse.statusBadRequest(res, {
          detail: 'Error the route is wrong, there is no task ID parameter',
        });
      }
      const data: Note | undefined = await this.taskservice.taskById(idParam);
      this.httpResponse.statusOk(res, data);
    } catch (error: unknown) {
      this.httpResponse.statusNotFound(res, error);
    }
  };

  getAllTasksController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const datas: [string, Note][] | undefined = await this.taskservice.getAllTasks();
      this.httpResponse.statusOk(res, datas);
    } catch (error: unknown) {
      this.httpResponse.statusNotFound(res, error);
    }
  };

  //updates
  patchTaskStatusController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const idParam: string = req.params.id;
      if (!idParam) {
        this.httpResponse.statusBadRequest(res, {
          detail: 'Error the route is wrong, there is no task ID parameter',
        });
      }
      const { status } = req.body as { status: string };
      if (!status) {
        this.httpResponse.statusBadRequest(res, {
          detail: 'Bad Request: The field is required',
        });
      } else {
        const dataMod: Note | undefined = await this.taskservice.updateStatusTask(
          status.toString(),
          idParam
        );
        this.httpResponse.statusOk(res, dataMod);
      }
    } catch (error: unknown) {
      this.httpResponse.statusNotFound(res, error);
    }
  };

  //delete
  deleteTaskController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idParam: string = req.params.id;
      const data: Note | undefined = await this.taskservice.deleteTaskById(idParam);
      this.httpResponse.statusOk(res, {
        name: data ? data.name : undefined,
        success: 'delete successful',
      });
    } catch (error: unknown) {
      this.httpResponse.statusNotFound(res, error);
    }
  };
}
