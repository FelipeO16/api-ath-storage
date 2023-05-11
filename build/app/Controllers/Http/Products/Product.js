"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = global[Symbol.for('ioc.use')]("App/Validators/Product");
const Models_1 = global[Symbol.for('ioc.use')]("App/Models");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class ProductController {
    async store({ request, response }) {
        const product = new Models_1.Product();
        const { code, suplier, description, class: productClass, price, min, max, place, } = await request.validate(Product_1.StoreValidator);
        product.code = code;
        product.suplier = suplier;
        product.description = description;
        product.class = productClass;
        product.storage = 0;
        product.price = price;
        product.min = min;
        product.max = max;
        product.place = place;
        await product.save();
        response.send({ message: 'Produto cadastrado com sucesso.' });
    }
    async index({ request }) {
        console.log(request.headers['x-forwarded-for']);
        const products = await Database_1.default.query().from('products').select('*').orderBy('id', 'asc');
        products.forEach((product) => {
            if (product.storage > product.max * 0.2) {
                product.status = 'Good';
            }
            else {
                product.status = 'Bad';
            }
        });
        return products;
    }
    async show({ params }) {
        const products = await Database_1.default.query().from('products').select('*').where('code', params.name);
        return products;
    }
    async productsByCategory({ params }) {
        const products = await Database_1.default.query().from('products').select('*').orderBy(params.category);
        products.forEach((product) => {
            if (product.storage > product.max * 0.2) {
                product.status = 'Good';
            }
            else {
                product.status = 'Bad';
            }
        });
        return products;
    }
    async update({ request, response }) {
        const { id, code, suplier, description, class: productClass, price, storage, min, max, place, } = await request.validate(Product_1.UpdateValidator);
        await Database_1.default.transaction(async (trx) => {
            const product = await Models_1.Product.findByOrFail('id', id);
            product.useTransaction(trx);
            product.merge({
                code,
                suplier,
                description,
                class: productClass,
                price,
                storage,
                min,
                max,
                place,
            });
            await product.save();
            return response.ok({ message: 'Produto alterado com sucesso.' });
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=Product.js.map