import { Injectable, LoggerService } from '@nestjs/common';

export type LogMessage = string | Record<string, unknown>;

@Injectable()
export class JsonLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: LogMessage,
    trace?: string,
    optionalParams: unknown[] = [],
  ) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      trace,
      context: optionalParams,
    });
  }

  log(message: LogMessage, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('log', message, undefined, optionalParams));
  }

  error(message: LogMessage, trace?: string, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('error', message, trace, optionalParams));
  }

  warn(message: LogMessage, ...optionalParams: unknown[]) {
    console.warn(
      this.formatMessage('warn', message, undefined, optionalParams),
    );
  }

  debug(message: LogMessage, ...optionalParams: unknown[]) {
    console.debug(
      this.formatMessage('debug', message, undefined, optionalParams),
    );
  }

  verbose(message: LogMessage, ...optionalParams: unknown[]) {
    console.info(
      this.formatMessage('verbose', message, undefined, optionalParams),
    );
  }
}
