
const { CodeLoader, ControllerLoader, Area } = require("../../COZY_LIB/dist/index");
const { AreaWithPosition, AreaWithPositionRenderer, Draggable } = require("../../COZY/dist/index");
const mathPackage = require("./packages/math/Code");
const mathCompilerJSPackage = require("./packages/math/CompilerJS");
const mathRendererPackage = require("./packages/math/Renderer");

const MyCompilerContext = require("./context/MyCompilerContext");
const MyRendererContext = require("./context/MyRendererContext");


//패키지
const codePackages = {
    mathPackage
};
const compilerPackages = {
    mathCompilerJSPackage
};
const rendererPackages = {
    mathRendererPackage
};


//콘텍스트
const contextDatas = {
    compiler:{},
    renderer:{}
}
const contexts = {
    compiler:new MyCompilerContext(contextDatas.compiler),
    renderer:new MyRendererContext(contextDatas.renderer)
};

//로더
const controllerLoaders = {
    compiler : new ControllerLoader(compilerPackages),
    renderer : new ControllerLoader(rendererPackages)
};
const codeLoader = new CodeLoader(codePackages, controllerLoaders, contexts);



//코드 데이터
const codeData = {
    iD:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Add"
    },
    linkingPointsData:{
        first:{
            iD:{
                packageId:"MATH",
                packageVersion:"1",
                id:"Number"
            },
            data:{
                number:8
            },
            linkingPointsData:{},
            controllerDatas:{}
        }
    },
    data:{},
    controllerDatas:{}
};

//코드데이터와 그에 매칭되는 위치들
const codeDatas = [];
const positions = [];

//코드 영역
const area = new Area(codeLoader, codeDatas, contexts);

//거기에 좌표를 추가
const areaWithPosition = new AreaWithPosition(area, positions);

//렌더 가능하도록 추가
const areaWithPositionRenderer = new Draggable(document.getElementById("jam"), areaWithPosition);


/* 데이터 만지작 만지작 */
area.addController("compiler");
area.addController("renderer");


const code = areaWithPosition.addPositionedCodeFromCodeData(codeData,{
    x:10,
    y:10
}).code;

//console.log(area.getController("renderer"));


//링크 해봄
code.linkFromCodeData("second",{
    iD:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Subtract"
    },
    linkingPointsData:{},
    data:{},
    controllerDatas:{}
});

code.getLinked("second").linkFromCodeData("first",{
    iD:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Number"
    },
    linkingPointsData:{},
    data:{
        number:80
    },
    controllerDatas:{}
});

code.getLinked("second").linkFromCodeData("second",{
    iD:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Number"
    },
    data:{
        number:40
    },
    linkingPointsData:{},
    controllerDatas:{}
});



//GUI----------------------

//공백 여부
const spaceController = document.getElementById("spaceController");
spaceController.addEventListener("click", event => {
    const newSpace = spaceController.dataset.space === "true" ? false : true
    contexts.compiler.space = newSpace;
    spaceController.dataset.space = newSpace + "";
    spaceController.setAttribute("value","Space : " + newSpace);
});

//블록 뗐다 붙였다
const blockLinkController = document.getElementById("blockLinkController");
blockLinkController.addEventListener("click", () => {
    const newMinusLinked = blockLinkController.dataset.linked === "true" ? false : true //이제, 2번째 연결점에 마이너스가 들어갈 것인가?!
    code.unlink("second"); //하여튼 현재 상황에서는, 뭔가 연결 되어 있어.
    if(newMinusLinked) {
        code.linkFromCodeData("second", {
            iD:{
                packageId:"MATH",
                packageVersion:"1",
                id:"Subtract"
            },
            linkingPointsData:{
                first:{
                    iD:{
                        packageId:"MATH",
                        packageVersion:"1",
                        id:"Number"
                    },
                    data:{
                        number:8
                    },
                    linkingPointsData:{},
                    controllerDatas:{}
                },
                second:{
                    iD:{
                        packageId:"MATH",
                        packageVersion:"1",
                        id:"Number"
                    },
                    data:{
                        number:22
                    },
                    linkingPointsData:{},
                    controllerDatas:{}
                }
            },
            data:{},
            controllerDatas:{}
        });
    } else {
        code.linkFromCodeData("second", {
            iD:{
                packageId:"MATH",
                packageVersion:"1",
                id:"Add"
            },
            linkingPointsData:{
                first:{
                    iD:{
                        packageId:"MATH",
                        packageVersion:"1",
                        id:"Number"
                    },
                    data:{
                        number:90
                    },
                    linkingPointsData:{},
                    controllerDatas:{}
                },
                second:{
                    iD:{
                        packageId:"MATH",
                        packageVersion:"1",
                        id:"Number"
                    },
                    data:{
                        number:2
                    },
                    linkingPointsData:{},
                    controllerDatas:{}
                }
            },
            data:{},
            controllerDatas:{}
        });
    }
    blockLinkController.dataset.linked = newMinusLinked + "";
    blockLinkController.setAttribute("value","Minus Block Linked : " + newMinusLinked);
});

//블록 움직이기
document.getElementById("moveBlock").addEventListener("click", () => {
    const position = areaWithPosition.positionedCodes[0].position;
    areaWithPosition.positionedCodes[0].changePosition(position.x + 10, position.y + 10);
});

//컴파일하기
document.getElementById("compile").addEventListener("click", () => {
    //컴파일
    console.log(area.getController("compiler")[0].compile());
    //console.log(JSON.stringify(codeDatas, null, 2));
    //console.log(JSON.stringify(positions, null, 2));
});

//데이터 빼오기(사실상 그냥 읽기)
document.getElementById("dataPrint").addEventListener("click", () => {
    console.log(JSON.stringify(codeDatas, null, 2), "\n---\n", JSON.stringify(positions, null, 2), "\n---\n", JSON.stringify(contextDatas, null, 2));
});

//연결점 출력하기
document.getElementById("linkingPointsWithPositionPrint").addEventListener("click" , () => {
    console.log(areaWithPositionRenderer.getCodeLinkingPointsWithPosition());
});

//멈춰
document.getElementById("stop").addEventListener("click", () => {
    code.getLinked("second").stop();
});

/*
document.getElementById("jam").addEventListener("click", (event) => {
    console.log(event);
    event.stopPropagation();
}, true);
*/