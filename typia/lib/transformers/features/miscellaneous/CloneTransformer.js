import { CloneProgrammer } from "../../../programmers/CloneProgrammer";
import { GenericTransformer } from "../../internal/GenericTransformer";
export var CloneTransformer;
(function (CloneTransformer) {
    CloneTransformer.transform = GenericTransformer.scalar("clone")((project) => (modulo) => CloneProgrammer.write(project)(modulo));
})(CloneTransformer || (CloneTransformer = {}));
//# sourceMappingURL=CloneTransformer.js.map