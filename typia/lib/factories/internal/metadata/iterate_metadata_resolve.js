import { Metadata } from "../../../metadata/Metadata";
import { MetadataResolved } from "../../../metadata/MetadataResolved";
import { Writable } from "../../../typings/Writable";
import { TypeFactory } from "../../TypeFactory";
import { iterate_metadata } from "./iterate_metadata";
export const iterate_metadata_resolve = (checker) => (options) => (collection) => (meta, type, resolved, aliased) => {
    if (options.resolve === false || resolved === true)
        return false;
    const escaped = TypeFactory.resolve(checker)(type);
    if (escaped === null)
        return false;
    if (meta.resolved === null) {
        Writable(meta).resolved = MetadataResolved.create({
            original: Metadata.initialize(),
            returns: Metadata.initialize(),
        });
    }
    iterate_metadata(checker)(options)(collection)(meta.resolved.original, type, true, aliased);
    iterate_metadata(checker)(options)(collection)(meta.resolved.returns, escaped, true, aliased);
    return true;
};
//# sourceMappingURL=iterate_metadata_resolve.js.map