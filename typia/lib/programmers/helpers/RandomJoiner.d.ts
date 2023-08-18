import ts from "typescript";
import { ICommentTag } from "../../metadata/ICommentTag";
import { IMetadataTag } from "../../metadata/IMetadataTag";
import { Metadata } from "../../metadata/Metadata";
import { MetadataObject } from "../../metadata/MetadataObject";
export declare namespace RandomJoiner {
    type Decoder = (meta: Metadata, tags: IMetadataTag[], comments: ICommentTag[]) => ts.Expression;
    const array: (coalesce: (method: string) => ts.Expression) => (decoder: Decoder) => (explore: IExplore) => (length: ts.Expression | undefined) => (item: Metadata, tags: IMetadataTag[], comments: ICommentTag[]) => ts.Expression;
    const tuple: (decoder: Decoder) => (items: Metadata[], tags: IMetadataTag[], comments: ICommentTag[]) => ts.ArrayLiteralExpression;
    const object: (coalesce: (method: string) => ts.Expression) => (decoder: Decoder) => (obj: MetadataObject) => ts.ConciseBody;
}
interface IExplore {
    function: boolean;
    recursive: boolean;
}
export {};
