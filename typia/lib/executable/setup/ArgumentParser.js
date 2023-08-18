var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import commander from "commander";
import inquirer from "inquirer";
export var ArgumentParser;
(function (ArgumentParser) {
    ArgumentParser.parse = (pack) => (inquiry) => __awaiter(this, void 0, void 0, function* () {
        const action = (closure) => new Promise((resolve, reject) => {
            commander.program.action((options) => __awaiter(this, void 0, void 0, function* () {
                try {
                    resolve(yield closure(options));
                }
                catch (exp) {
                    reject(exp);
                }
            }));
            commander.program.parseAsync().catch(reject);
        });
        return inquiry(pack, commander.program, inquirer.createPromptModule, action);
    });
})(ArgumentParser || (ArgumentParser = {}));
//# sourceMappingURL=ArgumentParser.js.map