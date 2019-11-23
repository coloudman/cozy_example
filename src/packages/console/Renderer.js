const { HaveNextLineBlock, HaveNextRenderer, DraggableRenderer, getRelativeClickPosition } = require("../../../../COZY/dist/index");




class PrintLine extends HaveNextLineBlock {
    /*
    renderE() {
        this.div = document.createElement("div");
        this.div.style.pointerEvents = "auto";
        this.div.style.display = "inline-block";
        this.div.style.position = "relative";
        this.div.style.backgroundColor = "#000000";
        this.div.style.borderStyle = "solid";
        this.div.style.borderWidth = "1px";
        this.div.style.borderColor = "black";
        this.div.style.padding = "5px";

        const voidDiv = document.createElement("div");
        voidDiv.style.width = "100px";
        voidDiv.style.height = "50px";
        voidDiv.style.backgroundColor = "white";

        this.text = this.addLinkElement("text", voidDiv.cloneNode(true));
        this.div.appendChild(this.text);

        this.mouseDownToDrag(this.div, [this.div]);

        return this.make(this.div);
    }*/
    getElements() {
        const element1 = document.createElement("span");
        element1.appendChild(document.createTextNode("콘솔에"));
        element1.style.padding = "0px 15px 0px 10px";
        this.element1 = element1;

        const element2 = document.createElement("span");
        element2.appendChild(document.createTextNode("한 줄 출력하기"))
        element2.style.padding = "0px 10px 0px 15px";
        this.element2 = element2;

        return [element1, "text", element2];
    }
    decorate(div) {
        div.style.pointerEvents = "auto";
        div.style.position = "relative";
        div.style.backgroundColor = "#E090E0";
        div.style.borderStyle = "solid";
        div.style.borderWidth = "1px";
        div.style.borderColor = "black";
        div.style.padding = "5px";

        this.mouseDownToDrag(div, [div, this.element1, this.element2]);

        return div;
    }
    getVoidLinkingPointElement() {
        const voidDiv = document.createElement("div");
        voidDiv.style.width = "100px";
        voidDiv.style.height = "50px";
        voidDiv.style.backgroundColor = "white";
        return voidDiv;
    }
}
PrintLine.prototype.dragStart = DraggableRenderer.prototype.dragStart;
PrintLine.prototype.mouseDownToDrag = DraggableRenderer.prototype.mouseDownToDrag;

module.exports = {
    id:"Console",
    version:"1",
    for_id:"Console",
    for_version:"1",
    body: {
        PrintLine
    }
}