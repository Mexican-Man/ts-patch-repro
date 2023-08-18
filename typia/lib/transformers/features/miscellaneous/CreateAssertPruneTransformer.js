import { AssertPruneProgrammer } from "../../../programmers/AssertPruneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateAssertPruneTransformer;
(function (CreateAssertPruneTransformer) {
    CreateAssertPruneTransformer.transform = GenericTransformer.factory("createAssertPrune")((project) => (modulo) => AssertPruneProgrammer.write(project)(modulo));
})(CreateAssertPruneTransformer || (CreateAssertPruneTransformer = {}));
//# sourceMappingURL=CreateAssertPruneTransformer.js.map