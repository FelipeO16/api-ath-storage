"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const HttpExceptionHandler_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/HttpExceptionHandler"));
class ExceptionHandler extends HttpExceptionHandler_1.default {
    constructor() {
        super(Logger_1.default);
        this.statusPages = {
            '404': 'errors/not-found',
            '500..599': 'errors/server-error',
        };
    }
    async handle(error, ctx) {
        if (error.code === 'E_UNAUTHORIZED_ACCESS') {
            return ctx.response.status(422).send({ message: 'Você precisa estar logado.' });
        }
        if (error.code === 'E_AUTHORIZATION_FAILURE') {
            return ctx.response.status(401).send({ message: 'Acesso negado.' });
        }
        return super.handle(error, ctx);
    }
}
exports.default = ExceptionHandler;
//# sourceMappingURL=Handler.js.map