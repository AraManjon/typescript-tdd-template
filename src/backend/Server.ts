import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import { routes, routeSpecific } from '../task/infrastructure/routes/route';
import { pathMiddelware } from './middlewares/pathRoute';

export class Server {
  private readonly express: express.Express;
  private readonly port: string;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(json());
    this.express.use(pathMiddelware);
    this.express.use('/v1/api/tasks', routeSpecific());
    this.express.use('/v1/api/tasks', routes());
    this.express.use(urlencoded({ extended: true }));
  }

  async listen(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.express.listen(this.port, () => {
        // eslint-disable-next-line no-console
        console.log(
          `✅ Backend App is running at http://localhost:${this.port} in ${this.express.get(
            'env'
          )} mode`
        );
        // eslint-disable-next-line no-console
        console.log('✋ Press CTRL-C to stop\n');

        resolve();
      });
    });
  }

  //getters
  getExpress(): express.Express {
    return this.express;
  }

  async closeServer(): Promise<void> {
    await new Promise<void>((resolve) => {
      const server = this.express.listen(this.port);
      server.close();
      resolve();
    });
  }
}
