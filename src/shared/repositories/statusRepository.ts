import { Response } from 'express';
import Data from '../model/types';

export interface statusRepository {
  statusOk(res: Response, datas?: Data): void;
  statusNoContent(res: Response, datas?: Data): void;
  statusCreated(res: Response, datas?: Data): void;
  statusBadRequest(res: Response, datas?: Data): void;
  statusNotFound(res: Response, datas?: Data): void;
  statusError(res: Response, datas?: Data): void;
  statusUnauthorized(res: Response, datas?: Data): void;
  statusForbidden(res: Response, datas?: Data): void;
}
