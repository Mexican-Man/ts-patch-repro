import { ArrayUtil } from "../../../utils/ArrayUtil";
import { TypeFactory } from "../../TypeFactory";
export const iterate_metadata_native = (checker) => (meta, type) => {
    var _a, _b;
    const validator = validate(checker)(type);
    const name = TypeFactory.getFullName(checker)(type, type.getSymbol());
    const simple = SIMPLES.get(name);
    if (simple && validator(simple)) {
        ArrayUtil.set(meta.natives, name, (str) => str);
        return true;
    }
    const complicate = COMPLICATES.get(name);
    if (complicate && validator(complicate)) {
        ArrayUtil.set(meta.natives, (_a = complicate.name) !== null && _a !== void 0 ? _a : name, (str) => str);
        return true;
    }
    for (const generic of GENERICS)
        if (name.substring(0, generic.name.length) === generic.name &&
            validator(generic)) {
            ArrayUtil.set(meta.natives, (_b = generic.name) !== null && _b !== void 0 ? _b : name, (str) => str);
            return true;
        }
    return false;
};
const validate = (checker) => (type) => (info) => {
    var _a, _b;
    return ((_a = info.methods) !== null && _a !== void 0 ? _a : []).every((method) => {
        const returnType = TypeFactory.getReturnType(checker)(type)(method.name);
        return (returnType !== null &&
            checker.typeToString(returnType) === method.return);
    }) &&
        ((_b = info.properties) !== null && _b !== void 0 ? _b : []).every((property) => {
            const prop = checker.getPropertyOfType(type, property.name);
            const propType = (prop === null || prop === void 0 ? void 0 : prop.valueDeclaration)
                ? checker.getTypeAtLocation(prop === null || prop === void 0 ? void 0 : prop.valueDeclaration)
                : undefined;
            return (propType !== undefined &&
                checker.typeToString(propType) === property.type);
        });
};
const getBinaryProps = (className) => ({
    name: className,
    methods: [
        ...["indexOf", "lastIndexOf"].map((name) => ({
            name,
            return: "number",
        })),
        ...["some", "every"].map((name) => ({
            name,
            return: "boolean",
        })),
        ...["join", "toLocaleString"].map((name) => ({
            name,
            return: "string",
        })),
        ...["reverse", "slice", "subarray"].map((name) => ({
            name,
            return: className,
        })),
    ],
    properties: ["BYTES_PER_ELEMENT", "length", "byteLength", "byteOffset"].map((name) => ({
        name,
        type: "number",
    })),
});
const SIMPLES = new Map([
    [
        "Date",
        {
            methods: ["getTime", "getFullYear", "getMonth", "getMinutes"].map((name) => ({
                name,
                return: "number",
            })),
        },
    ],
    [
        "Boolean",
        {
            methods: [
                {
                    name: "valueOf",
                    return: "boolean",
                },
            ],
        },
    ],
    [
        "Number",
        {
            methods: [
                ...["toFixed", "toExponential", "toPrecision"].map((name) => ({
                    name,
                    return: "string",
                })),
                {
                    name: "valueOf",
                    return: "number",
                },
            ],
        },
    ],
    [
        "String",
        {
            methods: [
                "charAt",
                "concat",
                "valueOf",
                "trim",
                "replace",
                "substring",
            ].map((name) => ({
                name,
                return: "string",
            })),
        },
    ],
    ...[
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "BigUint64Array",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "BigInt64Array",
        "Float32Array",
        "Float64Array",
    ].map((name) => [name, getBinaryProps(name)]),
    ...["ArrayBuffer", "SharedArrayBuffer"].map((className) => {
        const info = {
            methods: [
                {
                    name: "slice",
                    return: className,
                },
            ],
            properties: [
                {
                    name: "byteLength",
                    type: "number",
                },
            ],
        };
        return [className, info];
    }),
    [
        "DataView",
        {
            methods: [
                "getFloat32",
                "getFloat64",
                "getInt8",
                "getInt16",
                "getInt32",
                "getUint8",
                "getUint16",
                "getUint32",
            ].map((name) => ({
                name,
                return: "number",
            })),
        },
    ],
]);
const COMPLICATES = new Map([
    [`'buffer'.global.Buffer`, getBinaryProps("Buffer")],
]);
const GENERICS = [
    "WeakMap",
    "WeakSet",
].map((name) => ({
    name,
    methods: ["has", "delete"].map((name) => ({
        name,
        return: "boolean",
    })),
}));
//# sourceMappingURL=iterate_metadata_native.js.map