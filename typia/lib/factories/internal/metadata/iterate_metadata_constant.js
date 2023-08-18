import ts from "typescript";
import { ArrayUtil } from "../../../utils/ArrayUtil";
export const iterate_metadata_constant = (checker) => (options) => (meta, type) => {
    if (!options.constant)
        return false;
    const filter = (flag) => (type.getFlags() & flag) !== 0;
    if (type.isLiteral()) {
        const value = typeof type.value === "object"
            ? BigInt(`${type.value.negative ? "-" : ""}${type.value.base10Value}`)
            : type.value;
        const constant = ArrayUtil.take(meta.constants, (elem) => elem.type === typeof value, () => ({
            type: typeof value,
            values: [],
        }));
        ArrayUtil.add(constant.values, value, (a, b) => a === b);
        return true;
    }
    else if (filter(ts.TypeFlags.BooleanLiteral)) {
        const value = checker.typeToString(type) === "true";
        const constant = ArrayUtil.take(meta.constants, (elem) => elem.type === "boolean", () => ({
            type: "boolean",
            values: [],
        }));
        ArrayUtil.add(constant.values, value, (a, b) => a === b);
        return true;
    }
    return false;
};
//# sourceMappingURL=iterate_metadata_constant.js.map