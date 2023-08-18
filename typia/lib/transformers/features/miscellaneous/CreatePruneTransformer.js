import { PruneProgrammer } from "../../../programmers/PruneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreatePruneTransformer;
(function (CreatePruneTransformer) {
    CreatePruneTransformer.transform = GenericTransformer.factory("createPrune")((project) => (modulo) => PruneProgrammer.write(project)(modulo));
})(CreatePruneTransformer || (CreatePruneTransformer = {}));
//# sourceMappingURL=CreatePruneTransformer.js.map