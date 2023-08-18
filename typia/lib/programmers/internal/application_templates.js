import { application_default_string } from "./application_default_string";
import { metadata_to_pattern } from "./metadata_to_pattern";
export const application_templates = (meta) => (attribute) => {
    const output = Object.assign({ type: "string" }, attribute);
    output.pattern = metadata_to_pattern(true)(meta);
    output.default = application_default_string(meta)(attribute)(output);
    return output;
};
//# sourceMappingURL=application_templates.js.map