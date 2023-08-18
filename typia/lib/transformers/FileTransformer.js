import ts from "typescript";
import { NodeTransformer } from "./NodeTransformer";
export var FileTransformer;
(function (FileTransformer) {
    FileTransformer.transform = (project) => (context) => (file) => {
        if (file.isDeclarationFile)
            return file;
        return ts.visitEachChild(file, (node) => iterate_node(project)(context)(node), context);
    };
    const iterate_node = (project) => (context) => (node) => ts.visitEachChild(try_transform_node(project)(node), (child) => iterate_node(project)(context)(child), context);
    const try_transform_node = (project) => (node) => {
        try {
            return NodeTransformer.transform(project)(node);
        }
        catch (exp) {
            if (!(exp instanceof Error))
                throw exp;
            const file = node.getSourceFile();
            const { line, character } = file.getLineAndCharacterOfPosition(node.pos);
            exp.message += ` - ${file.fileName}:${line + 1}:${character + 1}`;
            throw exp;
        }
    };
})(FileTransformer || (FileTransformer = {}));
//# sourceMappingURL=FileTransformer.js.map