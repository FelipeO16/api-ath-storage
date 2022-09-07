import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    code: schema.string({ trim: true }),
    suplier: schema.string({ trim: true }),
    description: schema.string({ trim: true }),
    class: schema.number(),
    price: schema.number(),
    min: schema.number(),
    max: schema.number(),
    place: schema.number(),
  })

  public messages = {}
}
