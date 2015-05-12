var levelNumber = 1;
	// $menuIcon;
var score = 0;
var answers = [
	"",
	"Helvetica",
	"Clarendon",
	"Gill Sans"
]

var fonts = [
	"Arial",
	"Avant Garde",
	"Baskerville",
	"Bodoni",
	"Clarendon",
	"Comic Sans",
	"DIN",
	"Frutiger",
	"Futura",
	"Garamond",
	"Georgia",
	"Gill Sans",
	"Goudy",
	"Helvetica",
	"Impact",
	"Kabel",
	"Memphis",
	"Optima",
	"Papyrus",
	"Rockwell",
	"Sabon",
	"Times New Roman",
	"Univers",
	"Verdana",
	"Wingdings"
];

var usedFonts = []; //// Array used to put fonts that are already used in buttons; prevents name from being written twice

$(document).ready(function(){

	writeButtons();
	writeCorrectButton();

})



//////// BUTTON RANDOMIZATION

// Newly generated random fonts should be compared to a previous fonts chosen
// Previous fonts chosen --> saved into array (push into an empty array)
// If it doesnt match then place inside button
// If it does, then generate again


//// Checks if generated font is in "usedFonts"
function inArray (item, array) {
	var count = array.length || 1;
	for (var i=0; i<count; i++) {
		if (array[i] === item) {
			return true;
		}
	}
	return false;
}

//// Writes all buttons at random
function writeButtons() {
	for (var i = 0; i<6; i++) { 
		var randomFont = fonts[Math.floor(Math.random()*fonts.length)]; //// Chooses font at random
		while (randomFont === answers[levelNumber] === true || inArray(randomFont, usedFonts)) { //// Conditions that need to be met before a font is written into a button
			randomFont = fonts[Math.floor(Math.random()*fonts.length)]; //// If conditions aren't met, then font is generated again
		}
		$("ul").append("<li class='button'>" + randomFont + "</li>"); //// Appends new <li> with generated font
		usedFonts.push(randomFont); //// Puts font name into list for later comparison
	}
	$("ul li").on("click", colorWrong); //// Sets all "li" with click listener
}

//// Overwrites one of the six "li" at random with the correct answer
function writeCorrectButton() {
	$("ul li:eq(" + Math.floor(Math.random()*6) + ")").text(answers[levelNumber])
													  .attr("id", "correct")
													  .on("click", colorCorrect);
}



//////// BUTTON APPEARANCE (ON CLICK)

////When correct button is clicked
function colorCorrect() {
    $("#correct").css("background", "rgb(94, 192, 0)"); // Highlights correct button
    showInfo();
    $("ul li").unbind("click");
}

////When wrong button is clicked
function colorWrong() {
    $(this).css("background", "rgb(255, 111, 119)"); // Highlights selected incorrect button
    $("#correct").css("background", "rgb(94, 192, 0)"); // Highlights correct answer
    showInfo();
    $("ul li").unbind("click");
}

////Brings up font info
function showInfo() {
	$(".footer-info").html("<div id='info'><p><span class='bold'>Designer:</span>" + "</p><p><span class='bold'>Created:</span>" + "</p></div><div id='next'>next level ></div>");
	$("#next").on("click", nextLevel);
}




//////// STOP COLOR CHANGES FOR EACH LEVEL

// Answer is chosen (button clicked)
// Stop other buttons from being clickable
// Disable "click" event listeners



//////// NEXT LEVEL

function nextLevel() {
	levelNumber++;
	$("ul").html("");
	usedFonts = [];
	writeButtons();
	writeCorrectButton();
	resetAppearance();
}

function resetAppearance() {
	$(".footer-info").html("");
	$(".button").css("background", "rgb(98, 134, 136)");
    $("#level").text("Level " + levelNumber); // Changes Level # shown on window
    $("#word-image").attr("src", "images/level" + levelNumber + ".png"); // Changes word-image
}



//////SIDEBAR FUNCTIONS////////

// ////Slides menu into window
// function slideMenu() { 
// 	$("#sidebar").css("right", "0");
// }

// ////Slides menu out of window
// function unslideMenu() { 
// 	$("#sidebar").css("right", "-275px");
// }