import ts from "typescript";
export var StatementFactory;
(function (StatementFactory) {
    StatementFactory.constant = (name, initializer) => ts.factory.createVariableStatement(undefined, ts.factory.createVariableDeclarationList([
        ts.factory.createVariableDeclaration(name, undefined, undefined, initializer),
    ], ts.NodeFlags.Const));
    StatementFactory.transpile = (script) => ts.factory.createExpressionStatement(ts.factory.createIdentifier(ts.transpile(script)));
})(StatementFactory || (StatementFactory = {}));
//# sourceMappingURL=StatementFactory.js.map