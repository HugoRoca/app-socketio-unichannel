import * as socketio from 'socket.io'

interface User {
  id: string
  firstName: string
  lastName: string
}

interface AuthorizedSocket extends socketio.Socket {
  user: User
}

// only mock
const checkToken = (token: string, id: string) => ({
  // const mockUser = [
  //   { token: 'i-am-token-1', id: '1', firstName: 'Hugo-1', lastName: 'Roca' },
  //   { token: 'i-am-token-2', id: '2', firstName: 'Hugo-2', lastName: 'Roca' },
  // ]

  // return mockUser.find((x) => x.token === token && x.id === id)
  token,
  id,
  firstName: 'Maciej',
  lastName: 'Cieslar',
})

type SocketMiddleware = (
  socket: AuthorizedSocket,
  next: (err?: Error) => void
) => any

const onAuth: SocketMiddleware = (socket, next) => {
  const { token, id }: { token: string; id: string } = socket.request.headers

  if (!token)
    return next(new Error('Authorization failed, no token has been provided'))

  // mock
  const user = checkToken(token, id)

  socket.user = user

  return next()
}
