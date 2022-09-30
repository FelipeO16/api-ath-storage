"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = global[Symbol.for('ioc.use')]("App/Validators/Order");
const Models_1 = global[Symbol.for('ioc.use')]("App/Models");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class ProductController {
    async store({ request, response, auth }) {
        const { name, place, obs } = await request.validate(Order_1.StoreValidator);
        const order = new Models_1.Order();
        order.name = name;
        order.place = place;
        order.obs = obs;
        order.userId = auth.user.id;
        await order.save();
        response.send({ message: 'Comanda criada com sucesso.' });
    }
    async index({ auth }) {
        try {
            const orders = await Database_1.default.query()
                .from('orders')
                .select('*')
                .where('user_id', auth.user.id)
                .where('status', true);
            for (let order in orders) {
                orders[order].total = 0;
                const products = await Database_1.default.query()
                    .from('order_products')
                    .sum('price as total')
                    .where('order_id', orders[order].id);
                orders[order].total = products[0].total;
            }
            return orders;
        }
        catch (error) {
            console.log(error);
        }
    }
    async show({ params, bouncer }) {
        let order = (await Models_1.Order.findByOrFail('id', params.id));
        await bouncer.authorize('isAuthorized', order.userId);
        return order;
    }
    async update({ request, response, bouncer }) {
        const { id, name, place, obs, status } = await request.validate(Order_1.UpdateValidator);
        await Database_1.default.transaction(async (trx) => {
            const order = await Models_1.Order.findByOrFail('id', id);
            order.useTransaction(trx);
            await order.load('user');
            await bouncer.authorize('isAuthorized', order.userId);
            order.merge({ name, place, obs, status });
            await order.save();
            return response.ok({ message: 'Comanda alterada com sucesso.' });
        });
    }
    async destroy({ request, response, bouncer }) {
        const { id } = await request.validate(Order_1.DestroyValidator);
        const order = await Models_1.Order.findByOrFail('id', id);
        await order.load('user');
        await bouncer.authorize('isAuthorized', order.userId);
        order.status = false;
        await order.save();
        return response.ok({ message: 'Comanda finalizada com sucesso.' });
    }
}
exports.default = ProductController;
//# sourceMappingURL=Order.js.map