import consola from 'consola'
import express from 'express'
import expressWs from 'express-ws'
import morgan from 'morgan'

import { getRouter } from './api'

const port = parseInt(process.env.PORT, 10) || 8080
const app = express()
expressWs(app)

async function start() {
  app.use(morgan('tiny'))
  app.use('/api', await getRouter())

  app.listen(port, () => {
    consola.log(`Server started at http://localhost:${port}`)
  })
}

start()
