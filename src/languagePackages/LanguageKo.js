

const { Controller } = require("cozy_lib");


class _s extends Controller {
    init() {
        
    }
    compile() {
        return this.code.getName()+"의 "+this.code.getThing();
    }
}

module.exports = {
    id:"JS_MATH",
    version:"1",
    for_id:"MATH",
    for_version:"1",
    body: {
        _s
    }
}