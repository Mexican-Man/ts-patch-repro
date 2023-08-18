import RandExp from "randexp";
export var RandomGenerator;
(function (RandomGenerator) {
    const ALPHABETS = "abcdefghijklmnopqrstuvwxyz";
    RandomGenerator.boolean = () => Math.random() < 0.5;
    RandomGenerator.integer = (min, max) => {
        min !== null && min !== void 0 ? min : (min = 0);
        max !== null && max !== void 0 ? max : (max = 100);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    RandomGenerator.bigint = (min, max) => {
        min !== null && min !== void 0 ? min : (min = BigInt(0));
        max !== null && max !== void 0 ? max : (max = BigInt(100));
        return BigInt(RandomGenerator.integer(Number(min), Number(max)));
    };
    RandomGenerator.number = (min, max) => {
        min !== null && min !== void 0 ? min : (min = 0);
        max !== null && max !== void 0 ? max : (max = 100);
        return Math.random() * (max - min) + min;
    };
    RandomGenerator.string = (length) => new Array(length !== null && length !== void 0 ? length : RandomGenerator.integer(5, 10))
        .fill(0)
        .map(() => ALPHABETS[RandomGenerator.integer(0, ALPHABETS.length - 1)])
        .join("");
    RandomGenerator.array = (closure, count) => new Array(count !== null && count !== void 0 ? count : RandomGenerator.length()).fill(0).map((_e, index) => closure(index));
    RandomGenerator.pick = (array) => array[RandomGenerator.integer(0, array.length - 1)];
    RandomGenerator.length = () => RandomGenerator.integer(0, 3);
    RandomGenerator.uuid = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
    RandomGenerator.email = () => `${RandomGenerator.string(10)}@${RandomGenerator.string(10)}.${RandomGenerator.string(3)}`;
    RandomGenerator.url = () => `https://${RandomGenerator.string(10)}.${RandomGenerator.string(3)}`;
    RandomGenerator.ipv4 = () => RandomGenerator.array(() => RandomGenerator.integer(0, 255), 4).join(".");
    RandomGenerator.ipv6 = () => RandomGenerator.array(() => RandomGenerator.integer(0, 65535).toString(16), 8).join(":");
    RandomGenerator.pattern = (regex) => new RandExp(regex).gen();
    RandomGenerator.date = (min, max) => {
        min !== null && min !== void 0 ? min : (min = 0);
        max !== null && max !== void 0 ? max : (max = Date.now() * 2);
        return new Date(RandomGenerator.number(min, max)).toISOString().substring(0, 10);
    };
    RandomGenerator.datetime = (min, max) => {
        min !== null && min !== void 0 ? min : (min = 0);
        max !== null && max !== void 0 ? max : (max = Date.now() * 2);
        return new Date(RandomGenerator.number(min, max)).toISOString();
    };
})(RandomGenerator || (RandomGenerator = {}));
//# sourceMappingURL=RandomGenerator.js.map