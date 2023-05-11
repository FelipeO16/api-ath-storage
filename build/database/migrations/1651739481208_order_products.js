"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class OrderProducts extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'order_products';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('order_id')
                .unsigned()
                .references('id')
                .inTable('orders')
                .onDelete('CASCADE')
                .notNullable();
            table
                .integer('product_id')
                .unsigned()
                .references('id')
                .inTable('products')
                .onDelete('CASCADE')
                .notNullable();
            table.integer('product_category').notNullable();
            table.string('name').notNullable();
            table.float('price').notNullable();
            table.integer('quantity').notNullable();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = OrderProducts;
//# sourceMappingURL=1651739481208_order_products.js.map