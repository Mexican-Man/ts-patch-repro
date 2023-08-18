import { Atomic } from "../typings/Atomic";
export type IMetadataConstant = IMetadataConstant.IBase<"boolean", boolean> | IMetadataConstant.IBase<"number", number> | IMetadataConstant.IBase<"string", string> | IMetadataConstant.IBase<"bigint", bigint>;
export declare namespace IMetadataConstant {
    interface IBase<Type extends Atomic.Literal, Value extends Atomic.Type> {
        type: Type;
        values: Value[];
    }
}
