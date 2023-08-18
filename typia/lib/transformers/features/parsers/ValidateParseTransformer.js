import { ValidateParseProgrammer } from "../../../programmers/ValidateParseProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var ValidateParseTransformer;
(function (ValidateParseTransformer) {
    ValidateParseTransformer.transform = GenericTransformer.scalar("validatParse")((project) => (modulo) => ValidateParseProgrammer.write(project)(modulo));
})(ValidateParseTransformer || (ValidateParseTransformer = {}));
//# sourceMappingURL=ValidateParseTransformer.js.map