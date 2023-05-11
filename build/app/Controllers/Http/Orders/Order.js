"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = global[Symbol.for('ioc.use')]("App/Validators/Order");
const Models_1 = global[Symbol.for('ioc.use')]("App/Models");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
require("dotenv/config");
const mailersend_1 = require("mailersend");
class ProductController {
    async store({ request }) {
        const { title, name, obs, products, email } = await request.validate(Order_1.StoreValidator);
        const sentFrom = new mailersend_1.Sender("felipe@athstocktake.com", "Felipe");
        const mailerSend = new mailersend_1.MailerSend({
            apiKey: 'mlsn.b5c0d3fa7855ed1cd1bbd8e74a037330e397c01194026ee722d5822ea6e1a088',
        });
        const recipients = [new mailersend_1.Recipient(email, "Your Client")];
        const personalization = [
            {
                email: email,
                data: {
                    title: title,
                    products: products,
                    account_name: name,
                    support_email: obs
                },
            }
        ];
        const emailParams = new mailersend_1.EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setSubject("Subject")
            .setTemplateId('z3m5jgr96vmgdpyo')
            .setPersonalization(personalization);
        try {
            await mailerSend.email.send(emailParams);
            return { message: 'Email enviado com sucesso.' };
        }
        catch (error) {
            console.log(error);
        }
    }
    async log({ request }) {
        const payload = request.all();
        console.log(payload);
        await Database_1.default.insertQuery().table('logs').insert({ payload: JSON.stringify(payload) });
        return { message: 'Log criado com sucesso.' };
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
    async show({ response }) {
        const logs = await Database_1.default.query().from('logs');
        const decodedLogs = logs.map((log) => {
            return JSON.parse(log.payload);
        });
        return response.ok({ message: 'Logs retornados com sucesso.', data: decodedLogs });
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