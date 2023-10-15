let textbox = document.querySelector(".textfield");
let decimalCount = 0;
let valueOne = 0;
let valueTwo = "";
let result = "";
let operator = "";
let temp = "";


let btnNumber = document.querySelectorAll(".number");

for (const btn of btnNumber) {
    btn.addEventListener('click', () => {
        if (btn.textContent === "." && decimalCount > 0) {
            return;
        }
        if (btn.textContent === ".") {
            decimalCount++;
        }
        if (textbox.value.toString().length > 22) {
            textbox.value = "number too big :C ";
            return;
        }
        textbox.value += btn.textContent;
    })
}

let btnClear = document.getElementById("#clear");
btnClear.addEventListener("click", () => {
    textbox.value = "";
    decimalCount = 0;
    valueOne = "";
    valueTwo = "";
    result = "";
    temp = "";
});

let btnDelete = document.getElementById("#delete");
btnDelete.addEventListener("click", () => {
    textbox.value = textbox.value.toString().slice(0, -1);
});

let btnOperator = document.querySelectorAll(".operator")
for (const btn of btnOperator) {
    btn.addEventListener('click', () => {
        if (valueOne !== "" && textbox.value.indexOf(valueOne) !== -1) {
            operate();
            textbox.value += btn.textContent;
        } else {
            valueOne = parseFloat(textbox.value);
            textbox.value += btn.textContent;
        }
        decimalCount = 0;
    })
}

let btnEquals = document.getElementById("#=")
btnEquals.addEventListener('click', operate);

function operate() {
    if (textbox.value.indexOf("+") !== -1) {
        valueTwo = parseFloat(textbox.value.substring(textbox.value.indexOf('+') + 1));
        result = valueOne + valueTwo;
    } else if (textbox.value.indexOf("-") !== -1) {
        if (valueOne.toString().includes("-")) {
            temp = textbox.value.substring(textbox.value.indexOf('-') + 1);
            if (temp.toString().includes("-")) {
                valueTwo = parseFloat(temp.substring(temp.indexOf('-') + 1));
                result = valueOne - valueTwo;
            }   
        }
        else {
            valueTwo = parseFloat(textbox.value.substring(textbox.value.indexOf('-') + 1));
            result = valueOne - valueTwo;
        }
    } else if (textbox.value.indexOf("*") !== -1) {
        valueTwo = parseFloat(textbox.value.substring(textbox.value.indexOf('*') + 1));
        result = valueOne * valueTwo;
    } else if (textbox.value.indexOf("/") !== -1) {
        valueTwo = parseFloat(textbox.value.substring(textbox.value.indexOf('/') + 1));
        if (valueTwo === 0) {
            result = "You can't divide by zero, fool!"
        } else {
            result = Math.round((valueOne / valueTwo) * 100) / 100;
        }
    }
    textbox.value = result;
    valueOne = result;
}

//keyboard support 
document.addEventListener('keypress', function(e){
    console.log(e.key);
    if (e.key >= 0 && e.key <= 9){
        textbox.value += `${e.key}`;
    }else if(e.key === "."){
        textbox.value += `${e.key}`;
        decimalCount++;
    }else if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/"){
        if(valueOne !== "" && textbox.value.indexOf(valueOne) !== -1){
            operate();
            textbox.value += `${e.key}`; 
        }else{
            valueOne = parseFloat(textbox.value);
            textbox.value += `${e.key}`; 
        }
        decimalCount = 0;
    }else if(e.key === "Enter"){
        e.preventDefault();
        operate();
    }
   
})