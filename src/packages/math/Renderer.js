const { LineBlock, DraggableRenderer, RendererWithChildUtil } = require("../../../../COZY/dist/index");


function getRelativeClickPosition(e) {
    // e = Mouse click event.
    var rect = e.target.getBoundingClientRect();
    var x = Math.round(e.clientX - rect.left); //x position within the element.
    var y = Math.round(e.clientY - rect.top);  //y position within the element.

    return {x, y};
}


class Number extends LineBlock {
    getElements() {
        const input = document.createElement("input");
        input.type = "number";
        input.value = this.code.getNumber();
        input.addEventListener("change", () => {
            this.code.setNumber(parseInt(input.value));
        });
        input.style.borderStyle = "none";
        input.style.borderRadius = "3px";
        input.style.padding = "3px";
        return [input];
    }
    decorate(div) {
        div.style.pointerEvents = "auto";
        div.style.backgroundColor = "#528bc8";
        div.style.borderStyle = "solid";
        div.style.borderWidth = "1px";
        div.style.borderColor = "black";
        div.style.borderRadius = "7px";
        div.style.padding = "5px";

        this.mouseDownToDrag(div, [div]);

        return div;
    }
}
Number.prototype.dragStart = DraggableRenderer.prototype.dragStart;
Number.prototype.mouseDownToDrag = DraggableRenderer.prototype.mouseDownToDrag;

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
        div.style.backgroundColor = "#52adc8";
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

class Add extends BinaryOperator {
    getSign() {
        return "+";
    }
}

class Subtract extends BinaryOperator {
    getSign() {
        return "-";
    }
}

class Multiply extends BinaryOperator {
    getSign() {
        return "*";
    }
}

class Divide extends BinaryOperator {
    getSign() {
        return "/";
    }
}

class Power extends BinaryOperator {
    getSign() {
        return "^";
    }
}


class OneVarFunction extends LineBlock {
    getElements() {
        const texts = this.getTexts(); //texts이지만.. 2개가 최대
        const element1 = document.createElement("span");
        const element2 = document.createElement("span");
        if(texts[0]) {
            element1.style.padding = "0px 10px 0px 10px";
            element1.appendChild(document.createTextNode(texts[0]));
        }
        if(texts[1]) {
            element2.style.padding = "0px 10px 0px 10px";
            element2.appendChild(document.createTextNode(texts[1]));
        }
        this.element1 = element1;
        this.element2 = element2;
        return [element1, "value", element2];
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
        div.style.backgroundColor = "#52adc8";
        div.style.borderStyle = "solid";
        div.style.borderWidth = "1px";
        div.style.borderColor = "black";
        div.style.borderRadius = "7px";
        div.style.padding = "5px";

        this.mouseDownToDrag(div, [div, this.element1, this.element2]);
        return this.div;
    }
}
OneVarFunction.prototype.dragStart = DraggableRenderer.prototype.dragStart;
OneVarFunction.prototype.mouseDownToDrag = DraggableRenderer.prototype.mouseDownToDrag;


class Sin extends OneVarFunction {
    getTexts() {
        return ["sin(",")"];
    }
}

class Cos extends OneVarFunction {
    getTexts() {
        return ["cos(",")"];
    }
}

class Tan extends OneVarFunction {
    getTexts() {
        return ["tan(",")"];
    }
}

module.exports = {
    id:"MATH",
    version:"1",
    for_id:"MATH",
    for_version:"1",
    body: {
        Number,

        Add,
        Subtract,
        Multiply,
        Divide,
        Power,

        Sin,
        Cos,
        Tan
    }
}