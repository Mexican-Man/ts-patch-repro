import ts from "typescript";
import { IProject } from "../transformers/IProject";
export declare namespace AssertPruneProgrammer {
    const write: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (type: ts.Type, name?: string) => ts.ArrowFunction;
}
