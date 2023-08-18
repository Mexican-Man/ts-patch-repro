import { ValidateCloneProgrammer } from "../../../programmers/ValidateCloneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateValidateCloneTransformer;
(function (CreateValidateCloneTransformer) {
    CreateValidateCloneTransformer.transform = GenericTransformer.factory("createValidateClone")((project) => (modulo) => ValidateCloneProgrammer.write(project)(modulo));
})(CreateValidateCloneTransformer || (CreateValidateCloneTransformer = {}));
//# sourceMappingURL=CreateValidateCloneTransformer.js.map