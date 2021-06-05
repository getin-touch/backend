import * as winston from 'winston';
import * as chalk from 'chalk';
import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger as WinstonLogger } from 'winston';

import { ITransformableData } from '../interfaces';

@Injectable({ scope: Scope.TRANSIENT })
class LoggerService {
  private logger: WinstonLogger;
  private context: string;

  constructor(private configService: ConfigService) {
    this.context = '';

    const outputType = this.configService.get<string>('logger.output');

    if (outputType === 'console') {
      this.logger = winston.createLogger({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(log => this.formatConsole({
            timestamp: log.timestamp,
            context: log.context,
            color: log.color,
            level: log.level,
            message: log.message,
          } as ITransformableData)),
        ),
        transports: [new winston.transports.Console()],
      });
    } else if (outputType === 'file') {
      const fileName = this.configService.get<string>('logger.fileName');;
      const logFile = new winston.transports.File({
        filename: fileName,
      });

      this.logger = winston.createLogger({
        format: winston.format.json(),
        transports: [logFile],
      });
    }
  }

  private formatConsole(log: ITransformableData): string {
    const currentDate = this.formatDate(log.timestamp);
    const currentTime = this.formatTime(log.timestamp);

    return `[${log.color(log.level.toUpperCase())}] ${chalk.cyan(
      currentDate,
      currentTime
    )} [${chalk.green(log.context)}] ${log.message}`;
  }

  private formatDate(timestamp: Date): string {
    return `${timestamp.getDate()}/${timestamp.getMonth()}/${timestamp.getFullYear()}`;
  }

  private formatTime(timestamp: Date): string {
    return `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;
  }

  private formatMessageError(errorMessage: string): string {
    return `${chalk.rgb(161, 12, 37)(errorMessage)}`;
  }

  private formatError(error: Error): string {
    const { message, stack } = error;

    return `${chalk.rgb(161, 12, 37)(message)}\n${chalk.gray(
      stack || 'stack not provided !'
    )}`;
  }

  setContext(prefix: string): void {
    this.context = prefix;
  }

  error(error: Error | string): void {
    const currentDate = new Date();
    let formattedMessage: string;

    if (error instanceof Error) {
      formattedMessage = this.formatError(error);
    } else {
      formattedMessage = this.formatMessageError(error);
    }

    this.logger.error(formattedMessage, {
      timestamp: currentDate,
      context: this.context,
      color: chalk.rgb(161, 12, 37),
    });
  }

  warn(message: string): void {
    const currentDate = new Date();

    this.logger.warn(message, {
      timestamp: currentDate,
      context: this.context,
      color: chalk.yellow,
    });
  }

  info(message: string): void {
    const currentDate = new Date();

    this.logger.info(message, {
      timestamp: currentDate,
      context: this.context,
      color: chalk.blue,
    });
  }

  log(message: string): void {
    this.info(message);
  }
}

export default LoggerService;
