import { IsCloneProgrammer } from "../../../programmers/IsCloneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var IsCloneTransformer;
(function (IsCloneTransformer) {
    IsCloneTransformer.transform = GenericTransformer.scalar("isClone")((project) => (modulo) => IsCloneProgrammer.write(project)(modulo));
})(IsCloneTransformer || (IsCloneTransformer = {}));
//# sourceMappingURL=IsCloneTransformer.js.map