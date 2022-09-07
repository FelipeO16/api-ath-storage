import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    id: schema.number([rules.exists({ table: 'orders', column: 'id' })]),
    name: schema.string({ trim: true }),
    place: schema.number(),
    obs: schema.string({ trim: true }),
    status: schema.boolean(),
    products: schema.object().anyMembers(),
  })

  public messages = {}
}
