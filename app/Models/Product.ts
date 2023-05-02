// import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string | number

  @column()
  public suplier: string

  @column()
  public description: string

  @column()
  public class: number

  @column()
  public price: number

  @column()
  public storage: number

  @column()
  public min: number

  @column()
  public max: number

  @column()
  public place: number | string
}
