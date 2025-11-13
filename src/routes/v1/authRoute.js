import express from 'express'
import { authValidation } from '~/validations/auth/authValidation'
import { authController } from '~/controllers/auth/authController'
const Router = express.Router()

Router.route('/login').post(authValidation.login, authController.login)

Router.route('/register').post(authValidation.register, authController.register)

Router.route('/logout').post(authValidation.logout, authController.logout)

export const authRoute = Router
