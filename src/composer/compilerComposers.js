


export function javascript(compilers) {
    let headCodes = [];
    let mainCode;
    compilers.forEach(compiler => {
        if(compiler.main) {
            mainCode = compiler.compile();
        }
    });


    let textCode = "";

    textCode += mainCode;
    
    return textCode;
}

export function cpp(compilers) {
    let headCodes = [];
    let mainCode;
    compilers.forEach(compiler => {
        if(compiler.main) {
            mainCode = compiler.compile();
            headCodes.push.apply(headCodes, Object.values(compiler.getRequires()));
        }
    });


    let textCode = "";

    textCode += headCodes.join("\n");
    textCode += "\n";
    textCode += mainCode;
    
    return textCode;

}