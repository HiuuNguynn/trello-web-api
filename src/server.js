/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
const START_SERVER = () => {
  const app = express()

  // Apply CORS middleware
  app.use(cors(corsOptions))

  app.use(express.json())

  app.use(cookieParser())

  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung và phải theo thứ tự "err, req, res, next"
  app.use(errorHandlingMiddleware)

  // Render và các platform khác thường cung cấp PORT qua environment variable
  const PORT = process.env.PORT || env.APP_PORT || 8017
  // Bind vào 0.0.0.0 để có thể truy cập từ bên ngoài (cần cho deployment)
  // Trong production (Render), bind vào 0.0.0.0, trong dev bind vào localhost
  const HOST =
    env.BUILD_MODE === 'production' || process.env.NODE_ENV === 'production'
      ? '0.0.0.0'
      : env.APP_HOST || 'localhost'

  app.listen(PORT, HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at Host ${HOST} and Port ${PORT}`)
  })
  exitHook(() => {
    console.log('Server is shutting down...')
    CLOSE_DB()
    console.log('Disconnected from MongoDB Atlas successfully!')
  })
}

;(async () => {
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
