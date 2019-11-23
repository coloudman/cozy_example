const { LineBlock, DraggableRenderer, RendererWithChildUtil } = require("../../../../COZY/dist/index");


class String extends LineBlock {
    getElements() {
        const input = document.createElement("input");
        input.type = "text";
        input.style.borderStyle = "none";
        input.style.borderRadius = "3px";
        input.style.padding = "3px";
        input.value = this.code.getString();
        input.addEventListener("keypress", event => {
            event.stopPropagation();
        });
        input.addEventListener("change", () => {
            this.code.setString(input.value);
        });
        return [input];
    }
    decorate(div) {
        div.style.pointerEvents = "auto";
        div.style.backgroundColor = "#dcc000";
        div.style.borderStyle = "solid";
        div.style.borderWidth = "1px";
        div.style.borderColor = "black";
        div.style.borderRadius = "7px";
        div.style.padding = "5px";

        this.mouseDownToDrag(div, [div]);

        return div;
    }
}
String.prototype.dragStart = DraggableRenderer.prototype.dragStart;
String.prototype.mouseDownToDrag = DraggableRenderer.prototype.mouseDownToDrag;

class BinaryOperator extends LineBlock {
    getElements() {
        const signElement = document.createElement("span");
        signElement.appendChild(document.createTextNode(`${this.getSign()}`));
        signElement.style.padding = "0px 10px 0px 10px";
        this.signElement = signElement;
        return ["first",signElement,"second"];
    }
    getVoidLinkingPointElement() {
        const voidDiv = document.createElement("div");
        voidDiv.style.width = "100px";
        voidDiv.style.height = "50px";
        voidDiv.style.backgroundColor = "white";
        return voidDiv;
    }
    decorate(div) {
        div.style.pointerEvents = "auto";
        div.style.backgroundColor = "#e5e216";
        div.style.borderStyle = "solid";
        div.style.borderWidth = "1px";
        div.style.borderColor = "black";
        div.style.borderRadius = "7px";
        div.style.padding = "5px";

        this.mouseDownToDrag(div, [div, this.signElement]);
        return this.div;
    }
}
BinaryOperator.prototype.dragStart = DraggableRenderer.prototype.dragStart;
BinaryOperator.prototype.mouseDownToDrag = DraggableRenderer.prototype.mouseDownToDrag;

class Concat extends BinaryOperator {
    getSign() {
        return "+";
    }
}

module.exports = {
    id:"String",
    version:"1",
    for_id:"String",
    for_version:"1",
    body: {
        String,
        Concat
    }
}