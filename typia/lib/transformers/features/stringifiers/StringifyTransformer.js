import { StringifyProgrammer } from "../../../programmers/StringifyProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var StringifyTransformer;
(function (StringifyTransformer) {
    StringifyTransformer.transform = GenericTransformer.scalar("stringify")((project) => (modulo) => StringifyProgrammer.write(project)(modulo));
})(StringifyTransformer || (StringifyTransformer = {}));
//# sourceMappingURL=StringifyTransformer.js.map