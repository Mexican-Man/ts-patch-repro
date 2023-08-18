import { IMetadataResolved } from "./IMetadataResolved";
import { Metadata } from "./Metadata";
export declare class MetadataResolved {
    readonly original: Metadata;
    readonly returns: Metadata;
    /**
     * @hidden
     */
    private constructor();
    getName(): string;
    toJSON(): IMetadataResolved;
}
