import { IsProgrammer } from "../../../programmers/IsProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CreateIsTransformer;
(function (CreateIsTransformer) {
    CreateIsTransformer.transform = (equals) => GenericTransformer.factory(equals ? "createEquals" : "createIs")((project) => (modulo) => IsProgrammer.write(project)(modulo)(equals));
})(CreateIsTransformer || (CreateIsTransformer = {}));
//# sourceMappingURL=CreateIsTransformer.js.map