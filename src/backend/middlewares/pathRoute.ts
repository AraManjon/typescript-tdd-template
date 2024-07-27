import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../shared/response/httpResponse';

const getMessage = (type: string, name: string): Record<string, string> | undefined => {
  if (type === 'param') {
    const msgParam: Record<string, string> = {
      message: 'Error the route is wrong, the parameter ID is not found!',
    };
    return msgParam;
  }
  if (type === 'method') {
    const msgMethod: Record<string, string> = {
      message: `Error the method is wrong, the chosen method: ${name} for this request, is not correct!`,
    };
    return msgMethod;
  }
  if (type === 'base') {
    const msgBase: Record<string, string> = {
      message: `Error the route is wrong, the base url: ${name} is not correct!`,
    };
    return msgBase;
  }
};

const isMethodsAccept = (method: string): boolean => {
  const methods: string[] = ['put', 'delete', 'patch'];
  return methods.some((accept) => accept === method);
};

export const pathMiddelware = (req: Request, res: Response, next: NextFunction): void => {
  const statusRepository: HttpResponse = new HttpResponse();
  const urlPath: string = req.baseUrl + req.path;
  const methodRoute: string = req.method.toLowerCase();
  const regex = /\/[^/]+$/;
  const isAccept: boolean = isMethodsAccept(methodRoute);
  const isPath: boolean = regex.test(urlPath);
  if (!urlPath.startsWith('/v1/api/tasks')) {
    const message = getMessage('base', urlPath);
    statusRepository.statusBadRequest(res, message);
  } else if (methodRoute === 'get' || (isPath && isAccept)) {
    next();
  } else if (isPath && !isAccept) {
    const message = getMessage('method', methodRoute);
    statusRepository.statusBadRequest(res, message);
  } else if (!isPath && isAccept) {
    const message = getMessage('param', '');
    statusRepository.statusBadRequest(res, message);
  } else {
    next();
  }
};
