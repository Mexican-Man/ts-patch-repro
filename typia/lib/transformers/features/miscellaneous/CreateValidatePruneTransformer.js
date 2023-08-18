import { ValidatePruneProgrammer } from "../../../programmers/ValidatePruneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateValidatePruneTransformer;
(function (CreateValidatePruneTransformer) {
    CreateValidatePruneTransformer.transform = GenericTransformer.factory("createValidatePrune")((project) => (modulo) => ValidatePruneProgrammer.write(project)(modulo));
})(CreateValidatePruneTransformer || (CreateValidatePruneTransformer = {}));
//# sourceMappingURL=CreateValidatePruneTransformer.js.map