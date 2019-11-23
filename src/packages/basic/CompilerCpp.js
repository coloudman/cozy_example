
const  { HaveNextCompiler } = require("../../../../COZY/dist/index");

class Main extends HaveNextCompiler {
    main = true;
    compile() {
        return this.make("", (my, compiled) => {
            return `int main(){${compiled}}`;
        });
    }
    getRequiresE() {
        return {};
    }
}

module.exports = {
    id:"Basic_CPP",
    version:"1",
    for_id:"Basic",
    for_version:"1",
    body: {
        Main
    }
}