import { AssertPruneProgrammer } from "../../../programmers/AssertPruneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var AssertPruneTransformer;
(function (AssertPruneTransformer) {
    AssertPruneTransformer.transform = GenericTransformer.scalar("assertPrune")((project) => (modulo) => AssertPruneProgrammer.write(project)(modulo));
})(AssertPruneTransformer || (AssertPruneTransformer = {}));
//# sourceMappingURL=AssertPruneTransformer.js.map