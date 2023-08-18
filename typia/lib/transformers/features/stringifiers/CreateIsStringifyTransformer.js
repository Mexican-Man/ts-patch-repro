import { IsStringifyProgrammer } from "../../../programmers/IsStringifyProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateIsStringifyTransformer;
(function (CreateIsStringifyTransformer) {
    CreateIsStringifyTransformer.transform = GenericTransformer.factory("createIsStringify")((project) => (modulo) => IsStringifyProgrammer.write(project)(modulo));
})(CreateIsStringifyTransformer || (CreateIsStringifyTransformer = {}));
//# sourceMappingURL=CreateIsStringifyTransformer.js.map