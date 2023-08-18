import ts from "typescript";
export declare class FunctionImporter {
    private readonly used_;
    private readonly local_;
    private readonly unions_;
    private sequence_;
    empty(): boolean;
    use(name: string): ts.Identifier;
    useLocal(name: string): string;
    hasLocal(name: string): boolean;
    declare(modulo: ts.LeftHandSideExpression): ts.Statement[];
    increment(): number;
    emplaceUnion(prefix: string, name: string, factory: () => ts.ArrowFunction): string;
    trace(): void;
}
