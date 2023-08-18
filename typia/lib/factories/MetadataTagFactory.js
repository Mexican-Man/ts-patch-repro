export var MetadataTagFactory;
(function (MetadataTagFactory) {
    MetadataTagFactory.generate = (metadata) => (tagList) => (identifier) => {
        const output = [];
        for (const tag of tagList) {
            const elem = parse(identifier, metadata, tag, output);
            if (elem !== null)
                output.push(elem);
        }
        return output;
    };
    const parse = (identifier, metadata, tag, output) => {
        var _a;
        const closure = MetadataTagFactory._PARSER[tag.name];
        if (closure === undefined)
            return null;
        const text = (_a = (tag.text || [])[0]) === null || _a === void 0 ? void 0 : _a.text;
        if (text === undefined)
            throw new Error(`${LABEL}: no tag value on ${identifier()}`);
        return closure(identifier, metadata, text, output);
    };
    MetadataTagFactory._PARSER = {
        items: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "items", "array", [
                "minItems",
            ]);
            return {
                kind: "items",
                value: parse_number(identifier, text),
            };
        },
        minItems: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "minItems", "array", [
                "items",
            ]);
            return {
                kind: "minItems",
                value: parse_number(identifier, text),
            };
        },
        maxItems: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "maxItems", "array", [
                "items",
            ]);
            return {
                kind: "maxItems",
                value: parse_number(identifier, text),
            };
        },
        type: (_identifier, metadata, text, _output) => {
            return has_atomic("number")(new Set())(metadata) &&
                (text === "int" || text === "uint")
                ? { kind: "type", value: text }
                : text === "{int}" || text === "{uint}"
                    ? { kind: "type", value: text.slice(1, -1) }
                    : null;
        },
        minimum: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "minimum", "number", [
                "exclusiveMinimum",
            ]);
            return {
                kind: "minimum",
                value: parse_number(identifier, text),
            };
        },
        maximum: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "maximum", "number", [
                "exclusiveMaximum",
            ]);
            return {
                kind: "maximum",
                value: parse_number(identifier, text),
            };
        },
        exclusiveMinimum: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "exclusiveMinimum", "number", ["minimum"]);
            return {
                kind: "exclusiveMinimum",
                value: parse_number(identifier, text),
            };
        },
        exclusiveMaximum: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "exclusiveMaximum", "number", ["maximum"]);
            return {
                kind: "exclusiveMaximum",
                value: parse_number(identifier, text),
            };
        },
        multipleOf: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "multipleOf", "number", [
                "step",
            ]);
            return {
                kind: "multipleOf",
                value: parse_number(identifier, text),
            };
        },
        step: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "step", "number", [
                "multipleOf",
            ]);
            const minimum = output.some((tag) => tag.kind === "minimum" || tag.kind === "exclusiveMinimum");
            if (minimum === undefined)
                throw new Error(`${LABEL}: step requires minimum or exclusiveMinimum tag on "${identifier()}".`);
            return {
                kind: "step",
                value: parse_number(identifier, text),
            };
        },
        format: (identifier, metadata, str, output) => {
            const value = FORMATS.get(str);
            validate(identifier, metadata, output, "format", value === "date" || value === "datetime" ? "Date" : "string", ["pattern"]);
            if (value === undefined)
                return null;
            return {
                kind: "format",
                value,
            };
        },
        pattern: (identifier, metadata, value, output) => {
            validate(identifier, metadata, output, "pattern", "string", [
                "format",
            ]);
            return {
                kind: "pattern",
                value,
            };
        },
        length: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "length", "string", [
                "minLength",
                "maxLength",
            ]);
            return {
                kind: "length",
                value: parse_number(identifier, text),
            };
        },
        minLength: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "minLength", "string", [
                "length",
            ]);
            return {
                kind: "minLength",
                value: parse_number(identifier, text),
            };
        },
        maxLength: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "maxLength", "string", [
                "length",
            ]);
            return {
                kind: "maxLength",
                value: parse_number(identifier, text),
            };
        },
    };
})(MetadataTagFactory || (MetadataTagFactory = {}));
const parse_number = (identifier, str) => {
    const value = Number(str);
    if (isNaN(value) === true)
        throw new Error(`${LABEL}: invalid number on "${identifier()}".`);
    return value;
};
const LABEL = "Error on typia.MetadataTagFactory.generate()";
const FORMATS = new Map([
    ["uuid", "uuid"],
    ["email", "email"],
    ["url", "url"],
    ["ipv4", "ipv4"],
    ["ipv6", "ipv6"],
    ["date", "date"],
    ["datetime", "datetime"],
    ["date-time", "datetime"],
    ["dateTime", "datetime"],
]);
const WRONG_TYPE = (tag, type, identifier) => `${LABEL}: ${tag} requires ${type} type, but no "${identifier()}".`;
const validate = (identifier, metadata, output, kind, type, neighbors) => {
    if (type === "array") {
        if (has_array(new Set())(metadata) === false)
            throw new Error(WRONG_TYPE(kind, "array", identifier));
    }
    else if (type === "Date") {
        if (has_native("Date")(new Set())(metadata) === false &&
            has_atomic("string")(new Set())(metadata) === false)
            throw new Error(WRONG_TYPE(kind, "string", identifier));
    }
    else if (has_atomic(type)(new Set())(metadata) === false)
        throw new Error(WRONG_TYPE(kind, type, identifier));
    if (output.some((tag) => tag.kind === kind))
        throw new Error(`${LABEL}: duplicated ${kind} tags on "${identifier()}".`);
    for (const name of neighbors)
        if (output.some((tag) => tag.kind === name))
            throw new Error(`${LABEL}: ${kind} and ${name} tags on "${identifier()}".`);
};
const has_atomic = (type) => (visited) => (metadata) => {
    if (visited.has(metadata))
        return false;
    visited.add(metadata);
    return (metadata.atomics.find(type === "number"
        ? (atom) => atom === type || atom === "bigint"
        : (atom) => atom === type) !== undefined ||
        metadata.arrays.some((array) => has_atomic(type)(visited)(array.value)) ||
        metadata.tuples.some((tuple) => tuple.elements.some(has_atomic(type)(visited))) ||
        metadata.aliases.some((alias) => has_atomic(type)(visited)(alias.value)) ||
        (metadata.resolved !== null &&
            has_atomic(type)(visited)(metadata.resolved.returns)));
};
const has_native = (type) => (visited) => (metadata) => {
    if (visited.has(metadata))
        return false;
    visited.add(metadata);
    return (metadata.natives.find((native) => native === type) !== undefined ||
        metadata.arrays.some((child) => has_native(type)(visited)(child.value)) ||
        metadata.tuples.some((tuple) => tuple.elements.some(has_native(type)(visited))) ||
        metadata.aliases.some((alias) => has_native(type)(visited)(alias.value)) ||
        (metadata.resolved !== null &&
            has_native(type)(visited)(metadata.resolved.returns)));
};
const has_array = (visited) => (metadata) => {
    if (visited.has(metadata))
        return false;
    visited.add(metadata);
    return (metadata.arrays.length !== 0 ||
        metadata.tuples.some((tuple) => tuple.elements.some(has_array(visited))) ||
        metadata.aliases.some((alias) => has_array(visited)(alias.value)) ||
        (metadata.resolved !== null &&
            has_array(visited)(metadata.resolved.returns)));
};
//# sourceMappingURL=MetadataTagFactory.js.map