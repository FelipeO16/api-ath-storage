import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { User } from 'App/Models'

// table.increments('id').primary()
// table.string('key').unique()
// table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')

export default class UserKey extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public key: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
