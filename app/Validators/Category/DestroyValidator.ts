import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DestroyValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    id: schema.number([rules.exists({ table: 'products', column: 'id' })]),
  })

  public messages = {}
}
