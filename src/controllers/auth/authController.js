import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/auth/authService'
import Response from '~/utils/Response'
import messages from '~/utils/messages'

const register = async (req, res) => {
  await authService.register(req.body)
  return Response.success(res, StatusCodes.CREATED, messages.success.auth.registered)
}

const login = async (req, res) => {
  await authService.login(req.body)
  return Response.success(res, StatusCodes.OK, messages.success.auth.logged_in)
}

const logout = async (req, res) => {
  await authService.logout(req.body)
  return Response.success(res, StatusCodes.OK, messages.success.auth.logged_out)
}

export const authController = {
  register,
  login,
  logout
}
