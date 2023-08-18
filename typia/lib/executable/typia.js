#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const USAGE = `Wrong command has been detected. Use like below:

  npx typia setup \\
    --manager (npm|pnpm|yarn) \\
    --project {tsconfig.json file path}

    - npx typia setup
    - npx typia setup --manager pnpm
    - npx typia setup --project tsconfig.test.json

  npx typia generate 
    --input {directory} \\
    --output {directory}

    --npx typia generate --input src/templates --output src/functinoal
`;
const halt = (desc) => {
    console.error(desc);
    process.exit(-1);
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield import("comment-json");
        yield import("inquirer");
        yield import("commander");
    }
    catch (_a) {
        halt(`typia has not been installed. Run "npm i typia" before.`);
    }
    const type = process.argv[2];
    if (type === "setup") {
        const { TypiaSetupWizard } = yield import("./TypiaSetupWizard");
        yield TypiaSetupWizard.setup();
    }
    else if (type === "generate") {
        try {
            yield import("typescript");
        }
        catch (_b) {
            halt(`typescript has not been installed. Run "npm i -D typescript" before.`);
        }
        const { TypiaGenerateWizard } = yield import("./TypiaGenerateWizard");
        yield TypiaGenerateWizard.generate();
    }
    else
        halt(USAGE);
});
main().catch((exp) => {
    console.error(exp);
    process.exit(-1);
});
//# sourceMappingURL=typia.js.map