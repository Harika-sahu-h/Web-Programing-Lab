var number1 = document.getElementById("number1");
var number2 = document.getElementById("number2");
var resultText = document.getElementById("result");
var operationButtons = document.querySelectorAll(".operation-button");
var clearButton = document.getElementById("clearButton");

function calculate(operation) {
    if (number1.value === "" || number2.value === "") {
        resultText.textContent = "Please enter both numbers first.";
        return;
    }

    var num1 = parseFloat(number1.value);
    var num2 = parseFloat(number2.value);
    var answer;

    if (operation === "add") {
        answer = num1 + num2;
    }
    else if (operation === "subtract") {
        answer = num1 - num2;
    }
    else if (operation === "multiply") {
        answer = num1 * num2;
    }
    else if (operation === "divide") {
        if (num2 === 0) {
            resultText.textContent = "Cannot divide by zero!";
            return;
        }
        answer = num1 / num2;
    }

    resultText.textContent = answer;
}

operationButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        calculate(button.getAttribute("data-operation"));
    });
});

clearButton.addEventListener("click", function() {
    number1.value = "";
    number2.value = "";
    resultText.textContent = "Your answer will appear here";
});
