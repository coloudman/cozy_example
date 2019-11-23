const  { Code } = require("../../../../COZY_LIB/dist/index");

class Number extends Code {
    constructor() {
        super(...arguments);
        if(this.data.number === undefined) {
            this.data.number = 0;
        }
    }
    setNumber(number) {
        this.data.number = number;
    }
    getNumber() {
        return this.data.number;
    }
}


class BinaryOperator extends Code {
    constructor() {
        super(...arguments);
        this.addDefaultLinkingPoints(["first","second"]);
    }
}

class Add extends BinaryOperator {}

class Subtract extends BinaryOperator {}

class Multiply extends BinaryOperator {}

class Divide extends BinaryOperator {}

class Power extends BinaryOperator {}


class OneVarFunction extends Code {
    constructor() {
        super(...arguments);
        this.addDefaultLinkingPoints(["value"]);
    }
}

class Sin extends OneVarFunction {
}

class Cos extends OneVarFunction {
}

class Tan extends OneVarFunction {
}

module.exports = {
    id:"MATH",
    version:"1",
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