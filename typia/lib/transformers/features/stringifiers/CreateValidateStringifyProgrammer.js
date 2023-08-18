import { ValidateStringifyProgrammer } from "../../../programmers/ValidateStringifyProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateValidateStringifyTransformer;
(function (CreateValidateStringifyTransformer) {
    CreateValidateStringifyTransformer.transform = GenericTransformer.factory("createValidateStringify")((project) => (modulo) => ValidateStringifyProgrammer.write(project)(modulo));
})(CreateValidateStringifyTransformer || (CreateValidateStringifyTransformer = {}));
//# sourceMappingURL=CreateValidateStringifyProgrammer.js.map