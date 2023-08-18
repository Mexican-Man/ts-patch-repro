import ts from "typescript";
import { check_dynamic_properties } from "./check_dynamic_properties";
import { check_everything } from "./check_everything";
export const check_object = (props) => (importer) => (input, entries) => {
    const regular = entries.filter((entry) => entry.key.isSoleLiteral());
    const dynamic = entries.filter((entry) => !entry.key.isSoleLiteral());
    const flags = regular.map((entry) => entry.expression);
    if (props.equals === false && dynamic.length === 0)
        return regular.length === 0 ? props.positive : reduce(props)(flags);
    flags.push(check_dynamic_properties(props)(importer)(input, regular, dynamic));
    return reduce(props)(flags);
};
const reduce = (props) => (expressions) => props.assert
    ? expressions.reduce(props.reduce)
    : check_everything(ts.factory.createArrayLiteralExpression(expressions));
//# sourceMappingURL=check_object.js.map