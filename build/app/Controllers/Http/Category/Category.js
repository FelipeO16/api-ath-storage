"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = global[Symbol.for('ioc.use')]("App/Validators/Category");
const Models_1 = global[Symbol.for('ioc.use')]("App/Models");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class ProductController {
    async store({ request, auth }) {
        const { name } = await request.validate(Category_1.StoreValidator);
        const category = new Models_1.Category();
        category.name = name;
        category.userId = auth.user.id;
        await category.save();
        const categories = await Database_1.default.query()
            .from('categories')
            .select('*')
            .where('user_id', auth.user.id);
        return categories;
    }
    async index({ auth }) {
        const categories = await Database_1.default.query()
            .from('categories')
            .select('*')
            .where('user_id', auth.user.id);
        return categories;
    }
}
exports.default = ProductController;
//# sourceMappingURL=Category.js.map