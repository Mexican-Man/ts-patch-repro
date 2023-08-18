import ts from "typescript";
export var TypeFactory;
(function (TypeFactory) {
    TypeFactory.resolve = (checker) => (type) => TypeFactory.getReturnType(checker)(type)("toJSON");
    TypeFactory.isFunction = (type) => getFunction(type) !== null;
    const getFunction = (type) => {
        var _a, _b;
        const node = (_b = (_a = type.symbol) === null || _a === void 0 ? void 0 : _a.declarations) === null || _b === void 0 ? void 0 : _b[0];
        if (node === undefined)
            return null;
        return ts.isFunctionLike(node)
            ? node
            : ts.isPropertyAssignment(node) || ts.isPropertyDeclaration(node)
                ? ts.isFunctionLike(node.initializer)
                    ? node.initializer
                    : null
                : null;
    };
    TypeFactory.getReturnType = (checker) => (type) => (name) => {
        const symbol = type.getProperty(name);
        if (!symbol)
            return null;
        else if (!symbol.valueDeclaration)
            return null;
        const functor = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
        const signature = checker.getSignaturesOfType(functor, ts.SignatureKind.Call)[0];
        return signature ? signature.getReturnType() : null;
    };
    TypeFactory.getFullName = (checker) => (type, symbol) => {
        var _a;
        symbol !== null && symbol !== void 0 ? symbol : (symbol = (_a = type.aliasSymbol) !== null && _a !== void 0 ? _a : type.getSymbol());
        if (symbol === undefined)
            return checker.typeToString(type);
        if (type.aliasSymbol === undefined &&
            type.isUnionOrIntersection()) {
            const joiner = type.isIntersection() ? " & " : " | ";
            return type.types
                .map((child) => TypeFactory.getFullName(checker)(child))
                .join(joiner);
        }
        const name = get_name(symbol);
        const generic = type.aliasSymbol
            ? type.aliasTypeArguments || []
            : checker.getTypeArguments(type);
        return generic.length
            ? name === "Promise"
                ? TypeFactory.getFullName(checker)(generic[0])
                : `${name}<${generic
                    .map((child) => TypeFactory.getFullName(checker)(child))
                    .join(", ")}>`
            : name;
    };
    const explore_name = (decl) => (name) => ts.isModuleBlock(decl)
        ? explore_name(decl.parent.parent)(`${decl.parent.name.getFullText().trim()}.${name}`)
        : name;
    const get_name = (symbol) => {
        var _a, _b;
        const parent = (_b = (_a = symbol.getDeclarations()) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.parent;
        return parent
            ? explore_name(parent)(symbol.escapedName.toString())
            : "__type";
    };
    TypeFactory.keyword = (type) => {
        return ts.factory.createKeywordTypeNode(type === "void"
            ? ts.SyntaxKind.VoidKeyword
            : type === "any"
                ? ts.SyntaxKind.AnyKeyword
                : type === "unknown"
                    ? ts.SyntaxKind.UnknownKeyword
                    : type === "boolean"
                        ? ts.SyntaxKind.BooleanKeyword
                        : type === "number"
                            ? ts.SyntaxKind.NumberKeyword
                            : type === "bigint"
                                ? ts.SyntaxKind.BigIntKeyword
                                : ts.SyntaxKind.StringKeyword);
    };
})(TypeFactory || (TypeFactory = {}));
//# sourceMappingURL=TypeFactory.js.map