import { TypeGuardError } from "../TypeGuardError";
export const $guard = (method) => (exceptionable, props) => {
    if (exceptionable === true)
        throw new TypeGuardError({
            method,
            path: props.path,
            expected: props.expected,
            value: props.value,
        });
    return false;
};
//# sourceMappingURL=$guard.js.map