import ts from "typescript";
import { LiteralFactory } from "../../../factories/LiteralFactory";
import { MetadataCollection } from "../../../factories/MetadataCollection";
import { MetadataFactory } from "../../../factories/MetadataFactory";
export var MetadataTransformer;
(function (MetadataTransformer) {
    MetadataTransformer.transform = ({ checker }) => (expression) => {
        var _a;
        if (!((_a = expression.typeArguments) === null || _a === void 0 ? void 0 : _a.length))
            throw new Error(NO_GENERIC_ARGUMENT);
        const top = expression.typeArguments[0];
        if (!ts.isTupleTypeNode(top))
            return expression;
        else if (top.elements.some((child) => !ts.isTypeNode(child)))
            return expression;
        const types = top.elements.map((child) => checker.getTypeFromTypeNode(child));
        if (types.some((t) => t.isTypeParameter()))
            throw new Error(GENERIC_ARGUMENT);
        const collection = new MetadataCollection();
        const metadatas = types.map((type) => MetadataFactory.analyze(checker)({
            resolve: true,
            constant: true,
            absorb: true,
        })(collection)(type));
        const app = {
            metadatas: metadatas.map((metadata) => metadata.toJSON()),
            collection: collection.toJSON(),
        };
        return LiteralFactory.generate(app);
    };
})(MetadataTransformer || (MetadataTransformer = {}));
const NO_GENERIC_ARGUMENT = "Error on typia.metadata(): no generic argument.";
const GENERIC_ARGUMENT = "Error on typia.metadata(): non-specified generic argument(s).";
//# sourceMappingURL=MetadataTransformer.js.map