import { Metadata } from "../../metadata/Metadata";
import { ArrayUtil } from "../../utils/ArrayUtil";
import { MapUtil } from "../../utils/MapUtil";
export var UnionPredicator;
(function (UnionPredicator) {
    UnionPredicator.object = (targets) => {
        const matrix = new Map();
        for (const obj of targets)
            for (const prop of obj.properties) {
                const key = prop.key.getSoleLiteral();
                if (key !== null)
                    MapUtil.take(matrix)(key, () => ArrayUtil.repeat(targets.length, () => null));
            }
        targets.forEach((obj, i) => {
            for (const prop of obj.properties) {
                const key = prop.key.getSoleLiteral();
                if (key !== null)
                    matrix.get(key)[i] = prop;
            }
        });
        const output = [];
        targets.forEach((obj, i) => {
            const children = [];
            obj.properties.forEach((prop) => {
                if (prop.value.isRequired() === false)
                    return;
                const key = prop.key.getSoleLiteral();
                if (key === null)
                    return;
                const neighbors = matrix
                    .get(key)
                    .filter((oppo, k) => i !== k && oppo !== null);
                const unique = neighbors.length === 0 ||
                    neighbors.every((n) => !Metadata.intersects(prop.value, n.value));
                if (unique === true)
                    children.push({
                        property: prop,
                        neighbour: neighbors.length !== 0,
                    });
            });
            if (children.length === 0)
                return;
            const top = children.find((child) => child.property.value.isConstant()) ||
                children[0];
            output.push(Object.assign({ index: i, object: obj }, top));
        });
        return output;
    };
})(UnionPredicator || (UnionPredicator = {}));
//# sourceMappingURL=UnionPredicator.js.map