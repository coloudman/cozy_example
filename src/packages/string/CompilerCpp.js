

const { Compiler } = require("../../../../COZY/dist/index");

class String extends Compiler {
    compile() {
        return `(std::string) "${
            this.code.getString().replace(/\\/g, "\\\\").replace(/\"/g, "\\\"")
        }"`;
    }
    getRequiresE() {
        return {
            string:"#include <string>"
        };
    }
}

class BinaryOperator extends Compiler {
    make(symbol) {
        console.log(this.context);
        const space = this.context.space ? " " : "";

        const firstCompiled = this.getLinked("first").compile();
        const secondCompiled = this.getLinked("second").compile();
        return `(${firstCompiled})${space}${symbol}${space}(${secondCompiled})`;
    }
    getRequiresE() {
        return {};
    }
}

class Concat extends BinaryOperator{
    compile() {
        return this.make("+");
    }
}

module.exports = {
    id:"String_CPP",
    version:"1",
    for_id:"String",
    for_version:"1",
    body: {
        String,
        Concat
    }
}