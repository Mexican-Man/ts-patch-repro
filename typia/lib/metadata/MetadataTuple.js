export class MetadataTuple {
    constructor(props) {
        this.name = props.name;
        this.elements = props.elements;
        this.index = props.index;
        this.recursive = props.recursive;
        this.nullables = props.nullables;
    }
    static _From_without_elements(props) {
        return this.create({
            name: props.name,
            index: props.index,
            elements: null,
            recursive: props.recursive,
            nullables: props.nullables.slice(),
        });
    }
    static create(props) {
        return new MetadataTuple(props);
    }
    toJSON() {
        return {
            name: this.name,
            index: this.index,
            elements: this.elements.map((elem) => elem.toJSON()),
            recursive: this.recursive,
            nullables: this.nullables.slice(),
        };
    }
}
//# sourceMappingURL=MetadataTuple.js.map