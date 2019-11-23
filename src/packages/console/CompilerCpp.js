

const { HaveNextCompiler } = require("../../../../COZY/dist/index");

class PrintLine extends HaveNextCompiler {
    compile() {
        return this.make(`std::cout << (${this.getLinked("text").compile()}) << std::endl;`, (now, next) => {
            return `${now}${next}`;
        });
    }
    getRequiresE() {
        return {
            "iostream":"#include <iostream>"
        };
    }
}

module.exports = {
    id:"Console_CPP",
    version:"1",
    for_id:"Console",
    for_version:"1",
    body: {
        PrintLine
    }
}