export const $is_url = (str) => REGEX.test(str);
const REGEX = /^[a-zA-Z0-9]+:\/\/(?:www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
//# sourceMappingURL=$is_url.js.map