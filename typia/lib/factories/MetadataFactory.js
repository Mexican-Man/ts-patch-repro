import { explore_metadata } from "./internal/metadata/explore_metadata";
import { iterate_metadata_collection } from "./internal/metadata/iterate_metadata_collection";
import { iterate_metadata_sort } from "./internal/metadata/iterate_metadata_sort";
export var MetadataFactory;
(function (MetadataFactory) {
    MetadataFactory.analyze = (checker) => (options) => (collection) => (type) => {
        const meta = explore_metadata(checker)(options)(collection)(type, false);
        iterate_metadata_collection(collection);
        iterate_metadata_sort(collection)(meta);
        if (options.validate)
            for (const elem of collection.entire_)
                options.validate(elem);
        collection.entire_.clear();
        return meta;
    };
})(MetadataFactory || (MetadataFactory = {}));
//# sourceMappingURL=MetadataFactory.js.map