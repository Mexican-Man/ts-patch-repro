import { Metadata } from "./Metadata";
export class MetadataResolved {
    constructor(props) {
        this.original = props.original;
        this.returns = props.returns;
    }
    static _From(props, dict) {
        return this.create({
            original: Metadata._From(props.original, dict),
            returns: Metadata._From(props.returns, dict),
        });
    }
    static create(props) {
        return new MetadataResolved(props);
    }
    getName() {
        return this.returns.getName();
    }
    toJSON() {
        return {
            original: this.original.toJSON(),
            returns: this.returns.toJSON(),
        };
    }
}
//# sourceMappingURL=MetadataResolved.js.map