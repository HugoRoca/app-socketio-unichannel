/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Koa from 'koa'
import helmet from 'koa-helmet'
import bodyParser from 'koa-bodyparser'
import yenv from 'yenv'
import log from 'fancy-log'
import csp from './utils/csp'
import compress from './utils/compress'
import notFavicon from './utils/api-not-favicon'
import apiError from './utils/api-error'
import docs from './utils/api-docs'
import routes from './routes'
import {
  access as accessLogger,
  error as errorLogger,
} from './utils/api-logger'
import cors from '@koa/cors'
import { initSocket } from './socketio'

const env = yenv()
const PORT = env.PORT
const server = new Koa()

server
  .use(accessLogger)
  .use(errorLogger)
  .use(helmet.contentSecurityPolicy(csp))
  .use(compress)
  .use(bodyParser())
  .use(notFavicon)
  .use(apiError)
  .use(docs)
  .use(cors())

routes.map((x) => {
  server.use(x.routes()).use(x.allowedMethods())
})

if (env.NODE_ENV !== 'test') {
  const socket = require('socket.io')(server)
  const io = initSocket(socket)

  io.on('connect', (socket) => {
    console.log('Connected: ' + socket.firstName)

    socket.on('disconnect', () => {
      console.log('Disconnected: ' + socket.firstName)
    })
  })

  server.listen(PORT, '0.0.0.0', () =>
    log.info(`server is running on PORT ${PORT}`)
  )
}

export default server
