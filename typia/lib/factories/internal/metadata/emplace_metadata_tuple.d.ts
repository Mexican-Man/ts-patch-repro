import ts from "typescript";
import { MetadataTuple } from "../../../metadata/MetadataTuple";
import { MetadataCollection } from "../../MetadataCollection";
import { MetadataFactory } from "../../MetadataFactory";
export declare const emplace_metadata_tuple: (checker: ts.TypeChecker) => (options: MetadataFactory.IOptions) => (collection: MetadataCollection) => (type: ts.TupleType, nullable: boolean) => MetadataTuple;
