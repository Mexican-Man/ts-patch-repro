import ts from "typescript";
import { IMetadataTag } from "../../metadata/IMetadataTag";
import { Metadata } from "../../metadata/Metadata";
import { MetadataArray } from "../../metadata/MetadataArray";
import { MetadataObject } from "../../metadata/MetadataObject";
import { MetadataTuple } from "../../metadata/MetadataTuple";
import { FeatureProgrammer } from "../FeatureProgrammer";
import { check_union_array_like } from "../internal/check_union_array_like";
export declare namespace UnionExplorer {
    interface Decoder<T> {
        (input: ts.Expression, target: T, explore: FeatureProgrammer.IExplore, tags: IMetadataTag[], jsDocTags: ts.JSDocTagInfo[]): ts.Expression;
    }
    type ObjectCombiner = Decoder<MetadataObject[]>;
    const object: (config: FeatureProgrammer.IConfig, level?: number) => (input: ts.Expression, targets: MetadataObject[], explore: FeatureProgrammer.IExplore, tags: IMetadataTag[], jsDocTags: ts.JSDocTagInfo[]) => ts.Expression;
    const tuple: (props: check_union_array_like.IProps<MetadataTuple, MetadataTuple>) => (parameters: ts.ParameterDeclaration[]) => (input: ts.Expression, origins: MetadataTuple[], explore: FeatureProgrammer.IExplore, tags: IMetadataTag[], jsDocTags: ts.JSDocTagInfo[]) => ts.ArrowFunction;
    namespace tuple {
        type IProps = check_union_array_like.IProps<MetadataTuple, MetadataTuple>;
    }
    const array: (props: array.IProps) => (parameters: ts.ParameterDeclaration[]) => (input: ts.Expression, origins: MetadataArray[], explore: FeatureProgrammer.IExplore, tags: IMetadataTag[], jsDocTags: ts.JSDocTagInfo[]) => ts.ArrowFunction;
    namespace array {
        type IProps = check_union_array_like.IProps<MetadataArray, Metadata>;
    }
    const array_or_tuple: (props: array_or_tuple.IProps) => (parameters: ts.ParameterDeclaration[]) => (input: ts.Expression, origins: (MetadataArray | MetadataTuple)[], explore: FeatureProgrammer.IExplore, tags: IMetadataTag[], jsDocTags: ts.JSDocTagInfo[]) => ts.ArrowFunction;
    namespace array_or_tuple {
        type IProps = check_union_array_like.IProps<MetadataArray | MetadataTuple, Metadata>;
    }
    const set: (props: set.IProps) => (parameters: ts.ParameterDeclaration[]) => (input: ts.Expression, origins: Metadata[], explore: FeatureProgrammer.IExplore, tags: IMetadataTag[], jsDocTags: ts.JSDocTagInfo[]) => ts.ArrowFunction;
    namespace set {
        type IProps = check_union_array_like.IProps<MetadataArray, Metadata>;
    }
    const map: (props: map.IProps) => (parameters: ts.ParameterDeclaration[]) => (input: ts.Expression, origins: Metadata.Entry[], explore: FeatureProgrammer.IExplore, tags: IMetadataTag[], jsDocTags: ts.JSDocTagInfo[]) => ts.ArrowFunction;
    namespace map {
        type IProps = check_union_array_like.IProps<MetadataArray, [
            Metadata,
            Metadata
        ]>;
    }
}
