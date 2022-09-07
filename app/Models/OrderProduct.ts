// import { DateTime } from 'luxon'
// import { BaseModel, column, belongsTo, BelongsTo, beforeSave } from '@ioc:Adonis/Lucid/Orm'
// import { User, Product } from 'App/Models'

// export default class OrderProduct extends BaseModel {
//   @column({ isPrimary: true })
//   public id: number

//   @column()
//   public order_id: number

//   @column()
//   public product_id: number

//   @column()
//   public product_category: number

//   @column()
//   public user_id: number

//   @column()
//   public quantity: number

//   @column()
//   public name: string

//   @column()
//   public price: number

//   @column.dateTime({ autoCreate: true })
//   public createdAt: DateTime

//   @column.dateTime({ autoCreate: true, autoUpdate: true })
//   public updatedAt: DateTime

//   @beforeSave()
//   public static async getProductNameAndPrice(order_product: OrderProduct) {
//     if (order_product.product_id) {
//       const product = await Product.findByOrFail('id', order_product.product_id)
//       order_product.name = product.name
//       order_product.price = product.price
//       order_product.product_category = product.category
//     }
//   }

//   @belongsTo(() => User)
//   public user: BelongsTo<typeof User>
// }
