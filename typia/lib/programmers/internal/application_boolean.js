import { application_default } from "./application_default";
export const application_boolean = (attribute) => (Object.assign(Object.assign({}, attribute), { default: application_default(attribute)((alias) => alias === "true" || alias === "false")((str) => Boolean(str)), type: "boolean" }));
//# sourceMappingURL=application_boolean.js.map