import { AssertCloneProgrammer } from "../../../programmers/AssertCloneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var AssertCloneTransformer;
(function (AssertCloneTransformer) {
    AssertCloneTransformer.transform = GenericTransformer.scalar("assertClone")((project) => (modulo) => AssertCloneProgrammer.write(project)(modulo));
})(AssertCloneTransformer || (AssertCloneTransformer = {}));
//# sourceMappingURL=AssertCloneTransformer.js.map