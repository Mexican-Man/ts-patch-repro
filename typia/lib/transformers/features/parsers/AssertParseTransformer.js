import { AssertParseProgrammer } from "../../../programmers/AssertParseProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var AssertParseTransformer;
(function (AssertParseTransformer) {
    AssertParseTransformer.transform = GenericTransformer.scalar("assertParse")((project) => (modulo) => AssertParseProgrammer.write(project)(modulo));
})(AssertParseTransformer || (AssertParseTransformer = {}));
//# sourceMappingURL=AssertParseTransformer.js.map