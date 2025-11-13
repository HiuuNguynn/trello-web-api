import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

export const errorHandlingMiddleware = (err, req, res, _next) => {
  // Ensure error has statusCode
  if (!err.statusCode) {
    err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }

  // Format response consistent with Response.error
  const responseError = {
    success: false,
    statusCode: err.statusCode,
    message: err.message || 'Internal Server Error'
  }

  const isDevelopment = env.BUILD_MODE === 'dev'

  if (isDevelopment) {
    responseError.stack = err.stack
    // Log error to console in development for debugging
    // eslint-disable-next-line no-console
    console.error('Error:', err)
  } else {
    // In production, log error to console but never include stack in response
    // eslint-disable-next-line no-console
    console.error('Error:', {
      message: err.message,
      statusCode: err.statusCode,
      name: err.name
    })
  }

  // Return error response
  return res.status(responseError.statusCode).json(responseError)
}
