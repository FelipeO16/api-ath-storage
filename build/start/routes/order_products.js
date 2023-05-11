"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.post('/api/order/product', 'Orders/OrderProducts.store').middleware('auth');
Route_1.default.get('/api/order/products/:id', 'Orders/OrderProducts.index').middleware('auth');
Route_1.default.put('/api/order/product', 'Orders/OrderProducts.update').middleware('auth');
Route_1.default.get('/api/order/total/:id', 'Orders/OrderProducts.show').middleware('auth');
Route_1.default.delete('/api/order/product', 'Orders/OrderProducts.destroy').middleware('auth');
//# sourceMappingURL=order_products.js.map