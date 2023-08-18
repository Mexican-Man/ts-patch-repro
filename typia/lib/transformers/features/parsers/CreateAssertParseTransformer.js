import { AssertParseProgrammer } from "../../../programmers/AssertParseProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateAssertParseTransformer;
(function (CreateAssertParseTransformer) {
    CreateAssertParseTransformer.transform = GenericTransformer.factory("createAssertParse")((project) => (modulo) => AssertParseProgrammer.write(project)(modulo));
})(CreateAssertParseTransformer || (CreateAssertParseTransformer = {}));
//# sourceMappingURL=CreateAssertParseTransformer.js.map