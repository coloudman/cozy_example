const { HaveNextLineBlock, DraggableRenderer, getRelativeClickPosition } = require("../../../../COZY/dist/index");




class Main extends HaveNextLineBlock {
    getElements() {
        const element = document.createElement("span");
        element.appendChild(document.createTextNode("시작!"));
        element.style.padding = "0px 15px 0px 10px";
        this.element = element;
        return [element];
    }
    decorate(div) {
        div.style.pointerEvents = "auto";
        div.style.backgroundColor = "#50C030";
        div.style.borderStyle = "solid";
        div.style.borderWidth = "1px";
        div.style.borderColor = "black";
        div.style.padding = "5px";
        div.style.width = "150px";
        div.style.height = "50px";

        this.mouseDownToDrag(div, [div, this.element]);

        return div;
    }
}
Main.prototype.dragStart = DraggableRenderer.prototype.dragStart;
Main.prototype.mouseDownToDrag = DraggableRenderer.prototype.mouseDownToDrag;

module.exports = {
    id:"Basic",
    version:"1",
    for_id:"Basic",
    for_version:"1",
    body: {
        Main
    }
}