import { PruneProgrammer } from "../../../programmers/PruneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var PruneTransformer;
(function (PruneTransformer) {
    PruneTransformer.transform = GenericTransformer.scalar("prune")((project) => (modulo) => PruneProgrammer.write(project)(modulo));
})(PruneTransformer || (PruneTransformer = {}));
//# sourceMappingURL=PruneTransformer.js.map