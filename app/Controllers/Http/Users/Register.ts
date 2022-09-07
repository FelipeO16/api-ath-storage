import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/Register'
import { User } from 'App/Models'
import faker from 'faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import { UserKey } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UserRegisterController {
  public async store({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { email, name, company, companyTel, companyType, redirectUrl } = await request.validate(
        StoreValidator
      )
      const user = new User()
      user.useTransaction(trx)
      user.email = email
      user.name = name
      user.company = company
      user.companyTel = companyTel
      user.companyType = companyType
      await user.save()
      const key = faker.datatype.uuid()
      user.related('keys').create({ key })
      const link = `${redirectUrl.replace(/\/$/, '')}/register/${key}`
      await Mail.send((message) => {
        message.to(email)
        message.from('felipe16.12.1998@gmail.com')
        message.subject('Criação de Conta')
        // message.text(`Para confirmar o seu cadastro acesse este link => ${link}`)
        message.htmlView('emails/verify-email', { link })
      })
      response.send({ message: 'Email enviado com sucesso.' })
    })
  }

  public async show({ params, response }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail('key', params.key)
    // const user = await userKey.related('user').query().firstOrFail()
    await userKey.load('user')
    response.send(userKey.user)
    return userKey.user
  }

  public async update({ request, response }: HttpContextContract) {
    const { key, password } = await request.validate(UpdateValidator)
    const userKey = await UserKey.findByOrFail('key', key)
    const user = await userKey.related('user').query().firstOrFail()
    const username = user.name.split(' ')[0].toLocaleLowerCase() + new Date().getTime()
    user.merge({ password, username })
    await user.save()
    await userKey.delete()
    return response.ok({ message: 'ok' })
  }
}
