"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.post('/api/product', 'Products/Product.store');
Route_1.default.get('/api/product/:name', 'Products/Product.show');
Route_1.default.put('/api/product', 'Products/Product.update');
Route_1.default.delete('/product', 'Products/Product.destroy');
Route_1.default.get('/api/products', 'Products/Product.index');
Route_1.default.get('/api/products/:category', 'Products/Product.productsByCategory');
//# sourceMappingURL=products.js.map