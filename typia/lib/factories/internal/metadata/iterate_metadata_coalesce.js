import ts from "typescript";
import { Writable } from "../../../typings/Writable";
import { TypeFactory } from "../../TypeFactory";
export const iterate_metadata_coalesce = (meta, type) => {
    const filter = (flag) => (type.getFlags() & flag) !== 0;
    if (filter(ts.TypeFlags.Unknown) || filter(ts.TypeFlags.Any)) {
        Writable(meta).any = true;
        return true;
    }
    else if (filter(ts.TypeFlags.Null)) {
        Writable(meta).nullable = true;
        return true;
    }
    else if (filter(ts.TypeFlags.Undefined) ||
        filter(ts.TypeFlags.Never) ||
        filter(ts.TypeFlags.Void) ||
        filter(ts.TypeFlags.VoidLike)) {
        Writable(meta).required = false;
        return true;
    }
    else if (TypeFactory.isFunction(type) === true) {
        Writable(meta).functional = true;
        return true;
    }
    return false;
};
//# sourceMappingURL=iterate_metadata_coalesce.js.map