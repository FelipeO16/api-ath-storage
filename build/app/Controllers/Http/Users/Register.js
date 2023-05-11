"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Register_1 = global[Symbol.for('ioc.use')]("App/Validators/User/Register");
const Models_1 = global[Symbol.for('ioc.use')]("App/Models");
const faker_1 = __importDefault(require("faker"));
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
const Models_2 = global[Symbol.for('ioc.use')]("App/Models");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class UserRegisterController {
    async store({ request, response }) {
        await Database_1.default.transaction(async (trx) => {
            const { email, name, company, companyTel, companyType, redirectUrl } = await request.validate(Register_1.StoreValidator);
            const user = new Models_1.User();
            user.useTransaction(trx);
            user.email = email;
            user.name = name;
            user.company = company;
            user.companyTel = companyTel;
            user.companyType = companyType;
            await user.save();
            const key = faker_1.default.datatype.uuid();
            user.related('keys').create({ key });
            const link = `${redirectUrl.replace(/\/$/, '')}/register/${key}`;
            await Mail_1.default.send((message) => {
                message.to(email);
                message.from('felipe16.12.1998@gmail.com');
                message.subject('Criação de Conta');
                message.htmlView('emails/verify-email', { link });
            });
            response.send({ message: 'Email enviado com sucesso.' });
        });
    }
    async show({ params, response }) {
        const userKey = await Models_2.UserKey.findByOrFail('key', params.key);
        await userKey.load('user');
        response.send(userKey.user);
        return userKey.user;
    }
    async update({ request, response }) {
        const { key, password } = await request.validate(Register_1.UpdateValidator);
        const userKey = await Models_2.UserKey.findByOrFail('key', key);
        const user = await userKey.related('user').query().firstOrFail();
        const username = user.name.split(' ')[0].toLocaleLowerCase() + new Date().getTime();
        user.merge({ password, username });
        await user.save();
        await userKey.delete();
        return response.ok({ message: 'ok' });
    }
}
exports.default = UserRegisterController;
//# sourceMappingURL=Register.js.map