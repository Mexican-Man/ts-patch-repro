var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import comments from "comment-json";
import fs from "fs";
export var PluginConfigurator;
(function (PluginConfigurator) {
    function configure(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = comments.parse(yield fs.promises.readFile(args.project, "utf8"));
            const compilerOptions = config.compilerOptions;
            if (compilerOptions === undefined)
                throw new Error(`${args.project} file does not have "compilerOptions" property.`);
            const plugins = (() => {
                const plugins = compilerOptions.plugins;
                if (plugins === undefined)
                    return (compilerOptions.plugins = []);
                else if (!Array.isArray(plugins))
                    throw new Error(`"plugins" property of ${args.project} must be array type.`);
                return plugins;
            })();
            const strict = compilerOptions.strict;
            const strictNullChecks = compilerOptions.strictNullChecks;
            const oldbie = plugins.find((p) => typeof p === "object" &&
                p !== null &&
                p.transform === "typia/lib/transform");
            if (strictNullChecks !== false &&
                (strict === true || strictNullChecks === true) &&
                oldbie !== undefined)
                return;
            compilerOptions.strictNullChecks = true;
            if (strict === undefined && strictNullChecks === undefined)
                compilerOptions.strict = true;
            if (oldbie === undefined)
                plugins.push(comments.parse(`
                        {
                            "transform": "typia/lib/transform"
                        }`));
            yield fs.promises.writeFile(args.project, comments.stringify(config, null, 2));
        });
    }
    PluginConfigurator.configure = configure;
})(PluginConfigurator || (PluginConfigurator = {}));
//# sourceMappingURL=PluginConfigurator.js.map