import ts from "typescript";
import { ArrayUtil } from "../../../utils/ArrayUtil";
import { emplace_metadata_object } from "./emplace_metadata_object";
export const iterate_metadata_object = (checker) => (options) => (collection) => (meta, type, ensure = false) => {
    if (ensure === false) {
        const filter = (flag) => (type.getFlags() & flag) !== 0;
        if (!filter(ts.TypeFlags.Object) &&
            !type.isIntersection() &&
            type.intrinsicName !== "object")
            return false;
        else if (type.isIntersection() &&
            !type.types.every((child) => (child.getFlags() & ts.TypeFlags.Object) !== 0 &&
                !checker.isArrayType(child) &&
                !checker.isTupleType(child)))
            return false;
    }
    const obj = emplace_metadata_object(checker)(options)(collection)(type, meta.nullable);
    ArrayUtil.add(meta.objects, obj, (elem) => elem.name === obj.name);
    return true;
};
//# sourceMappingURL=iterate_metadata_object.js.map