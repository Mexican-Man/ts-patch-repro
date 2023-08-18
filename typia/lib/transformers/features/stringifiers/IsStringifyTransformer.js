import { IsStringifyProgrammer } from "../../../programmers/IsStringifyProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var IsStringifyTransformer;
(function (IsStringifyTransformer) {
    IsStringifyTransformer.transform = GenericTransformer.scalar("isStringify")((project) => (modulo) => IsStringifyProgrammer.write(project)(modulo));
})(IsStringifyTransformer || (IsStringifyTransformer = {}));
//# sourceMappingURL=IsStringifyTransformer.js.map