import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    key: schema.string({trim: true}, [rules.exists({table: 'user_keys', column: 'key'})]),
    newPassword: schema.string({trim: true}, [rules.confirmed('newpasswordConfirmation')])
  })

  public messages = {}
}
