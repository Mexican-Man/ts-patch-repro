export class MetadataArray {
    constructor(props) {
        this.name = props.name;
        this.value = props.value;
        this.index = props.index;
        this.recursive = props.recursive;
        this.nullables = props.nullables;
    }
    static _From_without_value(props) {
        return this.create({
            name: props.name,
            value: null,
            index: props.index,
            recursive: props.recursive,
            nullables: props.nullables,
        });
    }
    static create(props) {
        return new MetadataArray(props);
    }
    toJSON() {
        return {
            name: this.name,
            value: this.value.toJSON(),
            nullables: this.nullables,
            recursive: this.recursive,
            index: this.index,
        };
    }
}
//# sourceMappingURL=MetadataArray.js.map