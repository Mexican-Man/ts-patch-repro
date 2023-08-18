import { ArrayUtil } from "../../../utils/ArrayUtil";
import { TypeFactory } from "../../TypeFactory";
import { explore_metadata } from "./explore_metadata";
export const iterate_metadata_set = (checker) => (options) => (collection) => (meta, type) => {
    type = checker.getApparentType(type);
    const name = TypeFactory.getFullName(checker)(type, type.getSymbol());
    const generic = type.aliasSymbol
        ? type.aliasTypeArguments
        : checker.getTypeArguments(type);
    if (name.substring(0, 4) !== "Set<" || (generic === null || generic === void 0 ? void 0 : generic.length) !== 1)
        return false;
    const key = generic[0];
    ArrayUtil.set(meta.sets, explore_metadata(checker)(options)(collection)(key, false), (elem) => elem.getName());
    return true;
};
//# sourceMappingURL=iterate_metadata_set.js.map