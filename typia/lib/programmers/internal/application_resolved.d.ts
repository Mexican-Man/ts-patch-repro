import { MetadataResolved } from "../../metadata/MetadataResolved";
import { IJsonComponents, IJsonSchema } from "../../module";
import { ApplicationProgrammer } from "../ApplicationProgrammer";
export declare const application_resolved: (options: ApplicationProgrammer.IOptions) => <BlockNever extends boolean>(blockNever: BlockNever) => (components: IJsonComponents) => (resolved: MetadataResolved) => (attribute: IJsonSchema.IAttribute) => IJsonSchema[];
