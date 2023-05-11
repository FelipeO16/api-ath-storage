"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class StoreValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.email(),
                Validator_1.rules.unique({ table: 'users', column: 'email' }),
            ]),
            name: Validator_1.schema.string({ trim: true }),
            company: Validator_1.schema.string({ trim: true }),
            companyTel: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.mobile({
                    locales: ['pt-BR', 'en-IN', 'en-US'],
                    strict: true,
                }),
            ]),
            companyType: Validator_1.schema.string({ trim: true }),
            redirectUrl: Validator_1.schema.string({ trim: true }),
        });
        this.messages = {};
    }
}
exports.default = StoreValidator;
//# sourceMappingURL=StoreValidator.js.map