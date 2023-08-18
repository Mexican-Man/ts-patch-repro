import cp from "child_process";
export var CommandExecutor;
(function (CommandExecutor) {
    CommandExecutor.run = (str) => {
        console.log(str);
        cp.execSync(str, { stdio: "ignore" });
    };
})(CommandExecutor || (CommandExecutor = {}));
//# sourceMappingURL=CommandExecutor.js.map