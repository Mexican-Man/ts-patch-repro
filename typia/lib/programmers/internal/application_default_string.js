import { application_default } from "./application_default";
export const application_default_string = (meta) => (attribute) => (schema) => application_default(attribute)((str) => {
    const conditions = [];
    if (meta.atomics.find((t) => t === "number" || t === "bigint"))
        conditions.push(Number.isNaN(Number(str)));
    if (meta.atomics.find((t) => t === "boolean"))
        conditions.push(str !== "true" && str !== "false");
    for (const constant of meta.constants)
        for (const value of constant.values)
            conditions.push(str !== value.toString());
    if (schema.minLength !== undefined)
        conditions.push(str.length >= schema.minLength);
    if (schema.maxLength !== undefined)
        conditions.push(str.length <= schema.maxLength);
    if (schema.pattern !== undefined)
        conditions.push(new RegExp(schema.pattern).test(str));
    return conditions.every((c) => c);
})((str) => str);
//# sourceMappingURL=application_default_string.js.map