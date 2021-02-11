/* eslint-disable */
import * as socketio from 'socket.io'
import * as states from './states'
import jwt from 'jsonwebtoken'

interface User {
  id: string
  firstName: string
  lastName: string
}

interface AuthorizedSocket extends socketio.Socket {
  user: User
}

const checkToken = (token: any): any => {
  return jwt.verify(token, 'unete-a-mi')
}

type SocketMiddleware = (
  socket: AuthorizedSocket,
  next: (err?: Error) => void
) => any

const onAuth: SocketMiddleware = (socket, next) => {
  const token = socket.handshake.query.token

  console.log(token)

  if (!token) {
    return next(new Error('Authorization failed, no token has been provided!'))
  }

  // mock
  const user = checkToken(token)

  socket.user = user

  return next()
}

const onConnection: SocketMiddleware = (socket, next) => {
  if (!socket.user) {
    return next(new Error('Something went wrong.'))
  }

  console.log(socket.user)

  const { id } = socket.user

  states.add(id, socket)

  socket.on('disconnect', () => {
    states.remove(id, socket)
    console.log('disconnect')
  })

  return next()
}

const initSocket = (instance: socketio.Namespace): socketio.Namespace =>
  instance.use(onAuth)

export { initSocket }
