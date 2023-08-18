import { AtomicPredicator } from "../helpers/AtomicPredicator";
import { application_alias } from "./application_alias";
import { application_array } from "./application_array";
import { application_boolean } from "./application_boolean";
import { application_constant } from "./application_constant";
import { application_native } from "./application_native";
import { application_number } from "./application_number";
import { application_object } from "./application_object";
import { application_resolved } from "./application_resolved";
import { application_string } from "./application_string";
import { application_templates } from "./application_templates";
import { application_tuple } from "./application_tuple";
export const application_schema = (options) => (blockNever) => (components) => (meta) => (attribute) => {
    if (meta.any === true)
        return Object.assign(Object.assign({}, attribute), { type: undefined });
    else if (meta.nullable && meta.empty())
        return Object.assign({ type: "null" }, attribute);
    const union = [];
    if (meta.nullable && options.purpose !== "swagger")
        union.push(Object.assign(Object.assign({}, attribute), { type: "null" }));
    const insert = meta.nullable && options.purpose === "swagger"
        ? (s) => union.push(Object.assign(Object.assign({}, s), { nullable: s.type
                ? true
                : undefined }))
        : (schema) => union.push(schema);
    if (meta.resolved !== null)
        union.push(...application_resolved(options)(blockNever)(components)(meta.resolved)(attribute));
    if (meta.templates.length && AtomicPredicator.template(meta))
        insert(application_templates(meta)(attribute));
    for (const constant of meta.constants)
        if (constant.type === "bigint")
            throw new Error(NO_BIGINT);
        else if ((constant.type === "string" && meta.templates.length) ||
            AtomicPredicator.constant(meta)(constant.type) === false)
            continue;
        else
            insert(application_constant(constant)(attribute));
    for (const type of meta.atomics)
        if (type === "bigint")
            throw new Error(NO_BIGINT);
        else if (AtomicPredicator.atomic(meta)(type) === false)
            continue;
        else
            insert(type === "string"
                ? application_string(meta)(attribute)
                : type === "boolean"
                    ? application_boolean(attribute)
                    : application_number(attribute));
    for (const array of meta.arrays)
        insert(application_array(options)(components)(array)(attribute));
    for (const tuple of meta.tuples)
        insert(application_tuple(options)(components)(tuple)(attribute));
    for (const native of meta.natives)
        if (AtomicPredicator.native(native))
            insert(native === "String"
                ? application_string(meta)(attribute)
                : native === "Boolean"
                    ? application_boolean(attribute)
                    : application_number(attribute));
        else
            insert(application_native(options)(components)(native)({
                nullable: meta.nullable,
                attribute,
            }));
    if (meta.sets.length)
        insert(application_native(options)(components)(`Set`)({
            nullable: meta.nullable,
            attribute,
        }));
    if (meta.maps.length)
        insert(application_native(options)(components)(`Map`)({
            nullable: meta.nullable,
            attribute,
        }));
    for (const obj of meta.objects)
        insert(application_object(options)(components)(obj)(meta.nullable));
    for (const alias of meta.aliases)
        insert(application_alias(options)(blockNever)(components)(alias)(meta.nullable));
    if (union.length === 0)
        return blockNever === true
            ? null
            : Object.assign(Object.assign({}, attribute), { type: undefined });
    else if (union.length === 1)
        return union[0];
    return Object.assign({ oneOf: union }, attribute);
};
const NO_BIGINT = "Error on typia.application(): does not allow bigint type.";
//# sourceMappingURL=application_schema.js.map