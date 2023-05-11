"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.post('/api/customer', 'Customers/Customer.store').middleware('auth');
Route_1.default.get('/api/customer/:id', 'Customers/Customer.show').middleware('auth');
Route_1.default.put('/api/customer', 'Customers/Customer.update').middleware('auth');
Route_1.default.delete('/api/customer', 'Customers/Customer.destroy').middleware('auth');
//# sourceMappingURL=customers.js.map