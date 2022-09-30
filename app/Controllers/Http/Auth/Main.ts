import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { StoreValidator } from 'App/Validators/Auth'

export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(StoreValidator)
    const token = await auth.attempt(email, password, {
      expiresIn: '30 days',
    })
    return token
  }

  public async show({ auth, response }: HttpContextContract) {
    const userId = await User.findByOrFail('id', auth.user!.id)
    response.send(userId)
    return userId
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
