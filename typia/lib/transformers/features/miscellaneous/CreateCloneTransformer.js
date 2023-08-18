import { CloneProgrammer } from "../../../programmers/CloneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateCloneTransformer;
(function (CreateCloneTransformer) {
    CreateCloneTransformer.transform = GenericTransformer.factory("createClone")((project) => (modulo) => CloneProgrammer.write(project)(modulo));
})(CreateCloneTransformer || (CreateCloneTransformer = {}));
//# sourceMappingURL=CreateCloneTransformer.js.map