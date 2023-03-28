import express from 'express';

export class Server {
  private express: express.Express;
  private port: string;

  constructor(port: string) {
    this.express = express();
    this.port = port;
  }

  listen() {
    this.express.listen(this.port, () => {
      console.log(
        `✅ Backend App is running at http://localhost:${
          this.port
        } in ${this.express.get('env')} mode`,
      );
      console.log('✋ Press CTRL-C to stop\n');
    });
  }
}
