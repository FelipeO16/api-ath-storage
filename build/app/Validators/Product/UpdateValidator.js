"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'products', column: 'id' })]),
            code: Validator_1.schema.string({ trim: true }),
            suplier: Validator_1.schema.string({ trim: true }),
            description: Validator_1.schema.string({ trim: true }),
            class: Validator_1.schema.number(),
            price: Validator_1.schema.number(),
            storage: Validator_1.schema.number(),
            min: Validator_1.schema.number(),
            max: Validator_1.schema.number(),
            place: Validator_1.schema.number(),
        });
        this.messages = {};
    }
}
exports.default = UpdateValidator;
//# sourceMappingURL=UpdateValidator.js.map