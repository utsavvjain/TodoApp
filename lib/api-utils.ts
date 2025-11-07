import { NextApiRequest, NextApiResponse } from 'next';

export interface ApiError extends Error {
  statusCode?: number;
}

export function handleApiError(error: unknown, res: NextApiResponse) {
  console.error('API Error:', error);

  if (error instanceof Error) {
    const apiError = error as ApiError;
    const statusCode = apiError.statusCode || 500;
    
    // Don't expose internal errors in production
    const message = process.env.NODE_ENV === 'production' 
      ? statusCode === 500 ? 'Internal Server Error' : apiError.message
      : apiError.message;

    return res.status(statusCode).json({
      error: message,
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV !== 'production' && { stack: apiError.stack })
    });
  }

  return res.status(500).json({
    error: 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
}

export function createApiError(message: string, statusCode: number = 500): ApiError {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  return error;
}

// Middleware for API route error handling
export function withErrorHandler(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      handleApiError(error, res);
    }
  };
}
