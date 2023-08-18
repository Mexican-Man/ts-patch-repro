import ts from "typescript";
import { IProject } from "../transformers/IProject";
export declare namespace IsParseProgrammer {
    const write: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (type: ts.Type, name?: string) => ts.ArrowFunction;
}
