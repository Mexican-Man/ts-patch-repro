import { application_schema } from "./application_schema";
export const application_resolved = (options) => (blockNever) => (components) => (resolved) => (attribute) => {
    const output = application_schema(options)(blockNever)(components)(resolved.returns)(attribute);
    if (output === null)
        return [];
    if (is_date(new Set())(resolved.original)) {
        const string = is_string(output)
            ? output
            : is_one_of(output)
                ? output.oneOf.find(is_string)
                : undefined;
        if (string !== undefined &&
            string.format !== "date" &&
            string.format !== "date-time")
            string.format = "date-time";
    }
    return is_one_of(output) ? output.oneOf : [output];
};
const is_string = (elem) => elem.type === "string";
const is_one_of = (elem) => Array.isArray(elem.oneOf);
const is_date = (visited) => (meta) => {
    if (visited.has(meta))
        return false;
    visited.add(meta);
    return (meta.natives.some((name) => name === "Date") ||
        meta.arrays.some((array) => is_date(visited)(array.value)) ||
        meta.tuples.some((tuple) => tuple.elements.some(is_date(visited))) ||
        meta.aliases.some((alias) => is_date(visited)(alias.value)));
};
//# sourceMappingURL=application_resolved.js.map