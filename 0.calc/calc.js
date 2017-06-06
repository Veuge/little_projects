var keys = document.getElementsByClassName("key");
var screen = document.getElementById("display");
var result = false,
    pressed,
    input = "",
    numberReg = /^\d+$/,
    arithmeticReg = /\d+(\.\d+)?(\+|\-|\*|\/)\d+(\.\d+)?/g,
    operators = ["+", "-", "x", "/"],
    decimalPoint = false;

console.log(keys);

for(var i = 0; i < keys.length; i++){
    keys[i].onclick = function(e){
        pressed = this.innerHTML;
        console.log(pressed);
        console.log("Input " + input);
        if(result || pressed == "C"){
            clear();
        }
        else if (numberReg.test(pressed)) {
            console.log("Number!");
            input += pressed;
        }
        else if (operators.indexOf(pressed) > -1) {
            operator();
        }
        else if (pressed == "=") {
            evaluate();
        }
        else if (pressed == ".") {
            console.log("Dot!");
            if(!decimalPoint && input != ""){
                decimalPoint = true;
                input += pressed;
            }
        }
        console.log("Expression: " + input);
        screen.innerHTML = input;
    }
}

function clear(){
    console.log("Clear data");
    pressed = null;
    input = "";
    result = false;
    decimalPoint = false;
}

function operator(){
    console.log("Operator!");
    var beforeOperator = input.charAt(input.length - 1);
    if(beforeOperator == "" && pressed == "-"){
        input = pressed;
        decimalPoint = false;
    }
    else if (input != "" && numberReg.test(beforeOperator)) {
        if(pressed == "x"){
            input += "*";
        }
        else{
            input += pressed;
        }
        decimalPoint = false;
    }
    else {
        console.log("You cannot enter an operator ");
    }
}
function evaluate(){
    console.log("Equals! " + input);
    if(arithmeticReg.test(input)){
        console.log("Correct arithmetic operation");
        input = eval(input);
        result = true;
    }
    else {
        console.log("Incorrect arithmetic operation");
    }
}
