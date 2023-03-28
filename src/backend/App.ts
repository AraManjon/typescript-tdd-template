import { Server } from './Server';

export class App {
  server?: Server;

  public async start() {
    const port = process.env.PORT || '8000';
    this.server = new Server(port);
    debugger;
    return this.server.listen();
  }

  /* get httpServer() {
      return this.server?.getHTTPServer();
    }
  
    async stop() {
      return this.server?.stop();
    } */
}
