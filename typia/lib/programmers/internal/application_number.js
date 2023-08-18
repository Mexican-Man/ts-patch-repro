import { application_default } from "./application_default";
export const application_number = (attribute) => {
    var _a, _b;
    const output = Object.assign(Object.assign({}, attribute), { type: "number" });
    for (const tag of (_a = attribute["x-typia-metaTags"]) !== null && _a !== void 0 ? _a : []) {
        if (tag.kind === "type" &&
            (tag.value === "int" ||
                tag.value === "uint" ||
                tag.value === "{int}" ||
                tag.value === "{uint}"))
            output.type = "integer";
        else if (tag.kind === "minimum")
            output.minimum = tag.value;
        else if (tag.kind === "maximum")
            output.maximum = tag.value;
        else if (tag.kind === "exclusiveMinimum") {
            output.minimum = tag.value;
            output.exclusiveMinimum = true;
        }
        else if (tag.kind === "exclusiveMaximum") {
            output.maximum = tag.value;
            output.exclusiveMaximum = true;
        }
        else if (tag.kind === "multipleOf")
            output.multipleOf = tag.value;
    }
    if (output.type === "integer" &&
        ((_b = attribute["x-typia-metaTags"]) !== null && _b !== void 0 ? _b : []).find((tag) => tag.kind === "type" && tag.value === "uint"))
        if (output.minimum === undefined ||
            (output.exclusiveMaximum !== true && output.minimum < 0))
            output.minimum = 0;
        else if (output.exclusiveMinimum === true && output.minimum < -1) {
            output.maximum = 0;
            delete output.exclusiveMinimum;
        }
    output.default = application_default(attribute)((str) => {
        const value = Number(str);
        const conditions = [!Number.isNaN(value)];
        if (output.minimum !== undefined)
            if (output.exclusiveMinimum === true)
                conditions.push(value > output.minimum);
            else
                conditions.push(value >= output.minimum);
        if (output.maximum !== undefined)
            if (output.exclusiveMaximum === true)
                conditions.push(value < output.maximum);
            else
                conditions.push(value <= output.maximum);
        if (output.multipleOf !== undefined)
            conditions.push(value % output.multipleOf === 0);
        return conditions.every((cond) => cond);
    })((str) => Number(str));
    return output;
};
//# sourceMappingURL=application_number.js.map