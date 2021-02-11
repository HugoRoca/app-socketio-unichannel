import { Context } from 'koa'
import jwt from 'jsonwebtoken'

export default class {
  async execTask(ctx: Context): Promise<void> {
    const user = [
      { id: '1', firstName: 'Hugo 01', lastName: 'Hugo 02' },
      { id: '2', firstName: 'Hugo 04', lastName: 'Hugo 03' },
    ].find((x) => x.id === ctx.params.id)

    const token = jwt.sign(user, 'unete-a-mi')

    ctx.body = { token }
  }
}
