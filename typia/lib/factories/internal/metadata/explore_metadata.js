import { Metadata } from "../../../metadata/Metadata";
import { emend_metadata_atomics } from "./emend_metadata_atomics";
import { iterate_metadata } from "./iterate_metadata";
export const explore_metadata = (checker) => (options) => (collection) => (type, parentResolved, aliased = false) => {
    const meta = Metadata.initialize(parentResolved);
    collection.entire_.add(meta);
    if (type === null)
        return meta;
    iterate_metadata(checker)(options)(collection)(meta, type, parentResolved, aliased);
    emend_metadata_atomics(meta);
    if (meta.resolved) {
        emend_metadata_atomics(meta.resolved.original);
        emend_metadata_atomics(meta.resolved.returns);
    }
    return meta;
};
//# sourceMappingURL=explore_metadata.js.map