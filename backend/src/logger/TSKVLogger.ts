import { Injectable, LoggerService } from '@nestjs/common';

type TskvValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | TskvValue[]
  | { [key: string]: TskvValue };

type TskvRecord = Record<string, TskvValue>;
type LogMessage = TskvValue;

@Injectable()
export class TskvLogger implements LoggerService {
  private formatValue(value: TskvValue): string {
    if (value === undefined || value === null) {
      return '';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }

  private formatRecord(record: TskvRecord): string {
    return Object.entries(record)
      .map(([key, value]) => `${key}=${this.formatValue(value)}`)
      .join('\t');
  }

  private write(record: TskvRecord, error = false) {
    const line = this.formatRecord({
      time: new Date().toISOString(),
      pid: process.pid,
      service: 'afisha-api',
      ...record,
    });

    if (error) {
      console.error(line);
    } else {
      console.log(line);
    }
  }

  log(message: LogMessage, context?: string) {
    this.write({
      level: 'log',
      msg: message,
      context,
    });
  }

  warn(message: LogMessage, context?: string) {
    this.write({
      level: 'warn',
      msg: message,
      context,
    });
  }

  error(message: LogMessage, trace?: string, context?: string) {
    this.write(
      {
        level: 'error',
        msg: message,
        trace,
        context,
      },
      true,
    );
  }

  debug(message: LogMessage, context?: string) {
    this.write({
      level: 'debug',
      msg: message,
      context,
    });
  }

  verbose(message: LogMessage, context?: string) {
    this.write({
      level: 'verbose',
      msg: message,
      context,
    });
  }
}
