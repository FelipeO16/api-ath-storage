"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.post('/order', 'Orders/Order.store').middleware('auth');
Route_1.default.get('/orders', 'Orders/Order.index').middleware('auth');
Route_1.default.put('/order', 'Orders/Order.update').middleware('auth');
Route_1.default.get('/order/:id', 'Orders/Order.show').middleware('auth');
Route_1.default.delete('/order', 'Orders/Order.destroy').middleware('auth');
//# sourceMappingURL=orders.js.map