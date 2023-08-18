export var StringifyPredicator;
(function (StringifyPredicator) {
    StringifyPredicator.require_escape = (value) => value.split("").some((ch) => ESCAPED.some((escaped) => escaped === ch));
    StringifyPredicator.undefindable = (meta) => meta.isRequired() === false ||
        (meta.resolved !== null &&
            meta.resolved.returns.isRequired() === false);
    const ESCAPED = ['"', "\\", "\b", "\f", "\n", "\n", "\r", "\t"];
})(StringifyPredicator || (StringifyPredicator = {}));
//# sourceMappingURL=StringifyPredicator.js.map