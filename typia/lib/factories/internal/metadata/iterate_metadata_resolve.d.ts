import ts from "typescript";
import { Metadata } from "../../../metadata/Metadata";
import { MetadataCollection } from "../../MetadataCollection";
import { MetadataFactory } from "../../MetadataFactory";
export declare const iterate_metadata_resolve: (checker: ts.TypeChecker) => (options: MetadataFactory.IOptions) => (collection: MetadataCollection) => (meta: Metadata, type: ts.Type, resolved: boolean, aliased: boolean) => boolean;
