"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class StoreValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string({ trim: true }),
            place: Validator_1.schema.number(),
            obs: Validator_1.schema.string({ trim: true }),
        });
        this.messages = {};
    }
}
exports.default = StoreValidator;
//# sourceMappingURL=StoreValidator.js.map