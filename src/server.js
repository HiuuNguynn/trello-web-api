/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
const START_SERVER = () => {
  const app = express()
  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })
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