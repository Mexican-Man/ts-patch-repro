import { MetadataAlias } from "../metadata/MetadataAlias";
import { MetadataArray } from "../metadata/MetadataArray";
import { MetadataObject } from "../metadata/MetadataObject";
import { MetadataTuple } from "../metadata/MetadataTuple";
import { Writable } from "../typings/Writable";
import { MapUtil } from "../utils/MapUtil";
import { CommentFactory } from "./CommentFactory";
import { TypeFactory } from "./TypeFactory";
export class MetadataCollection {
    constructor(options) {
        this.options = options;
        this.entire_ = new Set();
        this.objects_ = new Map();
        this.object_unions_ = new Map();
        this.aliases_ = new Map();
        this.arrays_ = new Map();
        this.tuples_ = new Map();
        this.names_ = new Map();
        this.object_index_ = 0;
        this.recursive_array_index_ = 0;
        this.recursive_tuple_index_ = 0;
    }
    aliases() {
        return [...this.aliases_.values()];
    }
    objects() {
        return [...this.objects_.values()];
    }
    unions() {
        return [...this.object_unions_.values()];
    }
    arrays() {
        return [...this.arrays_.values()];
    }
    tuples() {
        return [...this.tuples_.values()];
    }
    getName(checker, type) {
        const name = (() => {
            var _a;
            const str = TypeFactory.getFullName(checker)(type);
            return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.replace) ? this.options.replace(str) : str;
        })();
        const duplicates = MapUtil.take(this.names_)(name, () => new Map());
        const oldbie = duplicates.get(type);
        if (oldbie !== undefined)
            return oldbie;
        const addicted = duplicates.size
            ? `${name}.o${duplicates.size}`
            : name;
        duplicates.set(type, addicted);
        return addicted;
    }
    getUnionIndex(meta) {
        const key = meta.objects.map((obj) => obj.name).join(" | ");
        MapUtil.take(this.object_unions_)(key, () => meta.objects);
        return [...this.object_unions_.keys()].indexOf(key);
    }
    emplace(checker, type) {
        var _a, _b, _c;
        const oldbie = this.objects_.get(type);
        if (oldbie !== undefined)
            return [oldbie, false];
        const $id = this.getName(checker, type);
        const obj = MetadataObject.create({
            name: $id,
            properties: [],
            description: (_a = (type.symbol && CommentFactory.description(type.symbol))) !== null && _a !== void 0 ? _a : undefined,
            jsDocTags: (_c = (_b = type.symbol) === null || _b === void 0 ? void 0 : _b.getJsDocTags()) !== null && _c !== void 0 ? _c : [],
            validated: false,
            index: this.object_index_++,
            recursive: null,
            nullables: [],
        });
        this.objects_.set(type, obj);
        return [obj, true];
    }
    emplaceAlias(checker, type, symbol) {
        var _a, _b;
        const oldbie = this.aliases_.get(type);
        if (oldbie !== undefined)
            return [oldbie, false, () => { }];
        const $id = this.getName(checker, type);
        const alias = MetadataAlias.create({
            name: $id,
            value: null,
            description: (_a = CommentFactory.description(symbol)) !== null && _a !== void 0 ? _a : null,
            recursive: null,
            nullables: [],
            tags: [],
            jsDocTags: (_b = symbol.getJsDocTags()) !== null && _b !== void 0 ? _b : [],
        });
        this.aliases_.set(type, alias);
        return [alias, true, (meta) => (Writable(alias).value = meta)];
    }
    emplaceArray(checker, type) {
        const oldbie = this.arrays_.get(type);
        if (oldbie !== undefined)
            return [oldbie, false, () => { }];
        const $id = this.getName(checker, type);
        const array = MetadataArray.create({
            name: $id,
            value: null,
            index: null,
            recursive: null,
            nullables: [],
        });
        this.arrays_.set(type, array);
        return [array, true, (meta) => (Writable(array).value = meta)];
    }
    emplaceTuple(checker, type) {
        const oldbie = this.tuples_.get(type);
        if (oldbie !== undefined)
            return [oldbie, false, () => { }];
        const $id = this.getName(checker, type);
        const tuple = MetadataTuple.create({
            name: $id,
            elements: null,
            index: null,
            recursive: null,
            nullables: [],
        });
        this.tuples_.set(type, tuple);
        return [
            tuple,
            true,
            (elements) => (Writable(tuple).elements = elements),
        ];
    }
    setObjectRecursive(obj, recursive) {
        Writable(obj).recursive = recursive;
    }
    setAliasRecursive(alias, recursive) {
        Writable(alias).recursive = recursive;
    }
    setArrayRecursive(array, recursive) {
        Writable(array).recursive = recursive;
        if (recursive)
            Writable(array).index = this.recursive_array_index_++;
    }
    setTupleRecursive(tuple, recursive) {
        Writable(tuple).recursive = recursive;
        if (recursive)
            Writable(tuple).index = this.recursive_tuple_index_++;
    }
    toJSON() {
        return {
            objects: this.objects().map((o) => o.toJSON()),
            aliases: this.aliases().map((d) => d.toJSON()),
            arrays: [...this.arrays_.values()].map((a) => a.toJSON()),
            tuples: [...this.tuples_.values()].map((t) => t.toJSON()),
        };
    }
}
(function (MetadataCollection) {
    MetadataCollection.replace = (str) => {
        for (const [before, after] of REPLACERS)
            str = str.split(before).join(after);
        return str;
    };
    MetadataCollection.escape = (str) => {
        for (const [before, after] of REPLACERS)
            if (after !== "")
                str = str.split(after).join(before);
        return str;
    };
})(MetadataCollection || (MetadataCollection = {}));
const REPLACERS = [
    ["$", "_dollar_"],
    ["&", "_and_"],
    ["|", "_or_"],
    ["{", "_blt_"],
    ["}", "_bgt_"],
    ["<", "_lt_"],
    [">", "_gt_"],
    ["[", "_alt_"],
    ["]", "_agt_"],
    [",", "_comma_"],
    ["`", "_backquote_"],
    ["'", "_singlequote_"],
    ['"', "_doublequote_"],
    [" ", "_space_"],
];
//# sourceMappingURL=MetadataCollection.js.map