import { StatusCodes } from 'http-status-codes'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'
import ApiError from '~/utils/ApiError'

const isAuthorized = async (req, res, next) => {
  // Hỗ trợ lấy token từ cookies (cho browser) hoặc Authorization header (cho Postman)
  let clientAccessToken = req.cookies?.accessToken

  // Nếu không có trong cookies, thử lấy từ Authorization header
  if (!clientAccessToken && req.headers.authorization) {
    const authHeader = req.headers.authorization
    if (authHeader.startsWith('Bearer ')) {
      clientAccessToken = authHeader.substring(7)
    } else {
      clientAccessToken = authHeader
    }
  }

  if (!clientAccessToken) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! (token not found)'))
    return
  }

  try {
    const accessTokenDecoded = await JwtProvider.verifyToken(clientAccessToken, env.JWT_SECRET)

    req.jwtDecoded = accessTokenDecoded

    next()
  } catch (error) {
    if (error?.message?.includes('jwt expired')) {
      next(new ApiError(StatusCodes.GONE, 'Need to refresh token.'))
      return
    }

    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized!'))
  }
}

export const authenticationMiddleware = { isAuthorized }
