import { AssertCloneProgrammer } from "../../../programmers/AssertCloneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateAssertCloneTransformer;
(function (CreateAssertCloneTransformer) {
    CreateAssertCloneTransformer.transform = GenericTransformer.factory("createAssertClone")((project) => (modulo) => AssertCloneProgrammer.write(project)(modulo));
})(CreateAssertCloneTransformer || (CreateAssertCloneTransformer = {}));
//# sourceMappingURL=CreateAssertCloneTransformer.js.map