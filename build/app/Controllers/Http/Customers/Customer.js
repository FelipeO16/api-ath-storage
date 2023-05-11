"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Customer_1 = global[Symbol.for('ioc.use')]("App/Validators/Customer");
const Models_1 = global[Symbol.for('ioc.use')]("App/Models");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class CustomerController {
    async store({ request, response, auth }) {
        const { fullname } = await request.validate(Customer_1.StoreValidator);
        const customer = new Models_1.Customer();
        customer.fullname = fullname;
        customer.userId = auth.user.id;
        await customer.save();
        response.send({ message: 'Cliente cadastrado com sucesso.' });
    }
    async show({ params, bouncer }) {
        const customer = await Models_1.Customer.findByOrFail('id', params.id);
        await bouncer.authorize('isAuthorized', customer.userId);
        return customer;
    }
    async update({ request, response, bouncer }) {
        const { fullname, id } = await request.validate(Customer_1.UpdateValidator);
        await Database_1.default.transaction(async (trx) => {
            const customer = await Models_1.Customer.findByOrFail('id', id);
            customer.useTransaction(trx);
            await customer.load('user');
            await bouncer.authorize('isAuthorized', customer.userId);
            customer.merge({ fullname });
            await customer.save();
            return response.ok({ message: 'Cliente alterado com sucesso.' });
        });
    }
    async destroy({ request, response, bouncer }) {
        const { id } = await request.validate(Customer_1.DestroyValidator);
        await Database_1.default.transaction(async (trx) => {
            const customer = await Models_1.Customer.findByOrFail('id', id);
            customer.useTransaction(trx);
            await customer.load('user');
            await bouncer.authorize('isAuthorized', customer.userId);
            await customer.delete();
            return response.ok({ message: 'Cliente deletado com sucesso.' });
        });
    }
}
exports.default = CustomerController;
//# sourceMappingURL=Customer.js.map