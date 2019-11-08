const  { Code } = require("cozy_lib");

class _s extends Code {
    init() {
    }
    setName(name) {
        this.data.name = name;
    }
    getName() {
        return this.data.name;
    }
    setThing() {
        this.data.thing = thing;
    }
    getThing() {
        return this.data.thing;
    }
}


module.exports = {
    id:"MATH",
    version:"1",
    body: {
        _s
    }
}