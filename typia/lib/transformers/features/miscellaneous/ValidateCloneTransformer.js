import { ValidateCloneProgrammer } from "../../../programmers/ValidateCloneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var ValidateCloneTransformer;
(function (ValidateCloneTransformer) {
    ValidateCloneTransformer.transform = GenericTransformer.scalar("validatClone")((project) => (modulo) => ValidateCloneProgrammer.write(project)(modulo));
})(ValidateCloneTransformer || (ValidateCloneTransformer = {}));
//# sourceMappingURL=ValidateCloneTransformer.js.map