

const { Compiler } = require("../../../../COZY/dist/index");

class Number extends Compiler {
    init() {
    }
    compile() {
        return this.code.getNumber()+"";
    }
}

class BinaryOperator extends Compiler {
    init() {}
    make(symbol) {
        const space = this.context.space ? " " : "";
        return `(${this.getLinked("first").compile()})${space}${symbol}${space}(${this.getLinked("second").compile()})`;
    }
}

class Add extends BinaryOperator{
    compile() {
        return this.make("+");
    }
}

class Subtract extends BinaryOperator {
    compile() {
        return this.make("-");
    }
}

class Multiply extends BinaryOperator {
    compile() {
        return this.make("*");
    }
}

class Divide extends BinaryOperator {
    compile() {
        return this.make("/");
    }
}

class Power extends BinaryOperator {
    compile() {
        return this.make("**");
    }
}


class OneVarFunction extends Compiler {

}

class Sin extends OneVarFunction {
    compile() {
        return `Math.sin(${this.getLinked("value").compile()})`
    }
}
class Cos extends OneVarFunction {
    compile() {
        return `Math.cos(${this.getLinked("value").compile()})`
    }
}
class Tan extends OneVarFunction {
    compile() {
        return `Math.tan(${this.getLinked("value").compile()})`
    }
}

module.exports = {
    id:"MATH_JS",
    version:"1",
    for_id:"MATH",
    for_version:"1",
    body: {
        Number,
        Add,
        Subtract,
        Multiply,
        Divide,
        Power,
        Sin,
        Cos,
        Tan
    }
}