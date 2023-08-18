import ts from "typescript";
import { MetadataAlias } from "../../../metadata/MetadataAlias";
import { MetadataCollection } from "../../MetadataCollection";
import { MetadataFactory } from "../../MetadataFactory";
export declare const emplace_metadata_alias: (checker: ts.TypeChecker) => (options: MetadataFactory.IOptions) => (collection: MetadataCollection) => (type: ts.Type, nullable: boolean) => MetadataAlias;
