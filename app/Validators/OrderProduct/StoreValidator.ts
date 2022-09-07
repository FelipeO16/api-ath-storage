import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    order_id: schema.number(),
    product_id: schema.number(),
    quantity: schema.number(),
  })

  public messages = {}
}
