import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../shared/response/httpResponse';

export const authMiddelware = (req: Request, res: Response, next: NextFunction): void => {
  const header: string | undefined = req.headers['authorization'];
  const data: Record<string, string> = { message: 'No authorization' };
  const statusRepository: HttpResponse = new HttpResponse();
  if (!header) {
    statusRepository.statusForbidden(res, data);
    return;
  }
  const credentials: string | undefined = header.split(' ')[1];
  if (!credentials) {
    statusRepository.statusForbidden(res, data);
    return;
  }
  const decoCredentias: string = Buffer.from(credentials, 'base64').toString('utf-8');
  const [user, password] = decoCredentias.split(':');
  if (user === 'admin' && password === 'admin') {
    next();
    return;
  }
  statusRepository.statusForbidden(res, data);
};
