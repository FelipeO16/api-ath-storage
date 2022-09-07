import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    fullname: schema.string({ trim: true }),
    id: schema.number([rules.exists({ table: 'customers', column: 'id' })]),
  })

  public messages = {}
}
