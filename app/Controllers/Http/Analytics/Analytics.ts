import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { OrderProduct } from 'App/Models'
import { validator, schema } from '@ioc:Adonis/Core/Validator'

export default class AnalyticsController {
  public async show({ params, auth }: HttpContextContract) {
    let date = params.date
    if (date) {
      await validator.validate({
        schema: schema.create({
          date: schema.date(),
        }),
        data: {
          date: params.date,
        },
      })
    } else {
      date = new Date().toISOString().slice(0, 10)
    }

    let products = await OrderProduct.query()
      .where('user_id', auth.user!.id)
      .where('updated_at', '>=', date + ' 00:00:00')
      .where('updated_at', '<=', date + ' 23:59:59')
      .select('name')
      .select('price')
      .sum('quantity as quantity')
      .groupBy('name')
      .groupBy('price')
      .orderBy('name', 'asc')
    let total = 0
    products.forEach((product) => {
      total += product.quantity * product.price
    })
    return { products, total }
  }
}
