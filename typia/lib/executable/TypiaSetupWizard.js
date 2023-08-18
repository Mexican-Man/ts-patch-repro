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
import { ArgumentParser } from "./setup/ArgumentParser";
import { CommandExecutor } from "./setup/CommandExecutor";
import { PackageManager } from "./setup/PackageManager";
import { PluginConfigurator } from "./setup/PluginConfigurator";
export var TypiaSetupWizard;
(function (TypiaSetupWizard) {
    function setup() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("----------------------------------------");
            console.log(" Typia Setup Wizard");
            console.log("----------------------------------------");
            const pack = yield PackageManager.mount();
            const args = yield ArgumentParser.parse(pack)(inquiry);
            pack.install({ dev: true, modulo: "ts-patch", version: "latest" });
            pack.install({ dev: true, modulo: "ts-node", version: "latest" });
            pack.install({
                dev: true,
                modulo: "typescript",
                version: (() => {
                    var _a;
                    const version = (() => {
                        var _a, _b;
                        try {
                            return (_b = (_a = require("ts-patch/package.json")) === null || _a === void 0 ? void 0 : _a.version) !== null && _b !== void 0 ? _b : "";
                        }
                        catch (_c) {
                            return "";
                        }
                    })();
                    return Number((_a = version.split(".")[0]) !== null && _a !== void 0 ? _a : "") >= 3
                        ? "latest"
                        : "4.9.5";
                })(),
            });
            (_a = args.project) !== null && _a !== void 0 ? _a : (args.project = (() => {
                const runner = pack.manager === "npm" ? "npx" : pack.manager;
                CommandExecutor.run(`${runner} tsc --init`);
                return (args.project = "tsconfig.json");
            })());
            yield pack.save((data) => {
                var _a;
                (_a = data.scripts) !== null && _a !== void 0 ? _a : (data.scripts = {});
                if (typeof data.scripts.postinstall === "string" &&
                    data.scripts.postinstall.trim().length) {
                    if (data.scripts.postinstall.indexOf("ts-patch install") === -1)
                        data.scripts.postinstall =
                            "ts-patch install && " + data.scripts.postinstall;
                }
                else
                    data.scripts.postinstall = "ts-patch install";
                if (typeof data.scripts.prepare === "string") {
                    data.scripts.prepare = data.scripts.prepare
                        .split("&&")
                        .map((str) => str.trim())
                        .filter((str) => str.indexOf("ts-patch install") === -1)
                        .join(" && ");
                    if (data.scripts.prepare.length === 0)
                        delete data.scripts.prepare;
                }
            });
            CommandExecutor.run(`${pack.manager} run postinstall`);
            yield PluginConfigurator.configure(args);
        });
    }
    TypiaSetupWizard.setup = setup;
    const inquiry = (pack, command, prompt, action) => __awaiter(this, void 0, void 0, function* () {
        command.option("--manager [manager", "package manager");
        command.option("--project [project]", "tsconfig.json file location");
        const questioned = { value: false };
        const select = (name) => (message) => (choices, filter) => __awaiter(this, void 0, void 0, function* () {
            questioned.value = true;
            return (yield prompt()({
                type: "list",
                name: name,
                message: message,
                choices: choices,
                filter,
            }))[name];
        });
        const configure = () => __awaiter(this, void 0, void 0, function* () {
            const fileList = yield (yield fs.promises.readdir(process.cwd()))
                .filter((str) => str.substring(0, 8) === "tsconfig" &&
                str.substring(str.length - 5) === ".json")
                .sort((x, y) => x === "tsconfig.json"
                ? -1
                : y === "tsconfig.json"
                    ? 1
                    : x < y
                        ? -1
                        : 1);
            if (fileList.length === 0) {
                if (process.cwd() !== pack.directory)
                    throw new Error(`Unable to find "tsconfig.json" file.`);
                return null;
            }
            else if (fileList.length === 1)
                return fileList[0];
            return select("tsconfig")("TS Config File")(fileList);
        });
        return action((options) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            pack.manager = (_a = options.manager) !== null && _a !== void 0 ? _a : (options.manager = yield select("manager")("Package Manager")([
                "npm",
                "pnpm",
                "yarn (berry is not supported)",
            ], (value) => value.split(" ")[0]));
            (_b = options.project) !== null && _b !== void 0 ? _b : (options.project = yield configure());
            if (questioned.value)
                console.log("");
            return options;
        }));
    });
})(TypiaSetupWizard || (TypiaSetupWizard = {}));
//# sourceMappingURL=TypiaSetupWizard.js.map