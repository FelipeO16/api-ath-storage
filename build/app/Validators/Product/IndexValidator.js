"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class StoreValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            price: Validator_1.schema.number(),
            category: Validator_1.schema.number(),
        });
        this.messages = {};
    }
}
exports.default = StoreValidator;
//# sourceMappingURL=IndexValidator.js.map