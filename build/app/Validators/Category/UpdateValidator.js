"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'products', column: 'id' })]),
            name: Validator_1.schema.string({ trim: true }),
            price: Validator_1.schema.number(),
            category: Validator_1.schema.number(),
        });
        this.messages = {};
    }
}
exports.default = UpdateValidator;
//# sourceMappingURL=UpdateValidator.js.map