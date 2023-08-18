import { AssertProgrammer } from "../../../programmers/AssertProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateAssertTransformer;
(function (CreateAssertTransformer) {
    CreateAssertTransformer.transform = (equals) => GenericTransformer.factory(equals ? "createAssertEquals" : "createAssert")((project) => (modulo) => AssertProgrammer.write(project)(modulo)(equals));
})(CreateAssertTransformer || (CreateAssertTransformer = {}));
//# sourceMappingURL=CreateAssertTransformer.js.map