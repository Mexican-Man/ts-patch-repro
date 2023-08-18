import ts from "typescript";
export var RandomRanger;
(function (RandomRanger) {
    RandomRanger.length = (coalesce) => (defs) => (acc) => (tags) => {
        var _a, _b;
        const props = {
            fixed: getter(tags)(acc.fixed),
            minimum: getter(tags)(acc.minimum),
            maximum: getter(tags)(acc.maximum),
        };
        if (props.fixed !== undefined)
            return ts.factory.createNumericLiteral(props.fixed);
        else if (props.minimum === undefined && props.maximum === undefined)
            return undefined;
        (_a = props.minimum) !== null && _a !== void 0 ? _a : (props.minimum = defs.minimum);
        (_b = props.maximum) !== null && _b !== void 0 ? _b : (props.maximum = defs.maximum);
        if (props.maximum < props.minimum)
            props.maximum += defs.gap;
        return ts.factory.createCallExpression(coalesce("integer"), undefined, [
            ts.factory.createNumericLiteral(props.minimum),
            ts.factory.createNumericLiteral(props.maximum),
        ]);
    };
    RandomRanger.number = (config) => (defs) => (tags) => {
        var _a, _b, _c, _d;
        const range = {
            minimum: {
                value: (_a = getter(tags)("minimum")) !== null && _a !== void 0 ? _a : getter(tags)("exclusiveMinimum"),
                exclusive: getter(tags)("exclusiveMinimum") !== undefined,
            },
            maximum: {
                value: (_b = getter(tags)("maximum")) !== null && _b !== void 0 ? _b : getter(tags)("exclusiveMaximum"),
                exclusive: getter(tags)("exclusiveMaximum") !== undefined,
            },
            step: getter(tags)("step"),
            multiply: getter(tags)("multipleOf"),
        };
        if (Object.values(range).every((v) => v !== undefined))
            return config.setter([]);
        if (range.step !== undefined) {
            const { intercept, minimum, maximum } = stepper(defs.gap)(range)(range.step);
            return ts.factory.createAdd(config.transform(intercept), ts.factory.createMultiply(config.transform(range.step), config.setter([minimum, maximum])));
        }
        else if (range.multiply !== undefined) {
            const { minimum, maximum } = multiplier(defs.gap)(range)(range.multiply);
            return ts.factory.createMultiply(config.transform(range.multiply), config.setter([minimum, maximum]));
        }
        const integer = (value) => value === Math.floor(value);
        if (tags.find((t) => t.kind === "type" && t.value.indexOf("int") !== -1) !== undefined) {
            if (range.minimum.value !== undefined) {
                if (range.minimum.exclusive) {
                    range.minimum.exclusive = false;
                    if (integer(range.minimum.value))
                        range.minimum.value += 1;
                }
                range.minimum.value = Math.ceil(range.minimum.value);
            }
            if (range.maximum.value !== undefined) {
                if (range.maximum.exclusive) {
                    range.maximum.exclusive = false;
                    if (integer(range.maximum.value))
                        range.maximum.value -= 1;
                }
                range.maximum.value = Math.floor(range.maximum.value);
            }
        }
        if (tags.find((t) => t.kind === "type" && t.value.indexOf("uint") === 0) !== undefined) {
            if (range.minimum.value === undefined)
                range.minimum.value = 0;
            else if (range.minimum.value <= 0) {
                range.minimum.value = 0;
                range.minimum.exclusive = false;
            }
        }
        const minimum = (_c = range.minimum.value) !== null && _c !== void 0 ? _c : (range.maximum.value !== undefined
            ? range.maximum.value - defs.gap
            : defs.minimum);
        const maximum = (_d = range.maximum.value) !== null && _d !== void 0 ? _d : (range.minimum.value !== undefined
            ? range.minimum.value + defs.gap
            : defs.maximum);
        return config.setter([minimum, maximum]);
    };
})(RandomRanger || (RandomRanger = {}));
const getter = (tags) => (kind) => { var _a; return (_a = tags.find((t) => t.kind === kind)) === null || _a === void 0 ? void 0 : _a.value; };
const stepper = (gap) => (range) => (s) => {
    const intercept = range.minimum.value;
    const minimum = range.minimum.exclusive ? 1 : 0;
    if (range.maximum.value === undefined)
        return {
            intercept,
            minimum,
            maximum: gap,
        };
    const y = Math.floor(range.maximum.value - intercept) / s;
    return {
        intercept,
        minimum,
        maximum: range.maximum.exclusive && intercept + y * s === range.maximum.value
            ? y - 1
            : y,
    };
};
const multiplier = (gap) => (range) => (m) => {
    const minimum = range.minimum.value === undefined
        ? 0
        : (() => {
            const x = m * Math.ceil(range.minimum.value / m);
            return range.minimum.exclusive && x === range.minimum.value
                ? x + m
                : x;
        })() / m;
    const maximum = range.maximum.value === undefined
        ? gap
        : (() => {
            const y = m * Math.floor(range.maximum.value / m);
            return range.maximum.exclusive && y === range.maximum.value
                ? y - m
                : y;
        })() / m;
    return { minimum, maximum };
};
//# sourceMappingURL=RandomRanger.js.map