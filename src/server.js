/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
const START_SERVER = () => {

  const app = express()

  app.use(express.json())

  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung và phải theo thứ tự "err, req, res, next"
  app.use(errorHandlingMiddleware)


  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at Host ${ env.APP_HOST } and Port ${ env.APP_PORT }`)
  })
  exitHook(() => {
    console.log('Server is shutting down...')
    CLOSE_DB()
    console.log('Disconnected from MongoDB Atlas successfully!')
  })
}


(async () => {
  try {
    console.log('Connecting to MongoDB Atlas...')
    await CONNECT_DB()
    console.log('Connected to MongoDB Atlas successfully!')
    START_SERVER()
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error)
    process.exit(0)
  }
})()
