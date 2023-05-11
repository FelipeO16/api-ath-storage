"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Models_1 = global[Symbol.for('ioc.use')]("App/Models");
const Auth_1 = global[Symbol.for('ioc.use')]("App/Validators/Auth");
class AuthController {
    async store({ request, auth }) {
        const { email, password } = await request.validate(Auth_1.StoreValidator);
        const token = await auth.attempt(email, password, {
            expiresIn: '30 days',
        });
        return token;
    }
    async show({ auth, response }) {
        const userId = await Models_1.User.findByOrFail('id', auth.user.id);
        response.send(userId);
        return userId;
    }
    async destroy({ auth }) {
        await auth.logout();
    }
}
exports.default = AuthController;
//# sourceMappingURL=Main.js.map