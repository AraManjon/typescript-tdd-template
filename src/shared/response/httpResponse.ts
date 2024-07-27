import { Response } from 'express';
import { statusRepository } from '../repositories/statusRepository';
import Data from '../model/types';
import HttpStatus from '../model/httpStatusResponse';

export class HttpResponse implements statusRepository {
  statusOk(res: Response, datas?: Data): void {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Success',
      data: datas,
    });
  }

  statusNoContent(res: Response, datas?: Data): void {
    res.status(HttpStatus.NO_CONTENT).json({
      status: HttpStatus.NO_CONTENT,
      message: 'Success',
      data: datas,
    });
  }

  statusCreated(res: Response, datas?: Data): void {
    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'Created',
      data: datas,
    });
  }

  statusBadRequest(res: Response, datas?: Data): void {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: 'Bad request',
      data: datas,
    });
  }

  statusNotFound(res: Response, datas?: Data): void {
    res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      message: 'Not found',
      data: datas,
    });
  }

  statusError(res: Response, datas?: Data): void {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      data: datas,
    });
  }

  statusUnauthorized(res: Response, datas?: Data): void {
    res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
      data: datas,
    });
  }

  statusForbidden(res: Response, datas?: Data): void {
    res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      message: 'Forbidden',
      data: datas,
    });
  }
}
