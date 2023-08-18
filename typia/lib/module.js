import { $dictionary } from "./functional/$dictionary";
import { Namespace } from "./functional/Namespace";
import { MapUtil } from "./utils/MapUtil";
export * from "./schemas/IJsonApplication";
export * from "./schemas/IJsonComponents";
export * from "./schemas/IJsonSchema";
export * from "./IRandomGenerator";
export * from "./IValidation";
export * from "./Primitive";
export * from "./TypeGuardError";
export function assert() {
    halt("assert");
}
Object.assign(assert, Namespace.assert("assert"));
export function assertType() {
    halt("assertType");
}
Object.assign(assertType, Namespace.assert("assertType"));
export function is() {
    halt("is");
}
Object.assign(is, Namespace.assert("is"));
export function validate() {
    halt("validate");
}
Object.assign(validate, Namespace.validate());
export function assertEquals() {
    halt("assertEquals");
}
Object.assign(assertEquals, Namespace.assert("assertEquals"));
export function equals() {
    halt("equals");
}
Object.assign(equals, Namespace.is());
export function validateEquals() {
    halt("validateEquals");
}
Object.assign(validateEquals, Namespace.validate());
export const customValidators = {
    size: (name) => { var _a, _b; return name ? (_b = (_a = $dictionary.get(name)) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0 : $dictionary.size; },
    has: (name) => (type) => { var _a, _b; return (_b = (_a = $dictionary.get(name)) === null || _a === void 0 ? void 0 : _a.has(type)) !== null && _b !== void 0 ? _b : false; },
    get: (name) => (type) => { var _a; return (_a = $dictionary.get(name)) === null || _a === void 0 ? void 0 : _a.get(type); },
    insert: (name) => (type) => (closure) => {
        const internal = MapUtil.take($dictionary)(name, () => new Map());
        if (internal.has(type))
            return false;
        internal.set(type, closure);
        return true;
    },
    erase: (name) => (type) => { var _a, _b; return (_b = (_a = $dictionary.get(name)) === null || _a === void 0 ? void 0 : _a.delete(type)) !== null && _b !== void 0 ? _b : false; },
};
export function application() {
    halt("application");
}
export function assertParse() {
    halt("assertParse");
}
Object.assign(assertParse, Namespace.assert("assertParse"));
export function isParse() {
    halt("isParse");
}
Object.assign(isParse, is);
export function validateParse() {
    halt("validateParse");
}
Object.assign(validateParse, validate);
export function stringify() {
    halt("stringify");
}
Object.assign(stringify, Namespace.stringify("stringify"));
export function assertStringify() {
    halt("assertStringify");
}
Object.assign(assertStringify, Namespace.assert("assertStringify"));
Object.assign(assertStringify, Namespace.stringify("assertStringify"));
export function isStringify() {
    halt("isStringify");
}
Object.assign(isStringify, Namespace.is());
Object.assign(isStringify, Namespace.stringify("isStringify"));
export function validateStringify() {
    halt("validateStringify");
}
Object.assign(validateStringify, Namespace.validate());
Object.assign(validateStringify, Namespace.stringify("validateStringify"));
export function metadata() {
    halt("metadata");
}
export function random() {
    halt("random");
}
Object.assign(random, Namespace.random());
export function literals() {
    halt("literals");
}
export function clone() {
    halt("clone");
}
Object.assign(clone, Namespace.clone("clone"));
export function assertClone() {
    halt("assertClone");
}
Object.assign(assertClone, Namespace.assert("assertClone"));
Object.assign(assertClone, Namespace.clone("assertClone"));
export function isClone() {
    halt("isClone");
}
Object.assign(isClone, Namespace.is());
Object.assign(isClone, Namespace.clone("isClone"));
export function validateClone() {
    halt("validateClone");
}
Object.assign(validateClone, Namespace.validate());
Object.assign(validateClone, Namespace.clone("validateClone"));
export function prune() {
    halt("prune");
}
Object.assign(prune, Namespace.prune("prune"));
export function assertPrune() {
    halt("assertPrune");
}
Object.assign(assertPrune, Namespace.assert("assertPrune"));
Object.assign(assertPrune, Namespace.prune("assertPrune"));
export function isPrune() {
    halt("isPrune");
}
Object.assign(isPrune, Namespace.is());
Object.assign(isPrune, Namespace.prune("isPrune"));
export function validatePrune() {
    halt("validatePrune");
}
Object.assign(validatePrune, Namespace.prune("validatePrune"));
Object.assign(validatePrune, Namespace.validate());
export function createAssert() {
    halt("createAssert");
}
Object.assign(createAssert, assert);
export function createAssertType() {
    halt("createAssertType");
}
Object.assign(createAssertType, assertType);
export function createIs() {
    halt("createIs");
}
Object.assign(createIs, is);
export function createValidate() {
    halt("createValidate");
}
Object.assign(createValidate, validate);
export function createAssertEquals() {
    halt("createAssertEquals");
}
Object.assign(createAssertEquals, assertEquals);
export function createEquals() {
    halt("createEquals");
}
Object.assign(createEquals, equals);
export function createValidateEquals() {
    halt("createValidateEquals");
}
Object.assign(createValidateEquals, validateEquals);
export function createIsParse() {
    halt("createIsParse");
}
Object.assign(createIsParse, isParse);
export function createAssertParse() {
    halt("createAssertParse");
}
Object.assign(createAssertParse, assertParse);
export function createValidateParse() {
    halt("createValidateParse");
}
Object.assign(createValidateParse, validateParse);
export function createStringify() {
    halt("createStringify");
}
Object.assign(createStringify, stringify);
export function createAssertStringify() {
    halt("createAssertStringify");
}
Object.assign(createAssertStringify, assertStringify);
export function createIsStringify() {
    halt("createIsStringify");
}
Object.assign(createIsStringify, isStringify);
export function createValidateStringify() {
    halt("createValidateStringify");
}
Object.assign(createValidateStringify, validateStringify);
export function createRandom() {
    halt("createRandom");
}
Object.assign(createRandom, random);
export function createClone() {
    halt("createClone");
}
Object.assign(createClone, clone);
export function createAssertClone() {
    halt("createAssertClone");
}
Object.assign(createAssertClone, assertClone);
export function createIsClone() {
    halt("createIsClone");
}
Object.assign(createIsClone, isClone);
export function createValidateClone() {
    halt("createValidateClone");
}
Object.assign(createValidateClone, validateClone);
export function createPrune() {
    halt("createPrune");
}
Object.assign(createPrune, prune);
export function createAssertPrune() {
    halt("createAssertPrune");
}
Object.assign(createAssertPrune, assertPrune);
export function createIsPrune() {
    halt("createIsPrune");
}
Object.assign(createIsPrune, isPrune);
export function createValidatePrune() {
    halt("createValidatePrune");
}
Object.assign(createValidatePrune, validatePrune);
function halt(name) {
    throw new Error(`Error on typia.${name}(): no transform has been configured. Read and follow https://typia.io/docs/setup please.`);
}
//# sourceMappingURL=module.js.map