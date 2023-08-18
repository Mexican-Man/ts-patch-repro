export const disable_function_importer_declare = (importer) => disable(importer);
const disable = (importer) => ({
    empty: () => importer.empty(),
    use: (name) => importer.use(name),
    useLocal: (name) => importer.useLocal(name),
    hasLocal: (name) => importer.hasLocal(name),
    declare: (_modulo) => [],
    increment: () => importer.increment(),
    emplaceUnion: (prefix, name, factory) => importer.emplaceUnion(prefix, name, factory),
    trace: () => importer.trace(),
});
//# sourceMappingURL=disable_function_importer_declare.js.map