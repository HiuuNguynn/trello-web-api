import { WHITELIST_DOMAINS } from '~/utils/constants'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

export const corsOptions = {
  origin: function (origin, callback) {
    // Cho phép requests không có origin (mobile apps, Postman, server-to-server, etc.)
    // Trong dev mode hoặc khi không có origin (có thể là same-origin request)
    if (!origin) {
      return callback(null, true)
    }

    // If the origin is in the whitelist, allow the request
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    // Trong production, có thể cần thêm domain của frontend
    // Nếu có FRONTEND_URL trong env, cho phép nó
    if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      return callback(null, true)
    }

    return callback(
      new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`)
    )
  },

  optionsSuccessStatus: 200,

  credentials: true
}
