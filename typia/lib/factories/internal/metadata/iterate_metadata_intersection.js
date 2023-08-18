import ts from "typescript";
import { Metadata } from "../../../metadata/Metadata";
import { MetadataCollection } from "../../MetadataCollection";
import { explore_metadata } from "./explore_metadata";
import { iterate_metadata } from "./iterate_metadata";
export const iterate_metadata_intersection = (checker) => (options) => (collection) => (meta, type, resolved, aliased) => {
    if (!type.isIntersection())
        return false;
    else if (type.types.every((child) => (child.getFlags() & ts.TypeFlags.Object) !== 0 &&
        !checker.isArrayType(child) &&
        !checker.isTupleType(child)))
        return false;
    const fakeCollection = new MetadataCollection();
    const children = [
        ...new Map(type.types.map((t) => {
            const m = explore_metadata(checker)(Object.assign(Object.assign({}, options), { absorb: true }))(fakeCollection)(t, resolved);
            return [m.getName(), m];
        })).values(),
    ];
    if (children.length === 1) {
        iterate_metadata(checker)(options)(collection)(meta, type.types[0], resolved, aliased);
        return true;
    }
    const atomics = children.filter((c) => (c.atomics.length ? 1 : 0 + c.constants.length ? 1 : 0) ===
        c.bucket());
    const objects = children.filter((c) => c.objects.length && c.objects.length === c.size());
    if (atomics.length === 0 ||
        atomics.length + objects.length !== children.length)
        throw new Error(message(children));
    const least = atomics.reduce((x, y) => {
        if (Metadata.covers(x, y))
            return y;
        else if (Metadata.covers(y, x))
            return x;
        throw new Error(message(children));
    });
    Object.assign(meta, Metadata.merge(meta, least));
    collection.entire_.add(least);
    return true;
};
const message = (children) => `Error on typia.MetadataFactory.analyze(): nonsensible intersection type detected - ${children
    .map((c) => c.getName())
    .join(" & ")}.`;
//# sourceMappingURL=iterate_metadata_intersection.js.map