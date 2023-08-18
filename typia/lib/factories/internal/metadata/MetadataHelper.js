import { Metadata } from "../../../metadata/Metadata";
export var MetadataHelper;
(function (MetadataHelper) {
    MetadataHelper.literal_to_metadata = (key) => {
        const metadata = Metadata.initialize();
        metadata.constants.push({
            type: "string",
            values: [key],
        });
        return metadata;
    };
})(MetadataHelper || (MetadataHelper = {}));
//# sourceMappingURL=MetadataHelper.js.map