import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import messages from '~/utils/messages'
import { userModel } from '~/models/userModel'
import bcryptjs from 'bcryptjs'
import { env } from '~/config/environment'
import { pickUser } from '~/utils/formatter'
import { JwtProvider } from '~/providers/JwtProvider'

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
    _id: user._id,
    email: user.email
  }

  const accessToken = await JwtProvider.generateToken(payload, env.JWT_SECRET, env.ACCESS_TOKEN_LIFE)
  const refreshToken = await JwtProvider.generateToken(payload, env.JWT_SECRET, env.REFRESH_TOKEN_LIFE)
  
  return {
    accessToken,
    refreshToken,
    user: pickUser(user)
  }
}

const refreshToken = async clienRefreshToken => {
  const decoded = await JwtProvider.verifyToken(clienRefreshToken, env.JWT_SECRET)

  const payload = {
    _id: decoded._id,
    email: decoded.email
  }

  return await JwtProvider.generateToken(payload, env.JWT_SECRET, env.ACCESS_TOKEN_LIFE)
}


export const authService = {
  register,
  login,
  refreshToken
}
