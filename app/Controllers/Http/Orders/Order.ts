import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator, DestroyValidator } from 'App/Validators/Order'
import { Order } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ProductController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { name, place, obs } = await request.validate(StoreValidator)
    const order = new Order()
    order.name = name
    order.place = place
    order.obs = obs
    order.userId = auth.user!.id
    await order.save()
    response.send({ message: 'Comanda criada com sucesso.' })
  }

  public async index({ auth }: HttpContextContract) {
    try {
      const orders = await Database.query()
        .from('orders')
        .select('*')
        .where('user_id', auth.user!.id)
        .where('status', true)
      for (let order in orders) {
        orders[order].total = 0
        const products = await Database.query()
          .from('order_products')
          .sum('price as total')
          .where('order_id', orders[order].id)
        orders[order].total = products[0].total
      }

      // orders.map(async (order) => {
      //   order.total = 0
      //   const products = await Database.query()
      //     .from('order_products')
      //     .sum('price as total')
      //     .where('order_id', order.id)
      //   if (products[0].total !== null) {
      //     order.total = order.total + products[0].total
      //     console.log(order)
      //   }
      // })
      return orders
    } catch (error) {
      console.log(error)
    }
  }

  public async show({ params, bouncer }: HttpContextContract) {
    let order = (await Order.findByOrFail('id', params.id)) as any
    await bouncer.authorize('isAuthorized', order.userId)
    // order.total = 0
    // if (order.products !== null) {
    //   const item = Object.values(JSON.parse(order.products)) as any
    //   for (let i = 0; i < item.length; i++) {
    //     order.total = order.total + item[i].price * item[i].amount
    //   }
    // }
    return order
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const { id, name, place, obs, status } = await request.validate(UpdateValidator)
    await Database.transaction(async (trx) => {
      const order = await Order.findByOrFail('id', id)
      order.useTransaction(trx)
      await order.load('user')
      await bouncer.authorize('isAuthorized', order.userId)
      order.merge({ name, place, obs, status })
      await order.save()
      return response.ok({ message: 'Comanda alterada com sucesso.' })
    })
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    const { id } = await request.validate(DestroyValidator)
    const order = await Order.findByOrFail('id', id)
    await order.load('user')
    await bouncer.authorize('isAuthorized', order.userId)
    order.status = false
    await order.save()
    return response.ok({ message: 'Comanda finalizada com sucesso.' })
  }
}
