import { Metadata } from "./Metadata";
export class MetadataProperty {
    constructor(props) {
        this.key = props.key;
        this.value = props.value;
        this.description = props.description;
        this.tags = props.tags;
        this.jsDocTags = props.jsDocTags;
    }
    static create(props) {
        return new MetadataProperty(props);
    }
    static _From(property, dict) {
        return this.create({
            key: Metadata._From(property.key, dict),
            value: Metadata._From(property.value, dict),
            description: property.description,
            tags: property.tags.slice(),
            jsDocTags: property.jsDocTags.slice(),
        });
    }
    toJSON() {
        return {
            key: this.key.toJSON(),
            value: this.value.toJSON(),
            description: this.description,
            tags: this.tags,
            jsDocTags: this.jsDocTags,
        };
    }
}
//# sourceMappingURL=MetadataProperty.js.map