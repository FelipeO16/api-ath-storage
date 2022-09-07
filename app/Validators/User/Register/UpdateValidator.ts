import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    key: schema.string({ trim: true }, [rules.exists({ table: 'user_keys', column: 'key' })]),
    password: schema.string({ trim: true }, [rules.confirmed('passwordConfirmation')]),
  })
  public cacheKey = this.ctx.routeKey
  public messages = {}
}
