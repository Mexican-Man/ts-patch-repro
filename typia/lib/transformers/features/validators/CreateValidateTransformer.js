import { ValidateProgrammer } from "../../../programmers/ValidateProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateValidateTransformer;
(function (CreateValidateTransformer) {
    CreateValidateTransformer.transform = (equals) => GenericTransformer.factory(equals ? "createValidateEquals" : "createValidate")((project) => (modulo) => ValidateProgrammer.write(project)(modulo)(equals));
})(CreateValidateTransformer || (CreateValidateTransformer = {}));
//# sourceMappingURL=CreateValidateTransformer.js.map