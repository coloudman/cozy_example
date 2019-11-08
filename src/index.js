
const { CodeLoader, ControllerLoader, Area } = require("cozy_lib");
const { AreaWithPosition, AreaWithPositionRenderer } = require("cozycode");
const mathPackage = require("./mathPackages/MATHCode");
const mathCompilerJSPackage = require("./mathPackages/MATHCompilerJS");
const mathRendererPackage = require("./mathPackages/MATHRenderer");

const MyCompilerContext = require("./context/MyCompilerContext");


//로더
const codeLoader = new CodeLoader({
    mathPackage
});
const compilerLoader = new ControllerLoader({
    mathCompilerJSPackage
});
const rendererLoader = new ControllerLoader({
    mathRendererPackage
});


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

//콘텍스트
const contextDatas = {
    compiler:{}
}
const contexts = {
    compiler:new MyCompilerContext(contextDatas.compiler)
};

//코드 영역
const area = new Area(codeLoader, {
    compiler:compilerLoader,
    renderer:rendererLoader
}, codeDatas, contexts);

//거기에 좌표를 추가
const areaWithPosition = new AreaWithPosition(area, positions);

//렌더 가능하도록 추가
const areaWithPositionRenderer = new AreaWithPositionRenderer(document.getElementById("jam"), areaWithPosition);

/* 데이터 만지작 만지작 */
area.addController("compiler");
area.addController("renderer");

const code = areaWithPosition.addPositionedCode(codeData,{
    x:10,
    y:10
}).code;

//console.log(area.getController("renderer"));


//링크 해봄
code.link("second",{
    iD:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Subtract"
    },
    linkingPointsData:{},
    data:{},
    controllerDatas:{}
});

code.getLinked("second").link("first",{
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

code.getLinked("second").link("second",{
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



//GUI

const spaceController = document.getElementById("spaceController");
spaceController.addEventListener("click", event => {
    const newSpace = spaceController.dataset.space === "true" ? false : true
    contexts.compiler.space = newSpace;
    spaceController.dataset.space = newSpace + "";
    spaceController.setAttribute("value","Space : " + newSpace);
});

const blockLinkController = document.getElementById("blockLinkController");
blockLinkController.addEventListener("click", () => {
    const newMinusLinked = blockLinkController.dataset.linked === "true" ? false : true //이제, 2번째 연결점에 마이너스가 들어갈 것인가?!
    code.unlink("second"); //하여튼 현재 상황에서는, 뭔가 연결 되어 있어.
    if(newMinusLinked) {
        code.link("second", {
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
        code.link("second", {
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


document.getElementById("compile").addEventListener("click", () => {
    //컴파일
    console.log(area.getController("compiler")[0].compile());
    //console.log(JSON.stringify(codeDatas, null, 2));
    //console.log(JSON.stringify(positions, null, 2));
});