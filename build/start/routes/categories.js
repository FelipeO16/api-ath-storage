"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.post('/category', 'Category/Category.store').middleware('auth');
Route_1.default.get('/category', 'Category/Category.index').middleware('auth');
Route_1.default.get('/category/:id', 'Category/Category.show').middleware('auth');
Route_1.default.put('/category', 'Category/Category.update').middleware('auth');
Route_1.default.delete('/category', 'Category/Category.destroy').middleware('auth');
//# sourceMappingURL=categories.js.map