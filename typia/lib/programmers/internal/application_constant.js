import { application_default } from "./application_default";
export const application_constant = (constant) => (attribute) => (Object.assign(Object.assign({}, attribute), { type: constant.type, enum: constant.values, default: application_default(attribute)((alias) => constant.values.some((v) => v.toString() === alias))(constant.type === "string"
        ? (str) => str
        : constant.type === "number"
            ? (str) => Number(str)
            : constant.type === "boolean"
                ? (str) => Boolean(str)
                : (str) => BigInt(str)) }));
//# sourceMappingURL=application_constant.js.map