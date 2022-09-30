"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
Orm_1.BaseModel.namingStrategy.serializedName = (_model, key) => {
    return Helpers_1.string.camelCase(key);
};
//# sourceMappingURL=camelCase.js.map