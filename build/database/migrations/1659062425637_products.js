"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Products extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'products';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('code').notNullable();
            table.string('suplier').notNullable();
            table.string('description').notNullable();
            table.integer('class').notNullable();
            table.float('price').notNullable();
            table.integer('storage').defaultTo(0);
            table.integer('min').notNullable();
            table.integer('max').notNullable();
            table.integer('place').notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Products;
//# sourceMappingURL=1659062425637_products.js.map