import { Atomic } from "../typings/Atomic";
import { IMetadata } from "./IMetadata";
import { IMetadataCollection } from "./IMetadataCollection";
import { MetadataAlias } from "./MetadataAlias";
import { MetadataArray } from "./MetadataArray";
import { MetadataConstant } from "./MetadataConstant";
import { MetadataObject } from "./MetadataObject";
import { MetadataResolved } from "./MetadataResolved";
import { MetadataTuple } from "./MetadataTuple";
export declare class Metadata {
    any: boolean;
    required: boolean;
    optional: boolean;
    nullable: boolean;
    functional: boolean;
    resolved: MetadataResolved | null;
    atomics: Atomic.Literal[];
    constants: MetadataConstant[];
    templates: Metadata[][];
    rest: Metadata | null;
    aliases: MetadataAlias[];
    arrays: MetadataArray[];
    tuples: MetadataTuple[];
    objects: MetadataObject[];
    natives: string[];
    sets: Metadata[];
    maps: Metadata.Entry[];
    /**
     * @hidden
     */
    private constructor();
    toJSON(): IMetadata;
    static from(meta: IMetadata, collection: IMetadataCollection): Metadata;
    getName(): string;
    empty(): boolean;
    size(): number;
    bucket(): number;
    isConstant(): boolean;
    isRequired(): boolean;
    isSoleLiteral(): boolean;
}
export declare namespace Metadata {
    const intersects: (x: Metadata, y: Metadata) => boolean;
    const covers: (x: Metadata, y: Metadata, level?: number) => boolean;
}
export declare namespace Metadata {
    interface Entry {
        key: Metadata;
        value: Metadata;
    }
}
