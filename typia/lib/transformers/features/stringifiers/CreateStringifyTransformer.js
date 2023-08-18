import { StringifyProgrammer } from "../../../programmers/StringifyProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateStringifyTransformer;
(function (CreateStringifyTransformer) {
    CreateStringifyTransformer.transform = GenericTransformer.factory("createStringify")((project) => (modulo) => StringifyProgrammer.write(project)(modulo));
})(CreateStringifyTransformer || (CreateStringifyTransformer = {}));
//# sourceMappingURL=CreateStringifyTransformer.js.map