import { IsPruneProgrammer } from "../../../programmers/IsPruneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateIsPruneTransformer;
(function (CreateIsPruneTransformer) {
    CreateIsPruneTransformer.transform = GenericTransformer.factory("createIsPrune")((project) => (modulo) => IsPruneProgrammer.write(project)(modulo));
})(CreateIsPruneTransformer || (CreateIsPruneTransformer = {}));
//# sourceMappingURL=CreateIsPruneTransformer.js.map