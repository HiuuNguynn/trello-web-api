import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'
import { columnRoute } from '~/routes/v1/columnRoute'
import { cardRoute } from '~/routes/v1/cardRoute'
import { authRoute } from '~/routes/v1/authRoute'
const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API is running' })
})

/** Boards APIs */
Router.use('/boards', boardRoute)

/** Columns APIs */
Router.use('/columns', columnRoute)

/** Cards APIs */
Router.use('/cards', cardRoute)

/** auth users APIs */
Router.use('/auth', authRoute)

export const APIs_V1 = Router
