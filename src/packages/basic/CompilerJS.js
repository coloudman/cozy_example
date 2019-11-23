
const  { HaveNextCompiler } = require("../../../../COZY/dist/index");

class Main extends HaveNextCompiler {
    main = true;
    compile() {
        return this.make("", (my, compiled) => {
            return compiled;
        });
    }
}

module.exports = {
    id:"Basic_JS",
    version:"1",
    for_id:"Basic",
    for_version:"1",
    body: {
        Main
    }
}