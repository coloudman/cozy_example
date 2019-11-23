

const { HaveNextCompiler } = require("../../../../COZY/dist/index");

class PrintLine extends HaveNextCompiler {
    compile() {
        return this.make(`console.log(${this.getLinked("text").compile()})`, (now, next) => {
            return `${now};${next}`;
        });
    }
}

module.exports = {
    id:"Console_JS",
    version:"1",
    for_id:"Console",
    for_version:"1",
    body: {
        PrintLine
    }
}