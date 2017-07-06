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
		mult = document.querySelector('.mult');

//in/out and delete func
input.addEventListener("keypress", function(e) {
	if(e.keyCode < 40|| e.keyCode > 43 && e.keyCode !== 45 && e.keyCode < 47 || e.keyCode > 57) {
		e.preventDefault();
	} else if(e.keyCode === 47) {
		e.preventDefault();
		input.value += "÷";
	} else if(e.keyCode === 42) {
		e.preventDefault();
		input.value += "×";
	}
},false);

one.addEventListener("click", function() {input.value += 1;}, false);
two.addEventListener("click", function() {input.value += 2;}, false);
three.addEventListener("click", function() {input.value += 3;}, false);
four.addEventListener("click", function() {input.value += 4;}, false);
five.addEventListener("click", function() {input.value += 5;}, false);
six.addEventListener("click", function() {input.value += 6;}, false);
seven.addEventListener("click", function() {input.value += 7;}, false);
eight.addEventListener("click", function() {input.value += 8;}, false);
nine.addEventListener("click", function() {input.value += 9;}, false);
zero.addEventListener("click", function() {input.value += 0;}, false);
point.addEventListener("click", forPoint, false);
add.addEventListener("click", function() {testSign("+");}, false);
subt.addEventListener("click", function() {testSign("-");}, false);
div.addEventListener("click", function() {testSign("÷");}, false);
mult.addEventListener("click", function() {testSign("×");}, false);
plusMinus.addEventListener("click", plMinus, false);
backspase.addEventListener("click", function() {input.value = input.value.slice(0, -1);}, false);
clearAll.addEventListener("click", function() {input.value = "";}, false);
// brOpen.addEventListener("click", function() {input.value += "+";}, false);
// brClose.addEventListener("click", function() {input.value += "+";}, false);
// equals.addEventListener("click", function() {input.value += "+";}, false);

function plMinus() {
	var str = input.value;
	if (str[str.length-1] === "-") {
		input.value = str.slice(0, -1);
		if (str[str.length-2] && !/\×|\+|\-|\÷/.test(str[str.length-2])) {
			input.value += "+";
		}
	} else if (str[str.length-1] === "+") {
		input.value = str.slice(0, -1);
		input.value += "-";
	} else if (!/\W/.test(str[str.length-1])){
		input.value += "-";
	}
}

function testSign(arg) {
	var str = input.value;
	if(/\d/.test(str[str.length-1])) {
		input.value += arg;
	}
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
	}

	if (testPoint) {
		input.value += ".";
	}
}

//end in/out and delete func