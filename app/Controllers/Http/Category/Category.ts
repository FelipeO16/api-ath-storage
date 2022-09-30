import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Category'
import { Category } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ProductController {
  public async store({ request, auth }: HttpContextContract) {
    const { name } = await request.validate(StoreValidator)
    const category = new Category()
    category.name = name
    category.userId = auth.user!.id
    await category.save()
    const categories = await Database.query()
      .from('categories')
      .select('*')
      .where('user_id', auth.user!.id)
    return categories
  }

  public async index({ auth }: HttpContextContract) {
    const categories = await Database.query()
      .from('categories')
      .select('*')
      .where('user_id', auth.user!.id)
    return categories
  }

  // public async update({ request, response, bouncer }: HttpContextContract) {
  //   const { id, name, price, category } = await request.validate(UpdateValidator)
  //   await Database.transaction(async (trx) => {
  //     const product = await Product.findByOrFail('id', id)
  //     product.useTransaction(trx)
  //     await product.load('user')
  //     await bouncer.authorize('isAuthorized', product.userId)
  //     product.merge({ name, price, category })
  //     await product.save()
  //     return response.ok({ message: 'Produto alterado com sucesso.' })
  //   })
  // }

  // public async destroy({ request, response, bouncer }: HttpContextContract) {
  //   const { id } = await request.validate(DestroyValidator)
  //   const product = await Product.findByOrFail('id', id)
  //   await product.load('user')
  //   await bouncer.authorize('isAuthorized', product.userId)
  //   await product.delete()
  //   return response.ok({ message: 'Produto deletado com sucesso.' })
  // }
}
