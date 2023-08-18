import fs from "fs";
import path from "path";
export var FileRetriever;
(function (FileRetriever) {
    FileRetriever.directory = (name) => (dir, depth = 0) => {
        const location = path.join(dir, name);
        if (fs.existsSync(location))
            return dir;
        else if (depth > 2)
            return null;
        return FileRetriever.directory(name)(path.join(dir, ".."), depth + 1);
    };
    FileRetriever.file = (name) => (directory, depth = 0) => {
        const location = path.join(directory, name);
        if (fs.existsSync(location))
            return location;
        else if (depth > 2)
            return null;
        return FileRetriever.file(name)(path.join(directory, ".."), depth + 1);
    };
})(FileRetriever || (FileRetriever = {}));
//# sourceMappingURL=FileRetriever.js.map