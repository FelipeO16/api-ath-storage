"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class DestroyValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'orders', column: 'id' })]),
        });
        this.messages = {};
    }
}
exports.default = DestroyValidator;
//# sourceMappingURL=DestroyValidator.js.map