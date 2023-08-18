import { IsCloneProgrammer } from "../../../programmers/IsCloneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateIsCloneTransformer;
(function (CreateIsCloneTransformer) {
    CreateIsCloneTransformer.transform = GenericTransformer.factory("createIsClone")((project) => (modulo) => IsCloneProgrammer.write(project)(modulo));
})(CreateIsCloneTransformer || (CreateIsCloneTransformer = {}));
//# sourceMappingURL=CreateIsCloneTransformer.js.map