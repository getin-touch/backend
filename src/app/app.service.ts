import * as cluster from 'cluster';
import * as os from 'os';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';

import { ENV_TYPES } from '@config/constants';
import { MainModule } from '../main.module';

class App {
  private readonly enginesLimit: number;
  private readonly engines: number;
  private readonly isProd: boolean;
  private readonly logger: Logger;

  constructor() {
    this.enginesLimit = 2;
    this.engines = os.cpus().length;
    this.isProd = process.env.NODE_ENV === ENV_TYPES.PROD;
    this.logger = new Logger('App');
  }

  private createWorker(): cluster.Worker {
    return cluster.fork();
  }

  private async bootstrap(): Promise<void> {
    const app = await NestFactory.create(MainModule, { cors: true });
    
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
  
    return app.listen(
      Number(process.env.PORT) || 4000
    );
  }

  public async start(): Promise<void> {
    if (!this.isProd) {
      return this.bootstrap();
    }

    if (cluster.isMaster) {
      this.logger.log(`MASTER SERVER (${process.pid}) IS RUNNING`);

      for (let i = 0; i < this.engines && i < this.enginesLimit; i++) {
        this.createWorker();
      }

      cluster.on('exit', (worker, code) => {
        this.logger.log(`WORKER ${worker.process.pid} died with status: ${code}. Restarting...`);
        this.createWorker();
      });

      cluster.on('online', (worker) => {
        this.logger.log(`CLUSTER SERVER (worker - ${worker.process.pid}) IS RUNNING`);
      });
    } else {
      await this.bootstrap();
    }
  }
}

export default App;
