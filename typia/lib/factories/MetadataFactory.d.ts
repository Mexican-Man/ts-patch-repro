import ts from "typescript";
import { Metadata } from "../metadata/Metadata";
import { MetadataCollection } from "./MetadataCollection";
export declare namespace MetadataFactory {
    interface IOptions {
        resolve: boolean;
        constant: boolean;
        absorb: boolean;
        validate?: (meta: Metadata) => void;
    }
    const analyze: (checker: ts.TypeChecker) => (options: IOptions) => (collection: MetadataCollection) => (type: ts.Type | null) => Metadata;
}
