import { userModel } from '~/models/userModel'

const register = async dataInput => {
  await userModel.createNew(dataInput)
}

const login = async dataInput => {
  const user = await userModel.findOneByEmail(dataInput.email)
  return user
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
