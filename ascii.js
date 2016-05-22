"use strict";

var timer = null;
var pic = null;
var picNum = 0;
var delay = 250;

//CSC 365 Fall 2014
//Homework 5

window.onload = function() {
	//on start up disable stop button
	document.getElementById("stop").disabled = true;
}

function startAnimation() {
	if(!timer)
	{	//begin animation and disable buttons
		pic  = $("mytextarea").value;
		timer = setInterval(playAnimation, delay);
		document.getElementById("stop").disabled = false;
		document.getElementById("start").disabled = true;
		document.getElementById("animation").disabled = true;
	}
}

function playAnimation() {
	//create a temp array with each image	
	var temp = pic.split("=====\n");
	if(picNum < temp.length)
	{	//display animations and iterate
		$("mytextarea").value = temp[picNum];
		picNum += 1;
	}
	else
	{	//restart animation, recursive call
		picNum = 0;
		playAnimation();
	}
}

function stopAnimation() {
	//clear interval and reset others
	clearInterval(timer);
	timer = null;
	picNum = 0;
	$("mytextarea").value = pic;
	document.getElementById("stop").disabled = true;
	document.getElementById("start").disabled = false;
	document.getElementById("animation").disabled = false;
}

function changeAnimation() {
	//function to be called onchange of the animation select
	var animation = document.getElementById("animation");
	var strAnim = animation.options[animation.selectedIndex].value;
	$("mytextarea").value = ANIMATIONS[strAnim];
}

function changeFont() {
	//function to be called onchange of the font size select
	var fSize = document.getElementById("fSize");
	var strFontSize = fSize.options[fSize.selectedIndex].value;
	$("mytextarea").style.fontSize = strFontSize;
}

function changeSpeed() {
	//function to be called onclick of the turbo checkbox
	if(document.getElementById("turbo").checked)
	{	//if checked
		delay = 50;
	}
	else
	{	//if not checked
		delay = 250;
	}
	//if program is running, update timer
	if(timer)
	{
		clearInterval(timer);
		timer = setInterval(playAnimation, delay);
	}
}