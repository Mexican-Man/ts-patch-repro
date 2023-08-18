import ts from "typescript";
import { MetadataProperty } from "../../../metadata/MetadataProperty";
import { Writable } from "../../../typings/Writable";
import { ArrayUtil } from "../../../utils/ArrayUtil";
import { CommentFactory } from "../../CommentFactory";
import { MetadataHelper } from "./MetadataHelper";
import { explore_metadata } from "./explore_metadata";
export const emplace_metadata_object = (checker) => (options) => (collection) => (parent, nullable) => {
    var _a, _b;
    const [obj, newbie] = collection.emplace(checker, parent);
    ArrayUtil.add(obj.nullables, nullable, (elem) => elem === nullable);
    if (newbie === false)
        return obj;
    const isClass = parent.isClass();
    const pred = isClass
        ? (node) => {
            var _a, _b;
            const kind = (_b = (_a = node
                .getChildren()[0]) === null || _a === void 0 ? void 0 : _a.getChildren()[0]) === null || _b === void 0 ? void 0 : _b.kind;
            return (kind !== ts.SyntaxKind.PrivateKeyword &&
                kind !== ts.SyntaxKind.ProtectedKeyword &&
                (ts.isParameter(node) || isProperty(node)));
        }
        : (node) => isProperty(node);
    const insert = (key) => (value) => (symbol, filter) => {
        var _a, _b;
        const description = symbol
            ? (_a = CommentFactory.description(symbol)) !== null && _a !== void 0 ? _a : null
            : null;
        const jsDocTags = ((_b = symbol === null || symbol === void 0 ? void 0 : symbol.getJsDocTags()) !== null && _b !== void 0 ? _b : []).filter(filter !== null && filter !== void 0 ? filter : (() => true));
        const property = MetadataProperty.create({
            key,
            value,
            description,
            jsDocTags,
            tags: [],
        });
        obj.properties.push(property);
        return property;
    };
    for (const prop of parent.getApparentProperties()) {
        if (((_a = prop.getJsDocTags(checker)) !== null && _a !== void 0 ? _a : []).find((tag) => tag.name === "internal") !== undefined)
            continue;
        const [node, type] = (() => {
            var _a;
            const node = ((_a = prop.getDeclarations()) !== null && _a !== void 0 ? _a : [])[0];
            const type = node
                ? checker.getTypeOfSymbolAtLocation(prop, node)
                : "getTypeOfPropertyOfType" in checker
                    ? checker.getTypeOfPropertyOfType(parent, prop.name)
                    : undefined;
            return [node, type];
        })();
        if ((node && pred(node) === false) || type === undefined)
            continue;
        const key = MetadataHelper.literal_to_metadata(prop.name);
        const value = explore_metadata(checker)(options)(collection)(type, false);
        if (node === null || node === void 0 ? void 0 : node.questionToken)
            Writable(value).optional = true;
        insert(key)(value)(prop);
    }
    for (const index of checker.getIndexInfosOfType(parent)) {
        const analyzer = (type) => explore_metadata(checker)(options)(collection)(type, false);
        const key = analyzer(index.keyType);
        const value = analyzer(index.type);
        insert(key)(value)(((_b = index.declaration) === null || _b === void 0 ? void 0 : _b.parent)
            ? checker.getSymbolAtLocation(index.declaration.parent)
            : undefined, (doc) => doc.name !== "default");
    }
    return obj;
};
const isProperty = (node) => ts.isPropertyDeclaration(node) ||
    ts.isPropertyAssignment(node) ||
    ts.isPropertySignature(node) ||
    ts.isTypeLiteralNode(node);
//# sourceMappingURL=emplace_metadata_object.js.map