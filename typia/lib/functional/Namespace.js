import { RandomGenerator } from "../utils/RandomGenerator";
import { TypeGuardError } from "../TypeGuardError";
import { $any } from "./$any";
import { $every } from "./$every";
import { $guard } from "./$guard";
import { $is_between } from "./$is_between";
import { $is_custom } from "./$is_custom";
import { $is_date } from "./$is_date";
import { $is_datetime } from "./$is_datetime";
import { $is_email } from "./$is_email";
import { $is_ipv4 } from "./$is_ipv4";
import { $is_ipv6 } from "./$is_ipv6";
import { $is_url } from "./$is_url";
import { $is_uuid } from "./$is_uuid";
import { $join } from "./$join";
import { $number } from "./$number";
import { $report } from "./$report";
import { $rest } from "./$rest";
import { $string } from "./$string";
import { $tail } from "./$tail";
export var Namespace;
(function (Namespace) {
    Namespace.is = () => ({
        is_uuid: $is_uuid,
        is_email: $is_email,
        is_url: $is_url,
        is_ipv4: $is_ipv4,
        is_ipv6: $is_ipv6,
        is_between: $is_between,
        is_date: $is_date,
        is_datetime: $is_datetime,
        is_custom: $is_custom,
    });
    Namespace.assert = (method) => (Object.assign(Object.assign({}, Namespace.is()), { join: $join, every: $every, guard: $guard(`typia.${method}`), predicate: (matched, exceptionable, closure) => {
            if (matched === false && exceptionable === true)
                throw new TypeGuardError(Object.assign(Object.assign({}, closure()), { method: `typia.${method}` }));
            return matched;
        } }));
    Namespace.validate = () => (Object.assign(Object.assign({}, Namespace.is()), { join: $join, report: $report, predicate: (res) => (matched, exceptionable, closure) => {
            if (matched === false && exceptionable === true)
                (() => {
                    res.success && (res.success = false);
                    const errorList = res.errors;
                    const error = closure();
                    if (errorList.length) {
                        const last = errorList[errorList.length - 1].path;
                        if (last.length >= error.path.length &&
                            last.substring(0, error.path.length) ===
                                error.path)
                            return;
                    }
                    errorList.push(error);
                    return;
                })();
            return matched;
        } }));
    Namespace.stringify = (method) => (Object.assign(Object.assign({}, Namespace.is()), { number: $number, string: $string, tail: $tail, rest: $rest, throws: $throws(method) }));
    Namespace.clone = (method) => (Object.assign(Object.assign({}, Namespace.is()), { throws: $throws(method), any: $any }));
    Namespace.prune = (method) => (Object.assign(Object.assign({}, Namespace.is()), { throws: $throws(method) }));
    Namespace.random = () => ({
        generator: RandomGenerator,
        pick: RandomGenerator.pick,
    });
    const $throws = (method) => (props) => {
        throw new TypeGuardError(Object.assign(Object.assign({}, props), { method: `typia.${method}` }));
    };
})(Namespace || (Namespace = {}));
//# sourceMappingURL=Namespace.js.map