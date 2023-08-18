export const $string = (str) => {
    if (STR_ESCAPE.test(str) === false)
        return `"${str}"`;
    const length = str.length;
    if (length > 41)
        return JSON.stringify(str);
    let result = "";
    let last = -1;
    let point = 255;
    for (let i = 0; i < length; ++i) {
        point = str.charCodeAt(i);
        if (point < 32) {
            return JSON.stringify(str);
        }
        if (point >= 0xd800 && point <= 0xdfff) {
            return JSON.stringify(str);
        }
        if (point === 0x22 ||
            point === 0x5c) {
            last === -1 && (last = 0);
            result += str.slice(last, i) + "\\";
            last = i;
        }
    }
    return ((last === -1 && '"' + str + '"') || '"' + result + str.slice(last) + '"');
};
const STR_ESCAPE = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
//# sourceMappingURL=$string.js.map