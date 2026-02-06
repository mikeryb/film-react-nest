import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    trace?: string,
    optionalParams: any[] = [],
  ) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      trace,
      context: optionalParams,
    });
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(
      this.formatMessage('log', message, undefined, optionalParams),
    );
  }

  error(message: any, trace?: string, ...optionalParams: any[]) {
    console.error(
      this.formatMessage('error', message, trace, optionalParams),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(
      this.formatMessage('warn', message, undefined, optionalParams),
    );
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(
      this.formatMessage('debug', message, undefined, optionalParams),
    );
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.info(
      this.formatMessage('verbose', message, undefined, optionalParams),
    );
  }
}