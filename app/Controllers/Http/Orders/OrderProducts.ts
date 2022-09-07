import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, DestroyValidator } from 'App/Validators/OrderProduct'
import { OrderProduct, Product } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AddProductsController {
  public async index({ params }: HttpContextContract) {
    const products = await Database.query()
      .from('order_products')
      .select('*')
      .where('order_id', params.id)
      .orderBy('name', 'asc')
    return products
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, auth, bouncer }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { order_id, product_id, quantity } = await request.validate(StoreValidator)
      const product = await Product.findByOrFail('id', product_id)
      product.useTransaction(trx)
      await bouncer.authorize('isAuthorized', product.userId)
      if (!product) {
        throw new Error('Produto não encontrado.')
      }
      if (product.storage < quantity) {
        throw new Error('Não há quantidade suficiente no estoque.')
      }
      product.storage -= quantity
      await product.save()
      const orderProduct = new OrderProduct()
      orderProduct.useTransaction(trx)
      orderProduct.order_id = order_id
      orderProduct.product_id = product_id
      orderProduct.quantity = quantity
      orderProduct.user_id = auth.user!.id
      await orderProduct.save()
      return orderProduct
    })
  }

  public async show({ params }: HttpContextContract) {
    const products = await Database.query()
      .from('order_products')
      .sum('price as total')
      .where('order_id', params.id)
    return products[0].total
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    const { id } = await request.validate(DestroyValidator)

    const order_product = await OrderProduct.findByOrFail('id', id)
    await bouncer.authorize('isAuthorized', order_product.user_id)
    const product = await Product.findByOrFail('id', order_product.product_id)
    product.storage += 1
    await product.save()
    await order_product.delete()
    return response.ok({ message: 'Comanda deletada com sucesso.' })
  }
}
