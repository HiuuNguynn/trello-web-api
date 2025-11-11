import { StatusCodes } from 'http-status-codes'

/**
 * Function to handle successful API response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {*} data - Response data
 * @param {string} message - Message (optional)
 */
const success = (res, statusCode = StatusCodes.OK, message = null, data = null) => {
  const response = {
    success: true,
    statusCode
  }

  if (message) response.message = message
  if (data !== null) response.data = data

  return res.status(statusCode).json(response)
}

/**
 * Function to handle error API response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 400)
 * @param {string} message - Error message
 * @param {*} errors - Error details (optional)
 */
const error = (
  res,
  statusCode = StatusCodes.BAD_REQUEST,
  message = 'Bad Request',
  errors = null
) => {
  const response = {
    success: false,
    statusCode,
    message
  }

  if (errors) response.errors = errors

  return res.status(statusCode).json(response)
}

/**
 * Function to handle custom formatted API response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {Object} responseData - Object containing response data
 */
const custom = (res, statusCode, responseData) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    ...responseData
  })
}

const Response = {
  success,
  error,
  custom
}

export default Response
