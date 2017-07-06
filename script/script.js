"use strict";

// one, two, three, four, five, six, seven, eight, nine zero, add, point, bracket, equals, subt, div, mult, plus-minus, backspase, c, input

// - реализация не через внутренний парсер js, eval, new function.

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






input.addEventListener("keypress", function(e) {
	if (e.keyCode === 50) {
		e.preventDefault();
	}
},false);

one.addEventListener("click", function() {input.value += "+";}, false);
two.addEventListener("click", function() {input.value += "+";}, false);
three.addEventListener("click", function() {input.value += "+";}, false);
four.addEventListener("click", function() {input.value += "+";}, false);
five.addEventListener("click", function() {input.value += "+";}, false);
six.addEventListener("click", function() {input.value += "+";}, false);
seven.addEventListener("click", function() {input.value += "+";}, false);
eight.addEventListener("click", function() {input.value += "+";}, false);
nine.addEventListener("click", function() {input.value += "+";}, false);
zero.addEventListener("click", function() {input.value += "+";}, false);
point.addEventListener("click", function() {input.value += "+";}, false);
add.addEventListener("click", function() {input.value += "+";}, false);
subt.addEventListener("click", function() {input.value += "+";}, false);
div.addEventListener("click", function() {input.value += "+";}, false);
mult.addEventListener("click", function() {input.value += "+";}, false);
plusMinus.addEventListener("click", function() {input.value += "+";}, false);
backspase.addEventListener("click", function() {input.value += "+";}, false);
clearAll.addEventListener("click", function() {input.value += "+";}, false);
brOpen.addEventListener("click", function() {input.value += "+";}, false);
brClose.addEventListener("click", function() {input.value += "+";}, false);
equals.addEventListener("click", function() {input.value += "+";}, false);





