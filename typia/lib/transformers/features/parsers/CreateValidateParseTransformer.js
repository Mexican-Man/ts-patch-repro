import { ValidateParseProgrammer } from "../../../programmers/ValidateParseProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateValidateParseTransformer;
(function (CreateValidateParseTransformer) {
    CreateValidateParseTransformer.transform = GenericTransformer.factory("createValidateParse")((project) => (modulo) => ValidateParseProgrammer.write(project)(modulo));
})(CreateValidateParseTransformer || (CreateValidateParseTransformer = {}));
//# sourceMappingURL=CreateValidateParseTransformer.js.map