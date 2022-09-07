import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    name: schema.string({ trim: true }),
    company: schema.string({ trim: true }),
    companyTel: schema.string({ trim: true }, [
      rules.mobile({
        locales: ['pt-BR', 'en-IN', 'en-US'],
        strict: true,
      }),
    ]),
    companyType: schema.string({ trim: true }),
    redirectUrl: schema.string({ trim: true }),
  })

  public messages = {}
}
