"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.post('/api/auth', 'Auth/Main.store');
Route_1.default.get('/api/auth/', 'Auth/Main.show').middleware('auth');
Route_1.default.delete('/api/auth', 'Auth/Main.destroy').middleware('auth');
//# sourceMappingURL=auth.js.map