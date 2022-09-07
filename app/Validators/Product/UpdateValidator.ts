import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    id: schema.number([rules.exists({ table: 'products', column: 'id' })]),
    code: schema.string({ trim: true }),
    suplier: schema.string({ trim: true }),
    description: schema.string({ trim: true }),
    class: schema.number(),
    price: schema.number(),
    storage: schema.number(),
    min: schema.number(),
    max: schema.number(),
    place: schema.number(),
  })

  public messages = {}
}
