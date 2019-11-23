

const { Compiler } = require("../../../../COZY/dist/index");

class Number extends Compiler {
    init() {
    }
    compile() {
        return this.code.getNumber()+"";
    }
    getRequiresE() {
        return {};
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

class Power extends Compiler {
    compile() {
        const space = this.context.space ? " " : "";
        return `pow((${this.getLinked("first").compile()}),${space}(${this.getLinked("second").compile()}))`;;
    }
    getRequiresE() {
        return {
            "math.h":"#include <math.h>"
        }
    }
}

class OneVarFunction extends Compiler {
    getRequiresE() {
        return {
            "math.h":"#include <math.h>"
        };
    }
}

class Sin extends OneVarFunction {
    compile() {
        return `sin(${this.getLinked("value").compile()})`
    }
}
class Cos extends OneVarFunction {
    compile() {
        return `cos(${this.getLinked("value").compile()})`
    }
}
class Tan extends OneVarFunction {
    compile() {
        return `tan(${this.getLinked("value").compile()})`
    }
}
module.exports = {
    id:"MATH_CPP",
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