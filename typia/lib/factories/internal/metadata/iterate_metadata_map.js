import { ArrayUtil } from "../../../utils/ArrayUtil";
import { TypeFactory } from "../../TypeFactory";
import { explore_metadata } from "./explore_metadata";
export const iterate_metadata_map = (checker) => (options) => (collection) => (meta, type) => {
    type = checker.getApparentType(type);
    const name = TypeFactory.getFullName(checker)(type, type.getSymbol());
    const generic = type.aliasSymbol
        ? type.aliasTypeArguments
        : checker.getTypeArguments(type);
    if (name.substring(0, 4) !== "Map<" || (generic === null || generic === void 0 ? void 0 : generic.length) !== 2)
        return false;
    const key = generic[0];
    const value = generic[1];
    ArrayUtil.set(meta.maps, {
        key: explore_metadata(checker)(options)(collection)(key, false),
        value: explore_metadata(checker)(options)(collection)(value, false),
    }, (elem) => `Map<${elem.key.getName()}, ${elem.value.getName()}>`);
    return true;
};
//# sourceMappingURL=iterate_metadata_map.js.map