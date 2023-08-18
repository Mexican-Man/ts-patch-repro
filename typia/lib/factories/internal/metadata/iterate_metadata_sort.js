import { Metadata } from "../../../metadata/Metadata";
import { MetadataObject } from "../../../metadata/MetadataObject";
export const iterate_metadata_sort = (collection) => (meta) => {
    const visited = new Set();
    for (const array of collection.arrays())
        iterate(visited)(collection)(array.value);
    for (const tuple of collection.tuples())
        for (const element of tuple.elements)
            iterate(visited)(collection)(element);
    for (const object of collection.objects())
        for (const property of object.properties)
            iterate(visited)(collection)(property.value);
    iterate(visited)(collection)(meta);
};
const iterate = (visited) => (collection) => (meta) => {
    if (visited.has(meta))
        return;
    visited.add(meta);
    for (const map of meta.maps)
        iterate(visited)(collection)(map.value);
    for (const set of meta.sets)
        iterate(visited)(collection)(set);
    if (meta.resolved !== null)
        iterate(visited)(collection)(meta.resolved.returns);
    if (meta.rest !== null)
        iterate(visited)(collection)(meta.rest);
    if (meta.objects.length > 1) {
        meta.objects.sort((x, y) => MetadataObject.covers(x, y)
            ? -1
            : MetadataObject.covers(y, x)
                ? 1
                : 0);
        meta.union_index = collection.getUnionIndex(meta);
    }
    if (meta.arrays.length > 1)
        meta.arrays.sort((x, y) => Metadata.covers(x.value, y.value)
            ? -1
            : Metadata.covers(y.value, x.value)
                ? 1
                : 0);
    if (meta.tuples.length > 1)
        meta.tuples.sort((x, y) => {
            const xt = Metadata.initialize();
            const yt = Metadata.initialize();
            xt.tuples.push(x);
            yt.tuples.push(y);
            return Metadata.covers(xt, yt)
                ? -1
                : Metadata.covers(yt, xt)
                    ? 1
                    : 0;
        });
};
//# sourceMappingURL=iterate_metadata_sort.js.map