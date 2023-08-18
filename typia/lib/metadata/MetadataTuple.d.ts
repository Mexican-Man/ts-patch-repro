import { ClassProperties } from "../typings/ClassProperties";
import { IMetadataTuple } from "./IMetadataTuple";
import { Metadata } from "./Metadata";
export declare class MetadataTuple {
    readonly name: string;
    readonly elements: Metadata[];
    readonly index: number | null;
    readonly recursive: boolean;
    readonly nullables: boolean[];
    static create(props: ClassProperties<MetadataTuple>): MetadataTuple;
    toJSON(): IMetadataTuple;
}
