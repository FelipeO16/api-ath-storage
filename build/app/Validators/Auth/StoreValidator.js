"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class StoreValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({ trim: true }, [Validator_1.rules.email()]),
            password: Validator_1.schema.string({ trim: true })
        });
        this.messages = {};
    }
}
exports.default = StoreValidator;
//# sourceMappingURL=StoreValidator.js.map