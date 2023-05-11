"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
require("./auth");
require("./users");
require("./password");
require("./customers");
require("./products");
require("./categories");
require("./orders");
require("./order_products");
require("./analytics");
Route_1.default.get('/api', async() => {
    return { hello: 'world' };
});
//# sourceMappingURL=index.js.map