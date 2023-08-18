import ts from "typescript";
import { IdentifierFactory } from "../../factories/IdentifierFactory";
import { StatementFactory } from "../../factories/StatementFactory";
import { TypeFactory } from "../../factories/TypeFactory";
export class FunctionImporter {
    constructor() {
        this.used_ = new Set();
        this.local_ = new Set();
        this.unions_ = new Map();
        this.sequence_ = 0;
    }
    empty() {
        return this.used_.size === 0;
    }
    use(name) {
        this.used_.add(name);
        return ts.factory.createIdentifier("$" + name);
    }
    useLocal(name) {
        this.local_.add(name);
        return name;
    }
    hasLocal(name) {
        return this.local_.has(name);
    }
    declare(modulo) {
        return [
            ...[...this.used_].map((name) => StatementFactory.constant("$" + name, IdentifierFactory.access(ts.factory.createParenthesizedExpression(ts.factory.createAsExpression(modulo, TypeFactory.keyword("any"))))(name))),
            ...[...this.unions_.values()].map(([key, arrow]) => StatementFactory.constant(key, arrow)),
        ];
    }
    increment() {
        return ++this.sequence_;
    }
    emplaceUnion(prefix, name, factory) {
        const oldbie = this.unions_.get(name);
        if (oldbie)
            return oldbie[0];
        const index = this.unions_.size;
        const accessor = `${prefix}p${index}`;
        const tuple = [accessor, null];
        this.unions_.set(name, tuple);
        tuple[1] = factory();
        return accessor;
    }
    trace() {
        console.log(...this.used_);
        console.log(...this.local_);
    }
}
//# sourceMappingURL=FunctionImporeter.js.map