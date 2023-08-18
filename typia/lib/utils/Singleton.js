export class Singleton {
    constructor(closure) {
        this.closure_ = closure;
        this.value_ = NOT_MOUNTED_YET;
    }
    get(...args) {
        if (this.value_ === NOT_MOUNTED_YET)
            this.value_ = this.closure_(...args);
        return this.value_;
    }
}
const NOT_MOUNTED_YET = {};
//# sourceMappingURL=Singleton.js.map