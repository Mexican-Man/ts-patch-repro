import { Metadata } from "../../metadata/Metadata";
import { MetadataArray } from "../../metadata/MetadataArray";
export const wrap_metadata_rest_tuple = (rest) => {
    const wrapper = Metadata.initialize();
    wrapper.arrays.push(MetadataArray.create({
        name: `...${rest.getName()}`,
        value: rest,
        nullables: [],
        recursive: false,
        index: null,
    }));
    return wrapper;
};
//# sourceMappingURL=wrap_metadata_rest_tuple.js.map