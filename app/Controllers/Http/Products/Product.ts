import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/Product'
import { Product } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'

//teste

export default class ProductController {
  public async store({ request, response }: HttpContextContract) {
    const product = new Product()
    const {
      code,
      suplier,
      description,
      class: productClass,
      price,
      min,
      max,
      place,
    } = await request.validate(StoreValidator)
    product.code = code
    product.suplier = suplier
    product.description = description
    product.class = productClass
    product.storage = 0
    product.price = price
    product.min = min
    product.max = max
    product.place = place
    await product.save()
    response.send({ message: 'Produto cadastrado com sucesso.' })
  }

  //20%

  public async index() {
    const products = await Database.query().from('products').select('*').orderBy('id', 'asc')
    products.forEach((product) => {
      if (product.storage > product.max * 0.2) {
        product.status = 'Good'
      } else {
        product.status = 'Bad'
      }
    })
    return products
  }

  public async show({ params }: HttpContextContract) {
    const products = await Database.query().from('products').select('*').where('code', params.name)
    return products
  }

  // public async productsByCategory({ params, auth }: HttpContextContract) {
  //   //create a selection of products where name like %params.name%
  //   const products = await Database.query()
  //     .from('products')
  //     .select('*')
  //     .where('category', params.category)
  //     .where('user_id', auth.user!.id)
  //     .orderBy('name', 'asc')
  //   return products
  // }

  public async update({ request, response }: HttpContextContract) {
    const {
      id,
      code,
      suplier,
      description,
      class: productClass,
      price,
      storage,
      min,
      max,
      place,
    } = await request.validate(UpdateValidator)
    await Database.transaction(async (trx) => {
      const product = await Product.findByOrFail('code', id)
      product.useTransaction(trx)
      product.merge({
        code,
        suplier,
        description,
        class: productClass,
        price,
        storage,
        min,
        max,
        place,
      })
      await product.save()
      return response.ok({ message: 'Produto alterado com sucesso.' })
    })
  }

  // public async destroy({ request, response, bouncer }: HttpContextContract) {
  //   const { id } = await request.validate(DestroyValidator)
  //   const product = await Product.findByOrFail('id', id)
  //   await bouncer.authorize('isAuthorized', product.userId)
  //   await product.delete()
  //   return response.ok({ message: 'Produto deletado com sucesso.' })
  // }
  // //create a function to get the products by name
  // public async productsByName({ params }: HttpContextContract) {
  //   const products = await Database.query()
  //     .from('products')
  //     .select('*')
  //     .where('name', 'like', `%${params.name}%`)
  //     .orderBy('name', 'asc')
  //   return products
  // }
}
