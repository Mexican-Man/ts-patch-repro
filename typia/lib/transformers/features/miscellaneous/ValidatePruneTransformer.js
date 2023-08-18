import { ValidatePruneProgrammer } from "../../../programmers/ValidatePruneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var ValidatePruneTransformer;
(function (ValidatePruneTransformer) {
    ValidatePruneTransformer.transform = GenericTransformer.scalar("validatPrune")((project) => (modulo) => ValidatePruneProgrammer.write(project)(modulo));
})(ValidatePruneTransformer || (ValidatePruneTransformer = {}));
//# sourceMappingURL=ValidatePruneTransformer.js.map