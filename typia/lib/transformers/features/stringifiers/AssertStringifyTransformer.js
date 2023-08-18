import { AssertStringifyProgrammer } from "../../../programmers/AssertStringifyProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var AssertStringifyTransformer;
(function (AssertStringifyTransformer) {
    AssertStringifyTransformer.transform = GenericTransformer.scalar("assertStringify")((project) => (modulo) => AssertStringifyProgrammer.write(project)(modulo));
})(AssertStringifyTransformer || (AssertStringifyTransformer = {}));
//# sourceMappingURL=AssertStringifyTransformer.js.map