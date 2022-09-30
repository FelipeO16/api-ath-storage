"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            key: Validator_1.schema.string({ trim: true }, [Validator_1.rules.exists({ table: 'user_keys', column: 'key' })]),
            newPassword: Validator_1.schema.string({ trim: true }, [Validator_1.rules.confirmed('newpasswordConfirmation')])
        });
        this.messages = {};
    }
}
exports.default = UpdateValidator;
//# sourceMappingURL=UpdateValidator.js.map