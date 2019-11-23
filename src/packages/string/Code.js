const  { Code } = require("../../../../COZY_LIB/dist/index");

class String extends Code {
    constructor() {
        super(...arguments);
        if(this.data.string === undefined) {
            this.data.string = "";
        }
    }
    setString(string) {
        this.data.string = string;
    }
    getString() {
        return this.data.string;
    }
}

class BinaryOperator extends Code {
    constructor() {
        super(...arguments);
        this.addDefaultLinkingPoints(["first","second"]);
    }
}

class Concat extends BinaryOperator {

}

module.exports = {
    id:"String",
    version:"1",
    body: {
        String,
        Concat
    }
}