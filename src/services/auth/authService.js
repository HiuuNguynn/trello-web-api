import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import messages from '~/utils/messages'
import { userModel } from '~/models/userModel'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { pickUser } from '~/utils/formatter'
const register = async dataInput => {
  const existingUser = await userModel.findOneByEmail(dataInput.email)
  if (existingUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, messages.error.auth.email_exists)
  }
  await userModel.createNew(dataInput)
}

const login = async dataInput => {
  const user = await userModel.findOneByEmail(dataInput.email)

  if (!user || !(await bcryptjs.compare(dataInput.password, user.password))) {
    throw new ApiError(StatusCodes.BAD_REQUEST, messages.error.auth.email_or_password_incorrect)
  }

  const payload = {
    userId: user._id,
    email: user.email
  }

  const accessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.ACCESS_TOKEN_LIFE })
  const refreshToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.REFRESH_TOKEN_LIFE })
  return {
    accessToken,
    refreshToken,
    user: pickUser(user)
  }
}

const logout = async _dataInput => {
  // Logout logic will be implemented later if needed
  return true
}

export const authService = {
  register,
  login,
  logout
}
