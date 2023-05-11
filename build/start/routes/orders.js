"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.post('/api/order', 'Orders/Order.store');
Route_1.default.post('/api/logs', 'Orders/Order.log');
Route_1.default.get('/api/logs', 'Orders/Order.show');
Route_1.default.get('/api/orders', 'Orders/Order.index');
Route_1.default.put('/api/order', 'Orders/Order.update');
Route_1.default.delete('/api/order', 'Orders/Order.destroy');
//# sourceMappingURL=orders.js.map