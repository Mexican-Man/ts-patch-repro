import { ArrayUtil } from "../../../utils/ArrayUtil";
export const emend_metadata_atomics = (meta) => {
    for (const type of meta.atomics) {
        const index = meta.constants.findIndex((c) => c.type === type);
        if (index !== -1)
            meta.constants.splice(index, 1);
    }
    {
        const index = meta.constants.findIndex((c) => c.type === "boolean");
        if (index !== -1 && meta.constants[index].values.length === 2) {
            meta.constants.splice(index, 1);
            ArrayUtil.take(meta.atomics, (type) => type === "boolean", () => "boolean");
        }
    }
    if (meta.templates.length &&
        meta.atomics.find((type) => type === "string") !== undefined)
        meta.templates.splice(0, meta.templates.length);
};
//# sourceMappingURL=emend_metadata_atomics.js.map