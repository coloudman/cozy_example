const { Renderer, RendererWithChildUtil } = require("cozyCode");


class Number extends Renderer{
    render() {
        this.div = document.createElement("div");
        this.div.style.backgroundColor = "#326ba8";
        this.div.style.borderStyle = "solid";
        this.div.style.borderWidth = "1px";
        this.div.style.borderColor = "black";
        this.div.style.borderRadius = "7px";
        this.div.style.padding = "5px";

        const input = document.createElement("input");
        input.type = "text";
        input.value = this.code.getNumber();
        this.div.appendChild(input);
        return this.div;
    }
}

class Add extends RendererWithChildUtil {
    render() {
        this.div = document.createElement("div");
        this.div.style.backgroundColor = "#327da8";
        this.div.style.borderStyle = "solid";
        this.div.style.borderWidth = "1px";
        this.div.style.borderColor = "black";
        this.div.style.borderRadius = "7px";
        this.div.style.padding = "5px";

        this.div.appendChild(this.addLinkElement("first"));
        this.div.appendChild(document.createTextNode(" + "));
        this.div.appendChild(this.addLinkElement("second"));
        return this.div;
    }
    voidLinkingPointElement() {
        const div = document.createElement("div");
        div.style.width = "100px";
        div.style.height = "50px";
        div.style.backgroundColor = "white";

        return div;
    }
}

class Subtract extends RendererWithChildUtil {
    render() {
        this.div = document.createElement("div");
        this.div.style.backgroundColor = "#327da8";
        this.div.style.borderStyle = "solid";
        this.div.style.borderWidth = "1px";
        this.div.style.borderColor = "black";
        this.div.style.borderRadius = "7px";
        this.div.style.padding = "5px";
        
        this.div.appendChild(this.addLinkElement("first"));
        this.div.appendChild(document.createTextNode(" + "));
        this.div.appendChild(this.addLinkElement("second"));
        return this.div;
    }
    voidLinkingPointElement() {
        const div = document.createElement("div");
        div.style.width = "100px";
        div.style.height = "50px";
        div.style.backgroundColor = "white";

        return div;
    }
}
module.exports = {
    id:"JS_MATH",
    version:"1",
    for_id:"MATH",
    for_version:"1",
    body: {
        Number,
        Add,
        Subtract
    }
}