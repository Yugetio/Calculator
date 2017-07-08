"use strict";

var input = document.querySelector('#input'),		
		clearAll = document.querySelector('.c'),
		backspace = document.querySelector('.backspace'),
		plusMinus = document.querySelector('.plus-minus'),
		one = document.querySelector('.one'),
		two = document.querySelector('.two'),
		three = document.querySelector('.three'),
		four = document.querySelector('.four'),
		five = document.querySelector('.five'),
		six = document.querySelector('.six'),
		seven = document.querySelector('.seven'),
		eight = document.querySelector('.eight'),
		nine = document.querySelector('.nine'),
		zero = document.querySelector('.zero'),
		point = document.querySelector('.point'),
		brOpen = document.querySelector('.bracketOpen'),
		brClose = document.querySelector('.bracketClose'),
		result = document.querySelector('.result'), //qd
		add = document.querySelector('.add'),
		subt = document.querySelector('.subt'),
		dvsn = document.querySelector('.dvsn'),
		mult = document.querySelector('.mult'),
		body = document.querySelector('body'),
		mainBoxMessage = document.querySelector('.message'),
		boxMsg = document.querySelector('.boxMsg');

//begin in/out and delete func
one.addEventListener("click", forOne, false);
two.addEventListener("click", forTwo, false);
three.addEventListener("click", forThree, false);
four.addEventListener("click", forFour, false);
five.addEventListener("click", forFive, false);
six.addEventListener("click", forSix, false);
seven.addEventListener("click", forSeven, false);
eight.addEventListener("click", forEight, false);
nine.addEventListener("click", forNine, false);
zero.addEventListener("click", forZero, false);
point.addEventListener("click", forPoint, false);
add.addEventListener("click", forPlus, false);
subt.addEventListener("click", forMinus, false);
dvsn.addEventListener("click", forDivision, false);
mult.addEventListener("click", forMultipl, false);
plusMinus.addEventListener("click", plMinus, false);
backspace.addEventListener("click", backsp, false);
clearAll.addEventListener("click", btnDelete, false);
brOpen.addEventListener("click", bracketOpen, false);
brClose.addEventListener("click", bracketClose, false);
result.addEventListener("click", answer, false);

function forOne() {numPushIn(1);}
function forTwo() {numPushIn(2);}
function forThree() {numPushIn(3);}
function forFour() {numPushIn(4);}
function forFive() {numPushIn(5);}
function forSix() {numPushIn(6);}
function forSeven() {numPushIn(7);}
function forEight() {numPushIn(8);}
function forNine() {numPushIn(9);}
function forZero() {numPushIn(0);}
function forMultipl() {testSign("×");}
function forPlus() {testSign("+");}
function forMinus() {testSign("-");}
function forDivision() {
	var str = input.value;
	var i = searchIndexOf(/\×|\+|\-|\÷|\(/, str);
	var pointIndex;

	i = i !== -1 ? i+1 : 0;
	if (str.length > 1 && i !== 0) {
		str = str.slice(i, str.length);
	}
	pointIndex = searchIndexOf(/\./, str)
	if (pointIndex !== -1) {
		if (pointIndex === 1 && str[pointIndex-1] !== "0" || pointIndex > 1) {
			testSign("÷");
		} else {	
			var rightArr = str.slice(pointIndex+1, str.length);
			if (rightArr.length > 1) {
				var countPoint = rightArr.length;
				for (var i = rightArr.length - 1; i >= 0; i--) {
					if (rightArr[i] === "0") {
						countPoint--;
					}
					if (i === 0 && countPoint !== 0) {
						testSign("÷");
					} else if(i === 0 && countPoint === 0){
						showMessage("You can't do this!");
					}
				}
			} else if (rightArr[0] !== "0") {
				testSign("÷");
			} else {
				showMessage("You can't do this!");
			}
		} 
	} else if (str[0] !== "0") {
		testSign("÷");
	}	else {
		showMessage("You can't do this!");
	}
}

function searchIndexOf(re,str) {
	for (var i = str.length - 1; i >= 0; i--) {
		if (re.test(str[i])) {
			return i;
		} 
	}
	return -1;
}

function bracketOpen () {
	if (!/\d|\.|\)/.test(input.value[input.value.length-1])) {
		input.value += "(";
		focusInput();
	} else {
		showMessage("You can't do this!");
	}
}

function bracketClose () {
	var str = input.value.split("");
	var countOpen = 0,
			countClose = 0;
	if (/\d|\)/.test(str[str.length-1])) {
		str.forEach(function(item){
			if (item === "(") {
				countOpen++;
			} else if (item === ")") {
				countClose++;
			}
		});

		if (countOpen > countClose) {
			input.value += ")";
			focusInput();
		} else {
			showMessage("You can't do this!");
		}
	} else {
		showMessage("You can't do this!");
	}
}

function numPushIn(arg){
	if(!/\)/.test(input.value[input.value.length-1])){
		testZero();
		input.value += arg;
		focusInput();
	} else {
		showMessage("You can't do this!");
	}
}

function testSign(arg) {
	var str = input.value;
	if(/\d|\)/.test(str[str.length-1])) {
		input.value += arg;
	} else if (/\×|\+|\-|\÷/.test(str[str.length-1]) && str[str.length-2] !== " "){
		input.value = str.slice(0, -1) + arg;
	} else {
		showMessage("You can't do this!");
	}
	focusInput();
}

function plMinus() {
	var str = input.value;
	if (str[str.length-1] === "-") {
		str = str.slice(0, -1);
		if (/\d/.test(str[str.length-1])) {
			input.value = str + "+";
		} else if (str[str.length-1] === " "){
			input.value = str.slice(0, -1);
		} else {
			input.value = str;
		}
	} else if (str[str.length-1] === "+") {
		input.value = str.slice(0, -1);
		input.value += "-";
	} else if (str[str.length-1] === "(" || !/\W/.test(str[str.length-1])){
		input.value += "-";
	} else if (/\×|\÷/.test(str[str.length-1])){
		input.value += " -";
	} else {
		showMessage("You can't do this!");
	}
	focusInput();
}

function forPoint() {
	var testPoint;
	if (input.value.length >= 3 && /\d/.test(input.value[input.value.length-1])) {
		testPoint = (function () {
			for (var i = input.value.length - 1; i >= 0; i--) {
				if (input.value[i] === ".") {
					return false;
				} else if (/\×|\+|\-|\÷/.test(input.value[i])) {
					return true;
				} else if (i === 0 && /\d/.test(input.value[i])) {
					return true;
				}
			}
		})(); 
	} else if (/\d/.test(input.value[input.value.length-1])) {
		testPoint = true;
	} else if (input.value.length === 0 || /\×|\+|\-|\÷|\(/.test(input.value[input.value.length-1])) {
		input.value += "0.";
	}
	if (testPoint) {
		input.value += ".";
	}
	focusInput();
}

function backsp() {input.value = input.value.slice(0, -1); focusInput(1);}
function btnDelete() {input.value = "";focusInput("clear")}

input.addEventListener("keypress", function(e) {e.preventDefault();},false);

body.addEventListener("keydown", function(e) {
	if (e.keyCode === 8) {
		e.preventDefault();
		backsp();
	} else if (e.keyCode === 46) {
		e.preventDefault();
		btnDelete();
	}
},false);

var focusInput = function () {           
  var dop = input.value;
  var oldLenght = dop.length; 
  input.value = "";
  input.value = dop;
  input.focus(); 
  if (arguments[0] && arguments[0] !== "clear") {
  	oldLenght += arguments[0];
  }
  if (dop.length === 21 || arguments[0] && oldLenght === 51) {
  	input.style.fontSize = "1.8rem";
  	input.style.height = "90px";
  } else if (dop.length === 51){
  	input.style.fontSize = "1.3rem";
  	input.style.height = "100px";
  } else if (oldLenght === 21 || arguments[0] === "clear") {
  	input.style.fontSize = "2.3rem";
  	input.style.height = "65px";
  }
}

function testZero() {
	var str = input.value;
	var dop = false;
	var count = 0;
	var lastI = (function() {
		for (var i = str.length - 1; i >= 0; i--) {
			if (str[i] === ".") {
				return -1;
			} else if (/\×|\+|\-|\÷/.test(str[i])) {
				return i+1;
			}
		}
		if (str.length === 0) {
			return -3;
		} else {
			return -2;
		}
	})();

	if (lastI !== -1 && lastI !== -3) {
		lastI = (lastI !== -2) ? lastI : 0;
		if (str.length-lastI > 1) {
			for (var i = lastI; i < str.length; i++) {
				if (str[i] === "0") {
					count++;
					if (count === str.length){
						input.value = str.slice(0, lastI-1) + "0";
						dop = true;
					}
				} 
			}
		} else if (str[lastI] === "0") {
			dop = true;
		}
		if (str[str.length-1] === "0" && str[str.length-2] !== "." && dop) {
				input.value += ".";
		} 
	}
}

function showMessage(str, check) {
	if (check) {
		boxMsg.style.paddingTop = "5px";
		boxMsg.style.height = "65px";
	} else if (!check) {
		boxMsg.style.paddingTop = "15px";
		boxMsg.style.height = "50px";
	}

	boxMsg.innerHTML = str;
	mainBoxMessage.style.display = "block"; 
	setTimeout(function() {
		mainBoxMessage.style.display = "none"; 
	}, 2000);
}
//end in/out and delete func

// start calculator
function answer() {
		brCloseAll();
	if (/\d|\)/.test(input.value[input.value.length-1])) {
		var arr = input.value.split("");
		arr = newArr(arr);
		arr.forEach(function(item, i) {
  		if (/^((\ ?\-)?\d+(\.\d+)?)$/.test(item)) {
  			arr[i] = getNum(item);
  		}
		});
	culcAnswer(arr);
	} else {
		showMessage("The syntax of this equation is incorrect!", 1);
	}
}

function brCloseAll() {
	var brOpen = 0, brClose = 0;

			for (var i = input.value.length - 1; i >= 0; i--) {
				if (input.value[i] === "(") {
					brOpen++;
				} else if (input.value[i] === ")") {
					brClose++;
				}
			}

			if (brOpen === brClose) {
				return;
			} else {
				for (var i = 0; i <= brOpen - brClose; i++) {
					input.value += ")";
				}
			}
}

function newArr(arr) {
	var newArr = [];
	var str = "";
	var checkEnd = false;
	for (var i = 0; i <= arr.length; i++) {
		if (arr[i] === " " || arr[i-1] === " " && arr[i] === "-" || arr[i-1] === "(" && arr[i] === "-" || i === 0 && arr[i] === "-" || checkEnd && /\d|\./.test(arr[i]) || /\d/.test(arr[i])) {
			if (!checkEnd) {checkEnd = true;}
			str += arr[i];
		} else if(/\×|\÷|\+|\-|\(|\)/.test(arr[i]) || checkEnd){
			if (checkEnd) {
				checkEnd = false;
				if (arr[i] === "(") {
					newArr.push("minus");
				} else {
					newArr.push(str);
				}
				str = "";
			}

			if (/\×|\÷|\+|\-|\(|\)/.test(arr[i])) {
				newArr.push(arr[i]);
			}
		}
	}
	return newArr;
}

function getNum(num) {
    if (/^((\ ?\-)?\d+)$/.test(num)) {
			return parseInt(num);        
    } else if (/^((\ ?\-)?\d+\.\d+)$/.test(num)) {
    	return parseFloat(num);  
    }
    return;
}

function calc(num1, sing, num2) {
	switch (sing) {
		case "×": num1 * num2; break;
		case "÷": num1 / num2; break;
		case "+": num1 + num2; break;
		case "-": num1 - num2; break;
	}
}












function culcAnswer(arr) {
	var endIndex = arr.indexOf(")"),
	startIndex = 0,//arr.lastIndexOf("("), 
	rightArr = [],
	lefArr = [],
	mainArr = [],
	finalArr = [];

	if (startIndex > 1) {rightArr = arr.slice(0, startIndex);}
	if (endIndex !== arr.length-1) {lefArr = arr.slice(endIndex+1);}
	mainArr = enumer(arr.slice(startIndex+1, endIndex));
	if (rightArr.length > 0) {finalArr.push(rightArr);}
	finalArr.push(mainArr);
	if (lefArr.length > 0) {finalArr.push(lefArr);}

	if (finalArr.length > 1) {
		culcAnswer(finalArr);
	} else {
		return finalArr.loin();;
	}
}

function enumer(arg) {
		var arr = arg,
				mrArr = [],
				mlArr = [],
				dopArr = [],
				i = -1;

		if (arr.indexOf("minus") !== -1) {
			i = arr.indexOf("minus");
			if (i !== 0 ) {mrArr = arr.slice(0, i);}
			if (i !== arr.length-2) {mlArr = arr.slice(i+1);}
			if (mrArr.length > 0) {dopArr.push(rmArr);}
			dopArr.push(arr[i+1]*(-1));
			if (mlArr.length > 0) {dopArr.push(rmArr);}
		} else if (arr.indexOf("×") !== -1) {
			i = arr.indexOf("×");
		} else if (arr.indexOf("÷") !== -1) {
			i = arr.indexOf("÷");
		} else if (arr.indexOf("+") !== -1) {
			i = arr.indexOf("+");
		} else if (arr.indexOf("-") !== -1) {
			i = arr.indexOf("-");
		} 

		(function () {
			if (i !== 1) {mrArr = arr.slice(0, i);}
			if (i != arr.length-2) {mlArr = arr.slice(i+1);}
			if (mrArr.length > 0) {dopArr.push(rmArr);}
			dopArr.push(calc(arr[i-1], arr[i], arr[i+1]));
			if (mlArr.length > 0) {dopArr.push(rmArr);}
		})();

		if (dopArr.length > 1) {
			enumer(dopArr);
		} else {
			return dopArr;
		}
	}