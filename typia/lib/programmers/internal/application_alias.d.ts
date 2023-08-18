import { MetadataAlias } from "../../metadata/MetadataAlias";
import { IJsonComponents } from "../../schemas/IJsonComponents";
import { IJsonSchema } from "../../module";
import { ApplicationProgrammer } from "../ApplicationProgrammer";
export declare const application_alias: (options: ApplicationProgrammer.IOptions) => <BlockNever extends boolean>(blockNever: BlockNever) => (components: IJsonComponents) => (alias: MetadataAlias) => (nullable: boolean) => IJsonSchema.IReference;
