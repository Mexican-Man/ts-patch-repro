import { Metadata } from "../metadata/Metadata";
import { IJsonApplication } from "../schemas/IJsonApplication";
export declare namespace ApplicationProgrammer {
    interface IOptions {
        purpose: "ajv" | "swagger";
    }
    const write: (options?: Partial<IOptions>) => (metadatas: Array<Metadata>) => IJsonApplication;
}
