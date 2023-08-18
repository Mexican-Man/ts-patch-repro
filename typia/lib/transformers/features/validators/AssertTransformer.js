import { AssertProgrammer } from "../../../programmers/AssertProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var AssertTransformer;
(function (AssertTransformer) {
    AssertTransformer.transform = (equals) => GenericTransformer.scalar(equals ? "assertEquals" : "assert")((project) => (modulo) => AssertProgrammer.write(project)(modulo)(equals));
})(AssertTransformer || (AssertTransformer = {}));
//# sourceMappingURL=AssertTransformer.js.map