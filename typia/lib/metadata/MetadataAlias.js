export class MetadataAlias {
    constructor(props) {
        this.name = props.name;
        this.value = props.value;
        this.description = props.description;
        this.tags = props.tags;
        this.jsDocTags = props.jsDocTags;
        this.recursive = props.recursive;
        this.nullables = props.nullables;
    }
    static create(props) {
        return new MetadataAlias(props);
    }
    static _From_without_value(props) {
        return this.create({
            name: props.name,
            value: null,
            description: props.description,
            recursive: props.recursive,
            tags: props.tags.slice(),
            jsDocTags: props.jsDocTags.slice(),
            nullables: props.nullables.slice(),
        });
    }
    toJSON() {
        return {
            name: this.name,
            value: this.value.toJSON(),
            description: this.description,
            recursive: this.recursive,
            tags: this.tags.slice(),
            jsDocTags: this.jsDocTags.slice(),
            nullables: this.nullables.slice(),
        };
    }
}
//# sourceMappingURL=MetadataAlias.js.map