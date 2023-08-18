import { IsPruneProgrammer } from "../../../programmers/IsPruneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var IsPruneTransformer;
(function (IsPruneTransformer) {
    IsPruneTransformer.transform = GenericTransformer.scalar("isPrune")((project) => (modulo) => IsPruneProgrammer.write(project)(modulo));
})(IsPruneTransformer || (IsPruneTransformer = {}));
//# sourceMappingURL=IsPruneTransformer.js.map