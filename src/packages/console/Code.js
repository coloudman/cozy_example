const  { Code } = require("../../../../COZY_LIB/dist/index");

class PrintLine extends Code {
    constructor() {
        super(...arguments);
        this.addDefaultLinkingPoints(["text", "next"]);
    }
}


module.exports = {
    id:"Console",
    version:"1",
    body: {
        PrintLine
    }
}