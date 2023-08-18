import ts from "typescript";
import { IMetadataCollection } from "../metadata/IMetadataCollection";
import { Metadata } from "../metadata/Metadata";
import { MetadataAlias } from "../metadata/MetadataAlias";
import { MetadataArray } from "../metadata/MetadataArray";
import { MetadataObject } from "../metadata/MetadataObject";
import { MetadataTuple } from "../metadata/MetadataTuple";
export declare class MetadataCollection {
    private readonly options?;
    private readonly objects_;
    private readonly object_unions_;
    private readonly aliases_;
    private readonly arrays_;
    private readonly tuples_;
    private readonly names_;
    private object_index_;
    private recursive_array_index_;
    private recursive_tuple_index_;
    constructor(options?: Partial<MetadataCollection.IOptions> | undefined);
    aliases(): MetadataAlias[];
    objects(): MetadataObject[];
    unions(): MetadataObject[][];
    arrays(): MetadataArray[];
    tuples(): MetadataTuple[];
    private getName;
    emplace(checker: ts.TypeChecker, type: ts.Type): [MetadataObject, boolean];
    emplaceAlias(checker: ts.TypeChecker, type: ts.Type, symbol: ts.Symbol): [MetadataAlias, boolean, (meta: Metadata) => void];
    emplaceArray(checker: ts.TypeChecker, type: ts.Type): [MetadataArray, boolean, (meta: Metadata) => void];
    emplaceTuple(checker: ts.TypeChecker, type: ts.TupleType): [MetadataTuple, boolean, (elements: Metadata[]) => void];
    setTupleRecursive(tuple: MetadataTuple, recursive: boolean): void;
    toJSON(): IMetadataCollection;
}
export declare namespace MetadataCollection {
    interface IOptions {
        replace?(str: string): string;
    }
    const replace: (str: string) => string;
    const escape: (str: string) => string;
}
