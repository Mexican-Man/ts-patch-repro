import { IsParseProgrammer } from "../../../programmers/IsParseProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateIsParseTransformer;
(function (CreateIsParseTransformer) {
    CreateIsParseTransformer.transform = GenericTransformer.factory("createIsParse")((project) => (modulo) => IsParseProgrammer.write(project)(modulo));
})(CreateIsParseTransformer || (CreateIsParseTransformer = {}));
//# sourceMappingURL=CreateIsParseTransformer.js.map