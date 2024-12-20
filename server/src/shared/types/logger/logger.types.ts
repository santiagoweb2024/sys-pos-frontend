export interface LogContext {
  requestId?: string;
  method?: string;
  url?: string;
  ip?: string;
  userId?: string;
  statusCode?: number;
  duration?: number;
  error?: any;
}

export interface LogMessage {
  context: LogContext;
  message: string;
  timestamp: string;
  level: 'info' | 'error' | 'warn' | 'debug';
}
