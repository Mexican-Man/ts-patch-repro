import { PatternUtil } from "../../utils/PatternUtil";
import { metadata_to_pattern } from "./metadata_to_pattern";
export const template_to_pattern = (top) => (template) => {
    const pattern = template
        .map((meta) => metadata_to_pattern(false)(meta))
        .join("");
    return top ? PatternUtil.fix(pattern) : pattern;
};
//# sourceMappingURL=template_to_pattern.js.map