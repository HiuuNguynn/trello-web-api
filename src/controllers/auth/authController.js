import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/auth/authService'
import Response from '~/utils/Response'
import messages from '~/utils/messages'
import { asyncHandler } from '~/utils/asyncHandler'
import ms from 'ms'

const register = asyncHandler(async (req, res) => {
  await authService.register(req.body)
  return Response.success(res, StatusCodes.CREATED, messages.success.auth.registered)
})

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body)

  // Set cookies for refreshToken
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: ms('14 days'),
    sameSite: 'none'
  })

  // Set cookies for accessToken
  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: ms('14 days'),
    sameSite: 'none'
  })

  return Response.success(res, StatusCodes.OK, messages.success.auth.logged_in, result)
})

const refreshToken = asyncHandler(async (req, res) => {
  const token = await authService.refreshToken(req.cookies?.refreshToken)

  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: true,
    maxAge: ms('14 days'),
    sameSite: 'none'
  })

  return Response.success(res, StatusCodes.OK, messages.success.auth.refreshed_token, token)
})

const logout = asyncHandler(async (req, res) => {
  // Clear cookies
  res.clearCookie('refreshToken')
  res.clearCookie('accessToken')

  return Response.success(res, StatusCodes.OK, messages.success.auth.logged_out)
})

export const authController = {
  register,
  login,
  logout,
  refreshToken
}
