import ts from "typescript";
import { FileTransformer } from "./transformers/FileTransformer";
export const transform = (program, options) => {
    const compilerOptions = program.getCompilerOptions();
    const strict = compilerOptions.strictNullChecks !== undefined
        ? !!compilerOptions.strictNullChecks
        : !!compilerOptions.strict;
    if (strict === false)
        throw new Error(`Error on "tsconfig.json": typia requires \`compilerOptions.strictNullChecks\` to be true.`);
    return FileTransformer.transform({
        program,
        compilerOptions,
        checker: program.getTypeChecker(),
        printer: ts.createPrinter(),
        options: options || {},
    });
};
export default transform;
//# sourceMappingURL=transform.js.map