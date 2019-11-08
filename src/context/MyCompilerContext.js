const { Context } = require("cozy_lib");

class MyCompilerContext extends Context {
    constructor(data) {
        super(data);
        if(this.data.space === undefined) {
            this.data.space = true;
        }
    }
    set space(space) {
        this.data.space = space;
        this.emit("spaceChanged", space);
    }
    get space() {
        return this.data.space;
    }
}

module.exports = MyCompilerContext;