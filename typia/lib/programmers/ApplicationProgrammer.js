import { application_schema } from "./internal/application_schema";
export var ApplicationProgrammer;
(function (ApplicationProgrammer) {
    let IOptions;
    (function (IOptions) {
        IOptions.complement = (options) => {
            var _a;
            const purpose = (_a = options === null || options === void 0 ? void 0 : options.purpose) !== null && _a !== void 0 ? _a : "swagger";
            return {
                purpose,
            };
        };
    })(IOptions = ApplicationProgrammer.IOptions || (ApplicationProgrammer.IOptions = {}));
    ApplicationProgrammer.write = (options) => (metadatas) => {
        const fullOptions = IOptions.complement(options);
        const components = {
            schemas: {},
        };
        const generator = application_schema(fullOptions)(true)(components);
        return Object.assign({ schemas: metadatas.map((meta, i) => {
                const schema = generator(meta)({});
                if (schema === null)
                    throw new Error(`Error on typia.application(): invalid type on argument - (${meta.getName()}, ${i})`);
                return schema;
            }), components }, fullOptions);
    };
})(ApplicationProgrammer || (ApplicationProgrammer = {}));
//# sourceMappingURL=ApplicationProgrammer.js.map