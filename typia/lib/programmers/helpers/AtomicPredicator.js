import { ArrayUtil } from "../../utils/ArrayUtil";
export var AtomicPredicator;
(function (AtomicPredicator) {
    AtomicPredicator.constant = (meta) => (name) => !ArrayUtil.has(meta.atomics, (atomic) => atomic === name) &&
        !ArrayUtil.has(meta.natives, (native) => native.toLowerCase() === name);
    AtomicPredicator.atomic = (meta) => (name) => !ArrayUtil.has(meta.natives, (native) => native.toLowerCase() === name);
    AtomicPredicator.native = (name) => LIKE.has(name.toLowerCase());
    AtomicPredicator.template = (meta) => !ArrayUtil.has(meta.atomics, (type) => type === "string");
})(AtomicPredicator || (AtomicPredicator = {}));
const LIKE = new Set(["boolean", "number", "string"]);
//# sourceMappingURL=AtomicPredicator.js.map