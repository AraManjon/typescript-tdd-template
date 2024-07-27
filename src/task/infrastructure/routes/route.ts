import express, { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { authMiddelware } from '../../../backend/middlewares/auth';
import { landingpage } from '../../../views/layout/main';
import { pathMiddelware } from '../../../backend/middlewares/pathRoute';
import { controlInjection } from '../dependency/injectionControl';
import { TaskController } from '../controller/taskHttpController';

const control: TaskController = controlInjection();
const router: Router = express.Router();

export const routes = (): Router => {
  router.get(['/home', '/'], (req: Request, res: Response) => {
    res.send(landingpage);
  });
  router.use(pathMiddelware);
  router.get('/:id', authMiddelware, asyncHandler(control.getTaskIdController));
  router.post('/', authMiddelware, asyncHandler(control.postCreateTaskController));
  router.patch('/:id', authMiddelware, asyncHandler(control.patchTaskStatusController));
  router.delete('/:id', authMiddelware, asyncHandler(control.deleteTaskController));
  return router;
};

export const routeSpecific = (): Router => {
  router.get('/all', authMiddelware, asyncHandler(control.getAllTasksController));
  return router;
};
