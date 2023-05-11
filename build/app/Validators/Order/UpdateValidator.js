"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'orders', column: 'id' })]),
            name: Validator_1.schema.string({ trim: true }),
            place: Validator_1.schema.number(),
            obs: Validator_1.schema.string({ trim: true }),
            status: Validator_1.schema.boolean(),
            products: Validator_1.schema.object().anyMembers(),
        });
        this.messages = {};
    }
}
exports.default = UpdateValidator;
//# sourceMappingURL=UpdateValidator.js.map