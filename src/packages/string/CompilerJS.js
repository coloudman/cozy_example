

const { Compiler } = require("../../../../COZY/dist/index");

class String extends Compiler {
    compile() {
        return `"${
            this.code.getString().replace(/\\/g, "\\\\").replace(/\"/g, "\\\"")
        }"`;
    }
}

class BinaryOperator extends Compiler {
    init() {}
    make(symbol) {
        const space = this.context.space ? " " : "";
        return `(${this.getLinked("first").compile()})${space}${symbol}${space}(${this.getLinked("second").compile()})`;
    }
}

class Concat extends BinaryOperator{
    compile() {
        return this.make("+");
    }
}


module.exports = {
    id:"String_JS",
    version:"1",
    for_id:"String",
    for_version:"1",
    body: {
        String,
        Concat
    }
}