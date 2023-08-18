import { IMetadataArray } from "./IMetadataArray";
import { Metadata } from "./Metadata";
export declare class MetadataArray {
    readonly name: string;
    readonly value: Metadata;
    readonly nullables: boolean[];
    readonly recursive: boolean;
    readonly index: number | null;
    /**
     * @hidden
     */
    private constructor();
    toJSON(): IMetadataArray;
}
