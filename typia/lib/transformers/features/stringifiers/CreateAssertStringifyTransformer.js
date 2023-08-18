import { AssertStringifyProgrammer } from "../../../programmers/AssertStringifyProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateAssertStringifyTransformer;
(function (CreateAssertStringifyTransformer) {
    CreateAssertStringifyTransformer.transform = GenericTransformer.factory("createAssertStringify")((project) => (modulo) => AssertStringifyProgrammer.write(project)(modulo));
})(CreateAssertStringifyTransformer || (CreateAssertStringifyTransformer = {}));
//# sourceMappingURL=CreateAssertStringifyTransformer.js.map