var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
import path from "path";
import ts from "typescript";
import { ImportTransformer } from "../transformers/ImportTransformer";
import transform from "../transform";
export var TypiaProgrammer;
(function (TypiaProgrammer) {
    TypiaProgrammer.build = (props) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        props.input = path.resolve(props.input);
        props.output = path.resolve(props.output);
        if ((yield is_directory(props.input)) === false)
            throw new Error("Error on TypiaGenerator.generate(): input path is not a directory.");
        else if (fs.existsSync(props.output) === false)
            yield fs.promises.mkdir(props.output, { recursive: true });
        else if ((yield is_directory(props.output)) === false) {
            const parent = path.join(props.output, "..");
            if ((yield is_directory(parent)) === false)
                throw new Error("Error on TypiaGenerator.generate(): output path is not a directory.");
            yield fs.promises.mkdir(props.output);
        }
        const { options: compilerOptions } = ts.parseJsonConfigFileContent(ts.readConfigFile(props.project, ts.sys.readFile).config, {
            fileExists: ts.sys.fileExists,
            readFile: ts.sys.readFile,
            readDirectory: ts.sys.readDirectory,
            useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
        }, path.dirname(props.project));
        const program = ts.createProgram(yield (() => __awaiter(this, void 0, void 0, function* () {
            const container = [];
            yield gather(props)(container)(props.input)(props.output);
            return container;
        }))(), compilerOptions);
        const result = ts.transform(program
            .getSourceFiles()
            .filter((file) => !file.isDeclarationFile &&
            path.resolve(file.fileName).indexOf(props.input) !== -1), [
            ImportTransformer.transform(props.input)(props.output),
            transform(program, (_b = ((_a = compilerOptions.plugins) !== null && _a !== void 0 ? _a : []).find((p) => p.transform === "typia/lib/transform" ||
                p.transform === "../src/transform.ts")) !== null && _b !== void 0 ? _b : {}),
        ], program.getCompilerOptions());
        const printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed,
        });
        for (const file of result.transformed) {
            const to = path
                .resolve(file.fileName)
                .replace(props.input, props.output);
            const content = printer.printFile(file);
            yield fs.promises.writeFile(to, emend(content), "utf8");
        }
    });
    const emend = (content) => {
        if (content.indexOf("typia.") === -1 ||
            content.indexOf("import typia") !== -1 ||
            content.indexOf("import * as typia") !== -1)
            return content;
        return `import typia from "typia";\n\n${content}`;
    };
    const is_directory = (current) => __awaiter(this, void 0, void 0, function* () {
        const stat = yield fs.promises.stat(current);
        return stat.isDirectory();
    });
    const gather = (props) => (container) => (from) => (to) => __awaiter(this, void 0, void 0, function* () {
        if (from === props.output)
            return;
        else if (fs.existsSync(to) === false)
            yield fs.promises.mkdir(to);
        for (const file of yield fs.promises.readdir(from)) {
            const next = path.join(from, file);
            const stat = yield fs.promises.stat(next);
            if (stat.isDirectory()) {
                yield gather(props)(container)(next)(path.join(to, file));
                continue;
            }
            else if (file.substring(file.length - 3) === ".ts")
                container.push(next);
        }
    });
})(TypiaProgrammer || (TypiaProgrammer = {}));
//# sourceMappingURL=TypiaProgrammer.js.map