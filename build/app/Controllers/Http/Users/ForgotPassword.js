"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Password_1 = global[Symbol.for('ioc.use')]("App/Validators/User/Password");
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
const Models_1 = global[Symbol.for('ioc.use')]("App/Models");
const faker_1 = __importDefault(require("faker"));
class ForgotPasswordsController {
    async index({}) { }
    async create({}) { }
    async store({ request }) {
        const { email, redirectUrl } = await request.validate(Password_1.StoreValidator);
        const user = await Models_1.User.findByOrFail('email', email);
        await user.save();
        const key = faker_1.default.datatype.uuid();
        user.related('keys').create({ key });
        const link = `${redirectUrl.replace(/\/$/, '')}/${key}`;
        await Mail_1.default.send((message) => {
            message.to(email);
            message.from('contato@facebook.com', 'Facebook');
            message.subject('Recuperação de senha');
            message.htmlView('emails/verify-email', { link });
        });
    }
    async show({ params }) {
        const userKey = await Models_1.UserKey.findByOrFail('key', params.key);
        await userKey.load('user');
        return userKey.user;
    }
    async update({ request }) {
        const { key, newPassword } = await request.validate(Password_1.UpdateValidator);
        const userKey = await Models_1.UserKey.findByOrFail('key', key);
        const user = await userKey.related('user').query().firstOrFail();
        const password = newPassword;
        user.merge({ password });
        await user.save();
        await userKey.delete();
    }
}
exports.default = ForgotPasswordsController;
//# sourceMappingURL=ForgotPassword.js.map