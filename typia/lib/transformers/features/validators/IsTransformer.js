import { IsProgrammer } from "../../../programmers/IsProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var IsTransformer;
(function (IsTransformer) {
    IsTransformer.transform = (equals) => GenericTransformer.scalar(equals ? "equals" : "is")((project) => (modulo) => IsProgrammer.write(project)(modulo)(equals));
})(IsTransformer || (IsTransformer = {}));
//# sourceMappingURL=IsTransformer.js.map