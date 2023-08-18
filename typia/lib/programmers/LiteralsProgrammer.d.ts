import ts from "typescript";
import { IProject } from "../transformers/IProject";
export declare namespace LiteralsProgrammer {
    const write: (project: IProject) => (type: ts.Type) => ts.AsExpression;
}
