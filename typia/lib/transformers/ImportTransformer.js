import path from "path";
import ts from "typescript";
export var ImportTransformer;
(function (ImportTransformer) {
    ImportTransformer.transform = (from) => (to) => (context) => (file) => transform_file(from)(to)(context)(file);
    const transform_file = (top) => (to) => (context) => (file) => {
        if (file.isDeclarationFile)
            return file;
        const from = get_directory_path(path.resolve(file.getSourceFile().fileName));
        to = from.replace(top, to);
        return ts.visitEachChild(file, (node) => transform_node(top)(from)(to)(node), context);
    };
    const transform_node = (top) => (from) => (to) => (node) => {
        if (!ts.isImportDeclaration(node) ||
            !ts.isStringLiteral(node.moduleSpecifier))
            return node;
        const text = node.moduleSpecifier.text;
        if (text[0] !== ".")
            return node;
        const location = path.resolve(from, text);
        if (location.indexOf(top) === 0)
            return node;
        const replaced = (() => {
            const simple = path
                .relative(to, location)
                .split(path.sep)
                .join("/");
            return simple[0] === "." ? simple : `./${simple}`;
        })();
        return ts.factory.createImportDeclaration(undefined, node.importClause, ts.factory.createStringLiteral(replaced), node.assertClause);
    };
})(ImportTransformer || (ImportTransformer = {}));
const get_directory_path = (file) => {
    const splitted = path.resolve(file).split(path.sep);
    splitted.pop();
    return path.resolve(splitted.join(path.sep));
};
//# sourceMappingURL=ImportTransformer.js.map