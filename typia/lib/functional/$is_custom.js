import { $dictionary } from "./$dictionary";
export const $is_custom = (name, type, text, value) => {
    var _a;
    const validator = (_a = $dictionary.get(name)) === null || _a === void 0 ? void 0 : _a.get(type);
    if (validator === undefined)
        return true;
    return validator(text)(value);
};
//# sourceMappingURL=$is_custom.js.map