export class TypeGuardError extends Error {
    constructor(props) {
        super(props.message ||
            `Error on ${props.method}(): invalid type${props.path ? ` on ${props.path}` : ""}, expect to be ${props.expected}`);
        const proto = new.target.prototype;
        if (Object.setPrototypeOf)
            Object.setPrototypeOf(this, proto);
        else
            this.__proto__ = proto;
        this.method = props.method;
        this.path = props.path;
        this.expected = props.expected;
        this.value = props.value;
    }
}
//# sourceMappingURL=TypeGuardError.js.map