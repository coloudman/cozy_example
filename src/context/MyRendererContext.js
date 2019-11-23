const { DraggableRendererContext } = require("../../../COZY/dist/index");


class MyRendererContext extends DraggableRendererContext {
    constructor(data) {
        super(data);
    }
}

module.exports = MyRendererContext;