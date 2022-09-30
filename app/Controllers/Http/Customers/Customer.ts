import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator, DestroyValidator } from 'App/Validators/Customer'
import { Customer } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'

export default class CustomerController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { fullname } = await request.validate(StoreValidator)
    const customer = new Customer()
    customer.fullname = fullname
    customer.userId = auth.user!.id
    await customer.save()
    response.send({ message: 'Cliente cadastrado com sucesso.' })
  }

  public async show({ params, bouncer }: HttpContextContract) {
    const customer = await Customer.findByOrFail('id', params.id)
    await bouncer.authorize('isAuthorized', customer.userId)
    return customer
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const { fullname, id } = await request.validate(UpdateValidator)
    await Database.transaction(async (trx) => {
      const customer = await Customer.findByOrFail('id', id)
      customer.useTransaction(trx)
      await customer.load('user')
      await bouncer.authorize('isAuthorized', customer.userId)
      customer.merge({ fullname })
      await customer.save()
      return response.ok({ message: 'Cliente alterado com sucesso.' })
    })
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    const { id } = await request.validate(DestroyValidator)
    await Database.transaction(async (trx) => {
      const customer = await Customer.findByOrFail('id', id)
      customer.useTransaction(trx)
      await customer.load('user')
      await bouncer.authorize('isAuthorized', customer.userId)
      await customer.delete()
      return response.ok({ message: 'Cliente deletado com sucesso.' })
    })
  }
}
