import { iterate_metadata } from "./iterate_metadata";
export const iterate_metadata_union = (checker) => (options) => (collection) => (meta, type, parentResolved) => {
    if (!type.isUnion())
        return false;
    type.types.forEach((t) => iterate_metadata(checker)(options)(collection)(meta, t, parentResolved, false));
    return true;
};
//# sourceMappingURL=iterate_metadata_union.js.map