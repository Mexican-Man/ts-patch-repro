import ts from "typescript";
import { MetadataArray } from "../../../metadata/MetadataArray";
import { MetadataCollection } from "../../MetadataCollection";
import { MetadataFactory } from "../../MetadataFactory";
export declare const emplace_metadata_array: (checker: ts.TypeChecker) => (options: MetadataFactory.IOptions) => (collection: MetadataCollection) => (type: ts.Type, nullable: boolean) => MetadataArray;
