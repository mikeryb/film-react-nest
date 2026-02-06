import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatValue(value: any): string {
    if (value === undefined || value === null) {
      return '';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }

  private formatRecord(record: Record<string, any>): string {
    return Object.entries(record)
      .map(([key, value]) => `${key}=${this.formatValue(value)}`)
      .join('\t');
  }

  private write(record: Record<string, any>, error = false) {
    const line = this.formatRecord({
      time: new Date().toISOString(),
      pid: process.pid,
      service: 'afisha-api',
      ...record,
    });

    error ? console.error(line) : console.log(line);
  }

  log(message: any, context?: string) {
    this.write({
      level: 'log',
      msg: message,
      context,
    });
  }

  warn(message: any, context?: string) {
    this.write({
      level: 'warn',
      msg: message,
      context,
    });
  }

  error(message: any, trace?: string, context?: string) {
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

  debug(message: any, context?: string) {
    this.write({
      level: 'debug',
      msg: message,
      context,
    });
  }

  verbose(message: any, context?: string) {
    this.write({
      level: 'verbose',
      msg: message,
      context,
    });
  }
}
