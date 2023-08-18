import { ArrayUtil } from "../../../utils/ArrayUtil";
import { explore_metadata } from "./explore_metadata";
export const emplace_metadata_array = (checker) => (options) => (collection) => (type, nullable) => {
    const [array, newbie, setValue] = collection.emplaceArray(checker, type);
    ArrayUtil.add(array.nullables, nullable);
    if (newbie === false)
        return array;
    const value = explore_metadata(checker)(options)(collection)(type.getNumberIndexType(), false, false);
    setValue(value);
    return array;
};
//# sourceMappingURL=emplace_metadata_array.js.map