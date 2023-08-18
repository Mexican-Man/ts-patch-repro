import ts from "typescript";
import { ArrayUtil } from "../../../utils/ArrayUtil";
const same = (type) => {
    if (type === null)
        return () => false;
    return (flag) => (type.getFlags() & flag) !== 0;
};
export const iterate_metadata_atomic = (meta, type) => {
    const filter = same(type);
    const check = (info) => {
        if (filter(info.atomic) || filter(info.literal)) {
            ArrayUtil.add(meta.atomics, info.name);
            return true;
        }
        return false;
    };
    return ATOMICS.some((info) => check(info));
};
const ATOMICS = [
    {
        name: "boolean",
        atomic: ts.TypeFlags.BooleanLike,
        literal: ts.TypeFlags.BooleanLiteral,
    },
    {
        name: "number",
        atomic: ts.TypeFlags.NumberLike,
        literal: ts.TypeFlags.NumberLiteral,
    },
    {
        name: "bigint",
        atomic: ts.TypeFlags.BigInt,
        literal: ts.TypeFlags.BigIntLiteral,
    },
    {
        name: "string",
        atomic: ts.TypeFlags.StringLike,
        literal: ts.TypeFlags.StringLiteral,
    },
];
//# sourceMappingURL=iterate_metadata_atomic.js.map