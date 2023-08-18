import { IsParseProgrammer } from "../../../programmers/IsParseProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var IsParseTransformer;
(function (IsParseTransformer) {
    IsParseTransformer.transform = GenericTransformer.scalar("isParse")((project) => (modulo) => IsParseProgrammer.write(project)(modulo));
})(IsParseTransformer || (IsParseTransformer = {}));
//# sourceMappingURL=IsParseTransformer.js.map