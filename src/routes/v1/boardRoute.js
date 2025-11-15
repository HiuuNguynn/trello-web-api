import express from 'express'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'
import { authenticationMiddleware } from '~/middlewares/authenticationMiddleware'

const Router = express.Router()
Router.route('/')
  .get(authenticationMiddleware.isAuthorized, boardController.getAllByUserId)
  .post(authenticationMiddleware.isAuthorized, boardValidation.createNew, boardController.createNew)

Router.route('/:id')
  .get(authenticationMiddleware.isAuthorized, boardController.getDetails)
  .put(authenticationMiddleware.isAuthorized, boardValidation.update, boardController.update)

Router.route('/supports/moving_card').put(
  authenticationMiddleware.isAuthorized,
  boardValidation.moveCardToDifferentColumn,
  boardController.moveCardToDifferentColumn
)

export const boardRoute = Router
