import ts from "typescript";
export declare namespace IdentifierFactory {
    const identifier: (name: string) => ts.Identifier | ts.StringLiteral;
    const access: (target: ts.Expression) => (property: string) => ts.ElementAccessExpression | ts.PropertyAccessExpression;
    const postfix: (str: string) => string;
    const parameter: (name: string | ts.BindingName, type?: ts.TypeNode, init?: ts.Expression | ts.PunctuationToken<ts.SyntaxKind.QuestionToken>) => any;
}
