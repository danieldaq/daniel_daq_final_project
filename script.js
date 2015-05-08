var score = 0;
var levelNumber = 1;
var $buttonOne, 
	$buttonTwo,
	$buttonThree,
	$buttonFour,
	$buttonFive,
	$buttonSix;
	// $menuIcon;
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

var usedFonts = [];

//// Create Array with all the font names
//// Use that array for randomization

$(document).ready(function(){

	$buttonOne = $("#button-1");
	$buttonTwo = $("#button-2");
	$buttonThree = $("#button-3");
	$buttonFour = $("#button-4");
	$buttonFive = $("#button-5");
	$buttonSix = $("#button-6");
	// $menuIcon = $("#menu-icon");

	// $buttonOne.on("click", colorCorrect);
	// $buttonTwo.on("click", colorWrong);
	// $buttonThree.on("click", colorWrong);
	// $buttonFour.on("click", colorWrong);
	// $buttonFive.on("click", colorWrong);
	// $buttonSix.on("click", colorWrong);
	// $menuIcon.on("click", slideMenu);

	levelButtons1();

})


//////// BUTTON RANDOMIZATION



// Randomly fill button text (<li>) with array of font names

// Selects item from array "fonts" at random
fonts[Math.floor(Math.random()*fonts.length)];  // Always a new item when code runs
var randomFont = fonts[Math.floor(Math.random()*fonts.length)]; // Sets "randomFont" as the same font each time code runs



//////// HARDCODED LEVEL ANSWERS

// Splice out array items
// Separate array to keep track of used items

// Newly generated random fonts should be compared to a previous fonts chosen
// Previous fonts chosen --> saved into array (push into an empty array)
// If it doesnt match then place inside button
// If it does, then generate again


function levelButtons1() {
	$buttonOne.text("Helvetica").on("click", colorCorrect);
	$buttonTwo.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
	$buttonThree.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
	$buttonFour.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
	$buttonFive.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
	$buttonSix.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
}

function levelButtons2() {
	$buttonOne.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
	$buttonTwo.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
	$buttonThree.text("Clarendon").on("click", colorCorrect);
	$buttonFour.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
	$buttonFive.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
	$buttonSix.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
}

function levelButtons3() {
	$buttonOne.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
	$buttonTwo.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
	$buttonThree.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
	$buttonFour.text("Gill Sans").on("click", colorCorrect);
	$buttonFive.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
	$buttonSix.text(fonts[Math.floor(Math.random()*fonts.length)]).on("click", colorWrong);
}


////When correct button is clicked
function colorCorrect() {
    $buttonOne.css("background", "rgb(94, 192, 0)"); // Highlights correct button
    showInfo();
    score++;
    console.log("score:", score);
}

////When wrong button is clicked
function colorWrong() {
    $(this).css("background", "rgb(255, 111, 119)"); // Highlights selected incorrect button
    $buttonOne.css("background", "rgb(94, 192, 0)"); // Highlights correct answer
    showInfo();
}

////Brings up font info
function showInfo() {
	$(".footer-info").html("<div id='info'><p><span class='bold'>Designer:</span> Max Miedinger, Eduard Hoffman</p><p><span class='bold'>Created:</span> 1957</p></div><div id='next'>next level ></div>");
	$("#next").on("click", nextLevel);
}



//////// STOP COLOR CHANGES FOR EACH LEVEL

// Answer is chosen (button clicked)
// Stop other buttons from being clickable
// Disable "click" event listeners



//////// NEXT LEVEL

////Resets level appearance
// function nextLevel() {
// 	$(".footer-info").html("");
// 	$(".button").css("background", "rgb(98, 134, 136)");
// 	levelNumber++;
//     $("#level").text("Level " + levelNumber); // Changes Level # shown on window
//     $("#word-image").attr("src", "images/level" + levelNumber + ".png"); // Changes word-image
// }

function nextLevel() {
	$(".footer-info").html("");
	$(".button").css("background", "rgb(98, 134, 136)");
	levelNumber++;
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