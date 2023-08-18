import { ValidateStringifyProgrammer } from "../../../programmers/ValidateStringifyProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var ValidateStringifyTransformer;
(function (ValidateStringifyTransformer) {
    ValidateStringifyTransformer.transform = GenericTransformer.scalar("validatStringify")((project) => (modulo) => ValidateStringifyProgrammer.write(project)(modulo));
})(ValidateStringifyTransformer || (ValidateStringifyTransformer = {}));
//# sourceMappingURL=ValidateStringifyTransformer.js.map