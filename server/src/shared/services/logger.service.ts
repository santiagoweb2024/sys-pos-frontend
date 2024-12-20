import { Injectable, Logger } from '@nestjs/common';
import { LogContext } from '../types/logger/logger.types';

@Injectable()
export class LoggerService extends Logger {
  constructor(context?: string) {
    super(context);
  }

  private formatContext(context?: LogContext): string {
    if (!context) return '';

    return JSON.stringify({
      requestId: context.requestId,
      method: context.method,
      url: context.url,
      ip: context.ip,
      duration: context.duration ? `${context.duration}ms` : undefined,
      userId: context.userId,
      statusCode: context.statusCode,
      ...(context.error && { error: context.error }),
    });
  }

  log(message: any, ...optionalParams: any[]) {
    const context = optionalParams[0] as LogContext;
    super.log(message, context ? this.formatContext(context) : undefined);
  }

  error(message: any, ...optionalParams: any[]) {
    const [trace, context] = optionalParams;
    super.error(
      message,
      trace,
      context ? this.formatContext(context as LogContext) : undefined,
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    const context = optionalParams[0] as LogContext;
    super.warn(message, context ? this.formatContext(context) : undefined);
  }

  debug(message: any, ...optionalParams: any[]) {
    const context = optionalParams[0] as LogContext;
    super.debug(message, context ? this.formatContext(context) : undefined);
  }

  verbose(message: any, ...optionalParams: any[]) {
    const context = optionalParams[0] as LogContext;
    super.verbose(message, context ? this.formatContext(context) : undefined);
  }
}
