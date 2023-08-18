import { ValidateProgrammer } from "../../../programmers/ValidateProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var ValidateTransformer;
(function (ValidateTransformer) {
    ValidateTransformer.transform = (equals) => GenericTransformer.scalar(equals ? "validateEquals" : "validate")((project) => (modulo) => ValidateProgrammer.write(project)(modulo)(equals));
})(ValidateTransformer || (ValidateTransformer = {}));
//# sourceMappingURL=ValidateTransformer.js.map