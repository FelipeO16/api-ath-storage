import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code').notNullable()
      table.string('suplier').notNullable()
      table.string('description').notNullable()
      table.integer('class').notNullable()

      table.float('price').notNullable()
      table.integer('storage').defaultTo(0)
      table.integer('min').notNullable()
      table.integer('max').notNullable()
      table.integer('place').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
