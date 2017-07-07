"use strict";

var input = document.querySelector('#input'),		
		clearAll = document.querySelector('.c'),
		backspase = document.querySelector('.backspase'),
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
		brOpen = document.querySelector('.bracket1'),
		brClose = document.querySelector('.bracket2'),
		equals = document.querySelector('.equals'),
		add = document.querySelector('.add'),
		subt = document.querySelector('.subt'),
		div = document.querySelector('.div'),
		mult = document.querySelector('.mult'),
		body = document.querySelector('body');;

//in/out and delete func
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
div.addEventListener("click", forDivide, false);
mult.addEventListener("click", forMultipl, false);
plusMinus.addEventListener("click", plMinus, false);
backspase.addEventListener("click", backsp, false);
clearAll.addEventListener("click", buttDelete, false);
brOpen.addEventListener("click", bracketOpen, false);
brClose.addEventListener("click", bracketClose, false);
// equals.addEventListener("click", answer false);

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
function forDivide() {
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
					}
				}
			} else if (rightArr[0] !== "0") {
				testSign("÷");
			}
		}
	} else if (str[str.length-1] !== "0") {
		testSign("÷");
	}	
}

function bracketOpen () {
	if (!/\d|\.|\)/.test(input.value[input.value.length-1])) {
		input.value += "(";
		focusInput();
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
		}
	}
}

function numPushIn(arg){
	if(!/\)/.test(input.value[input.value.length-1])){
		testZero();
		input.value += arg;
		focusInput();
	}
}

function testSign(arg) {
	var str = input.value;
	if(/\d|\)/.test(str[str.length-1])) {
		input.value += arg;
	} else if (str[str.length-1] !== "." && /\×|\+|\-|\÷/.test(str[str.length-1])){
		input.value = str.slice(0, -1) + arg;
	}
	focusInput();
}

function searchIndexOf(re,str) {
	for (var i = str.length - 1; i >= 0; i--) {
		if (re.test(str[i])) {
			return i;
		} 
	}
	return -1;
}

function plMinus() {
	var str = input.value;
	if (str[str.length-1] === "-") {
		input.value = str.slice(0, -1);
		if (str[str.length-2] && str[str.length-2] !== "(" && !/\×|\+|\-|\÷/.test(str[str.length-2])) {
			input.value += "+";
		}
	} else if (str[str.length-1] === "+") {
		input.value = str.slice(0, -1);
		input.value += "-";
	} else if (str[str.length-1] === "(" || !/\W/.test(str[str.length-1])){
		input.value += "-";
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
	} else if (input.value.length === 0 || /\×|\+|\-|\÷/.test(input.value[input.value.length-1])) {
		input.value += "0.";
	}
	if (testPoint) {
		input.value += ".";
	}
	focusInput();
}

function backsp() {input.value = input.value.slice(0, -1); focusInput();}
function buttDelete() {input.value = "";}

input.addEventListener("keypress", function(e) {e.preventDefault();},false);

body.addEventListener("keydown", function(e) {
	if (e.keyCode === 8) {
		e.preventDefault();
		backsp();
	} else if (e.keyCode === 46) {
		e.preventDefault();
		buttDelete();
	}
},false);



var focusInput = function () {           
  var dop = input.value;
  input.value = "";
  input.value = dop;
  input.focus();
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
//end in/out and delete func

// function answer() {}