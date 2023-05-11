"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.post('/api/register', 'Users/Register.store');
Route_1.default.get('/api/register/:key', 'Users/Register.show');
Route_1.default.put('/api/register', 'Users/Register.update');
//# sourceMappingURL=users.js.map