"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.post('/api/forgot', 'Users/ForgotPassword.store');
Route_1.default.get('/api/forgot/:key', 'Users/ForgotPassword.show');
Route_1.default.put('/api/forgot/', 'Users/ForgotPassword.update');
//# sourceMappingURL=password.js.map