export type ApiResponse<T> = {
  success: boolean;
  count?: number;
  data: T;
  meta?: Record<string, unknown>;
  requestId?: string;
  responseTime?: number;
  rateLimit?: {
    limit: number;
    remaining: number;
    resetAt: string;
  };
};