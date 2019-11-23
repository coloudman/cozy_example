
const { CodeLoader, ControllerLoader } = require("../../COZY_LIB/dist/index");
const { COZY } = require("../../COZY/dist/index");


//패키지들
const mathPackage = require("./packages/math/Code");
const mathRendererPackage = require("./packages/math/Renderer");
const mathCompilerJSPackage = require("./packages/math/CompilerJS");
const mathCompilerCppPackage = require("./packages/math/CompilerCpp");

const consolePackage = require("./packages/console/Code");
const consoleRendererPackage = require("./packages/console/Renderer");
const consoleCompilerJSPackage = require("./packages/console/CompilerJS");
const consoleCompilerCppPackage = require("./packages/console/CompilerCpp");

const basicPackage = require("./packages/basic/Code");
const basicRendererPackage = require("./packages/basic/Renderer");
const basicCompilerJSPackage = require("./packages/basic/CompilerJS");
const basicCompilerCppPackage = require("./packages/basic/CompilerCpp");

const stringPackage = require("./packages/string/Code");
const stringRendererPackage = require("./packages/string/Renderer");
const stringCompilerJSPackage = require("./packages/string/CompilerJS");
const stringCompilerCppPackage = require("./packages/string/CompilerCpp");

//콘텍스트
const MyCompilerContext = require("./context/MyCompilerContext");
const MyRendererContext = require("./context/MyRendererContext");

//컴포저 (코드 최종제작)
const compilerComposers = require("./composer/compilerComposers");


//패키지
const codePackages = {
    mathPackage,
    consolePackage,
    basicPackage,
    stringPackage
};
const rendererPackages = {
    mathRendererPackage,
    consoleRendererPackage,
    basicRendererPackage,
    stringRendererPackage
};

//JS
const compilerPackages = {
    mathCompilerJSPackage,
    consoleCompilerJSPackage,
    basicCompilerJSPackage,
    stringCompilerJSPackage
};
//C++
const compilerCppPackages = {
    mathCompilerCppPackage,
    consoleCompilerCppPackage,
    basicCompilerCppPackage,
    stringCompilerCppPackage
};


//콘텍스트
const contextDatas = {
    compiler:{},
    renderer:{}
}
const compilerContext = new MyCompilerContext(contextDatas.compiler)
const contexts = {
    compiler:compilerContext,
    compilerCpp:compilerContext, //콘텍스트는 똑같은거 쓴다.
    renderer:new MyRendererContext(contextDatas.renderer)
};

//로더
const controllerLoaders = {
    compiler : new ControllerLoader(compilerPackages),
    compilerCpp : new ControllerLoader(compilerCppPackages),
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

const cozyData = {
    codeDatas:[],
    positions:[],
    contexts:contexts
};

/* COZYCOZY */
const cozy = new COZY(document.getElementById("cozy"), codeLoader, cozyData);

/* 데이터 만지작 만지작 */
cozy.area.addController("compiler");
cozy.area.addController("compilerCpp");
cozy.area.addController("renderer");


const code = cozy.areaWithPosition.addPositionedCodeFromCodeData(codeData,{
    x:10,
    y:10
}).code;


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



/*
GUI
*/

document.getElementById("compile_compose_js").addEventListener("click", () => {
    cozy.compilerControllerName = "compiler";
    cozy.setCompilerComposer(compilerComposers["javascript"]);
    console.log(cozy.compile());
    alert(cozy.compile());
});

document.getElementById("compile_compose_cpp").addEventListener("click", () => {
    cozy.compilerControllerName = "compilerCpp";
    cozy.setCompilerComposer(compilerComposers["cpp"]);
    console.log(cozy.compile());
    alert(cozy.compile());
});