import Router from 'koa-router'
import UserController from '../controllers/user.controllers'

const userRouter = new Router({ prefix: '/api/user' })
const controller = new UserController()

userRouter.get('/:id', controller.execTask)

export default userRouter
