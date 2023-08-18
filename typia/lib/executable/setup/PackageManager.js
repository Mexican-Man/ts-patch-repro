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
import { CommandExecutor } from "./CommandExecutor";
import { FileRetriever } from "./FileRetriever";
export class PackageManager {
    get file() {
        return path.join(this.directory, "package.json");
    }
    static mount() {
        return __awaiter(this, void 0, void 0, function* () {
            const location = yield FileRetriever.directory("package.json")(process.cwd());
            if (location === null)
                throw new Error(`Unable to find "package.json" file`);
            return new PackageManager(location, yield this.load(path.join(location, "package.json")));
        });
    }
    save(modifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield fs.promises.readFile(this.file, "utf8");
            this.data = JSON.parse(content);
            modifier(this.data);
            return fs.promises.writeFile(this.file, JSON.stringify(this.data, null, 2), "utf8");
        });
    }
    install(props) {
        const middle = this.manager === "yarn"
            ? `add${props.dev ? " -D" : ""}`
            : `install ${props.dev ? "--save-dev" : "--save"}`;
        CommandExecutor.run(`${this.manager} ${middle} ${props.modulo}${props.version ? `@${props.version}` : ""}`);
        return true;
    }
    constructor(directory, data) {
        this.directory = directory;
        this.data = data;
        this.manager = "npm";
    }
    static load(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield fs.promises.readFile(file, "utf8");
            return JSON.parse(content);
        });
    }
}
//# sourceMappingURL=PackageManager.js.map