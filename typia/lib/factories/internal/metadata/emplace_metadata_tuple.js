import ts from "typescript";
import { Metadata } from "../../../metadata/Metadata";
import { Writable } from "../../../typings/Writable";
import { ArrayUtil } from "../../../utils/ArrayUtil";
import { explore_metadata } from "./explore_metadata";
export const emplace_metadata_tuple = (checker) => (options) => (collection) => (type, nullable) => {
    var _a, _b, _c;
    const [tuple, newbie, closure] = collection.emplaceTuple(checker, type);
    ArrayUtil.add(tuple.nullables, nullable);
    if (newbie === false)
        return tuple;
    const flagList = (_c = (_a = type.elementFlags) !== null && _a !== void 0 ? _a : (_b = type.target) === null || _b === void 0 ? void 0 : _b.elementFlags) !== null && _c !== void 0 ? _c : [];
    const elements = checker
        .getTypeArguments(type)
        .map((elem, i) => {
        const child = explore_metadata(checker)(options)(collection)(elem, false, false);
        const flag = flagList[i];
        if (flag === ts.ElementFlags.Optional)
            Writable(child).optional = true;
        if (flag !== ts.ElementFlags.Rest)
            return child;
        const wrapper = Metadata.initialize();
        Writable(wrapper).rest = child;
        return wrapper;
    });
    closure(elements);
    return tuple;
};
//# sourceMappingURL=emplace_metadata_tuple.js.map