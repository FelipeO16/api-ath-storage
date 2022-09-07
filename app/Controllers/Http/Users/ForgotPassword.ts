import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/Password'
import Mail from '@ioc:Adonis/Addons/Mail'
import { User, UserKey } from 'App/Models'
import faker from 'faker'

export default class ForgotPasswordsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)
    const user = await User.findByOrFail('email', email)
    await user.save()
    const key = faker.datatype.uuid()
    user.related('keys').create({ key })
    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`
    await Mail.send((message) => {
      message.to(email)
      message.from('contato@facebook.com', 'Facebook')
      message.subject('Recuperação de senha')
      message.htmlView('emails/verify-email', { link })
    })
  }

  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail('key', params.key)
    // const user = await userKey.related('user').query().firstOrFail()
    await userKey.load('user')
    return userKey.user
  }

  public async update({ request }: HttpContextContract) {
    const { key, newPassword } = await request.validate(UpdateValidator)
    const userKey = await UserKey.findByOrFail('key', key)
    const user = await userKey.related('user').query().firstOrFail()
    const password = newPassword
    user.merge({ password })
    await user.save()
    await userKey.delete()
  }
}
