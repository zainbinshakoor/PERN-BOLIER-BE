export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
    stack?: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface AuthTokens {
  accessToken: string;
}

export interface UserPayload {
  id: string;
  email: string;
  name: string | null;
  role: string;
}