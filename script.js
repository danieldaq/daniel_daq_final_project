var levelNumber = 1;
var score = 0;

var fonts = {
	"Index [0]": {}, //// Index[0] placeholder for when "fonts" keys turn into an array in "var = fontAnswers"

	"Helvetica": {
		Designer: "Max Miedinger, Eduard Hoffman", 
		Created: "1957"
	},

	"Optima": {
		Designer: "Hermann Zapf", 
		Created: "1955"
	},

	"Clarendon": {
		Designer: "Robert Besley", 
		Created: "1845"
	},

	"Gill Sans": {
		Designer: "Eric Gill", 
		Created: "1926"
	},

	"Times New Roman": {
		Designer: "Victor Lardent", 
		Created: "1931"
	},

	"Kabel": {
		Designer: "Rudolf Koch", 
		Created: "1927"
	},

	"Georgia": {
		Designer: "Matthew Carter", 
		Created: "1993"
	},

	"Bodoni": {
		Designer: "Giambattista Bodoni", 
		Created: "1798"
	},

	"Frutiger": {
		Designer: "Adrian Frutiger", 
		Created: "1975"
	},

	"Wingdings": {
		Designer: "Microsoft", 
		Created: "1990"
	},

	"Arial": {
		Designer: "Robin Nicholas, Patricia Saunders", 
		Created: "1982"
	},

	"Rockwell": {
		Designer: "Frank Hinman Pierpont", 
		Created: "1934"
	},

	"Baskerville": {
		Designer: "John Baskerville", 
		Created: "1757"
	},

	"Impact": {
		Designer: "Geoffrey Lee", 
		Created: "1965"
	},

	"Garamond": {
		Designer: "Claude Garamond, Jean Jannon", 
		Created: "1530"
	},

	"Univers": {
		Designer: "Adrian Frutiger", 
		Created: "1957"
	},

	"Comic Sans": {
		Designer: "Vincent Connare", 
		Created: "1994"
	},

	"DIN": {
		Designer: "Deutsches Institut für Normung", 
		Created: "1931"
	},

	"Futura": {
		Designer: "Paul Renner", 
		Created: "1927"
	},

	"Sabon": {
		Designer: "Jan Tschichold", 
		Created: "1964"
	},

	"Avant Garde": {
		Designer: "Herb Lubalin, Tom Carnase", 
		Created: "1970-1977"
	},

	"Papyrus": {
		Designer: "Chris Costello", 
		Created: "1982"
	},

	"Memphis": {
		Designer: "Rudolf Wolf", 
		Created: "1929"
	},

	"Verdana": {
		Designer: "Matthew Carter", 
		Created: "1996"
	}
}

var fontAnswers = Object.keys(fonts); // Sets "fonts" keys as an array. 
									  // Access each key name using an index number.
									  // Used for writing "correct" button for each level (Current level number used as index.)

var fontPool = [ // Used for comparing used fonts when generating buttons
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

var correctFonts = []; //// Displayed at Final Score page
var incorrectFonts = []; //// Displayed at Final Score page



//////// DOCUMENT READY

$(document).ready(function(){

	writeLevel();

})



//////// WRITE LEVELS ////////

//// Writes buttons and correct button for levels 1 - 24
function writeLevel() {
	if (levelNumber === 25) {
		writeFinalScorePage();
	} else {
		writeButtons();
		writeCorrectButton();
	}
}

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
		var fontRandom = fontPool[Math.floor(Math.random()*fontPool.length)]; //// Chooses font at random
		while (fontRandom === fontAnswers[levelNumber] || inArray(fontRandom, usedFonts) === true) { //// Conditions that need to be met before a font is written into a button
			fontRandom = fontPool[Math.floor(Math.random()*fontPool.length)]; //// If conditions aren't met, then font is generated again
		}
		$("ul.button-container").append("<li class='button'>" + fontRandom + "</li>"); //// Appends new <li> with generated font
		usedFonts.push(fontRandom); //// Puts font name into list for later comparison
	}
	$("ul.button-container li").on("click", answerWrong) //// Sets all <li> with "answerWrong" on click event
			  				   .on("click", colorWrong); //// Sets all <li> with "colorWrong" on click event
}

//// Overwrites one of the six "li" at random with the correct answer
function writeCorrectButton() {
	$("ul.button-container li").eq(Math.floor(Math.random()*6)).text(fontAnswers[levelNumber]) //// Writes font name of correct answer for current level
											  .attr("id", "correct") //// Sets this button as the correct button
											  .off("click", colorWrong) //// Turns off "colorWrong" click event set previously
											  .off("click", answerWrong) //// Turns off "answerWrong" click event set previously
											  .on("click", answerCorrect); //// Sets button with "answerCorrect" click event
}



//////// When CORRECT BUTTON is clicked ////////

// Button Function
function answerCorrect() {
	colorCorrect();
	turnOffAllButtons();
	correctFonts.push(fontAnswers[levelNumber]);
	showInfo(fontAnswers[levelNumber]);
	scoreIncrease();
}

// Button Appearance
function colorCorrect() {
    $("#correct").css("background", "rgb(94, 192, 0)"); // Highlights correct button
}


//////// When WRONG BUTTON is clicked ////////

// Button Function
function answerWrong() {
	turnOffAllButtons();
	incorrectFonts.push(fontAnswers[levelNumber]);
	showInfo(fontAnswers[levelNumber]);
}

// Button Appearance
function colorWrong() {
    $(this).css("background", "rgb(255, 111, 119)"); // Highlights selected incorrect button
    $("#correct").css("background", "rgb(94, 192, 0)"); // Highlights correct answer
}


///////// TURN BUTTON EVENT LISTENERS OFF ////////

function turnOffAllButtons() {
	$("#correct").off("click", answerCorrect);
	$("ul.button-container li").off("click", colorWrong);
	$("ul.button-container li").off("click", answerWrong);
}


//////// LEVEL APPEARANCE AFTER CLICK EVENT ////////

function scoreIncrease() {
	score++;
    $("#score").text("Score: " + score + " / 24");
}

function showInfo(fontname) {
	var fontQuery = $("#correct").text().split(" ").join("+")
	$("footer").html("<div id='info'></div><div class='footer-button' id='next'>Next Level ></div><a class='footer-button' id='see-font' target='_blank' href='http://fontsinuse.com/search?terms=" + fontQuery + "'>See Font</a>");
	$("#info").html("<p><span class='bold'>Name: </span>" + fontname + "</p><p><span class='bold'>Designer: </span>" + fonts[fontname].Designer + "</p><p><span class='bold'>Created: </span>" + fonts[fontname].Created + "</p>");
	$("#next").on("click", writeNextLevel);
}



//////// WRITE NEXT LEVEL ////////

function writeNextLevel() {
	levelNumber++;
	$("ul").html("");
	usedFonts = [];
	writeLevel();
	nextLevelAppearance();
}

function nextLevelAppearance() {
	$("footer").html(""); // Clears out footer
    $("#level").text("Level " + levelNumber); // Changes Level # shown on window
    $("#word-image").attr("src", "images/level" + levelNumber + ".png"); // Changes word-image
}



//////// FINAL SCORE PAGE

function writeFinalScorePage() {
	$("body").html("<section class='final-score'></section><section class='correct-fonts'></section><section class='incorrect-fonts'></section>");
	$(".final-score").html("<h1>Font Quiz</h1><h6>Created by Daniel Daquigan</h6><h4>Final Score:</h4><div class='score-box'><span id='large'>" + score +"</span> / 24</div><div id='play-again'>Play Again</div>");
	$("#play-again").on("click", playAgain);
	$(".correct-fonts").html("<h4 class='list'>Correct:</h4><ul id='correct-list'></ul>");
	$(".incorrect-fonts").html("<h4 class='list'>Incorrect:</h4><ul id='incorrect-list'></ul>")
	writeCorrectFonts();
	writeIncorrectFonts();
}

function writeCorrectFonts() {
	$.each(correctFonts, function(i) {
		$("<li/>").text(correctFonts[i]).appendTo($("ul#correct-list"));
	});
}

function writeIncorrectFonts() {
	$.each(incorrectFonts, function(i) {
		$("<li/>").text(incorrectFonts[i]).appendTo($("ul#incorrect-list"));
	});
}

function playAgain() {
	levelNumber = 1;
	score = 0;
	correctFonts = [];
	incorrectFonts = [];
	writeEmptyLevel();
	writeLevel();
}

function writeEmptyLevel() {
	$("body").html("<header></header><div class='word-container'></div><ul class='button-container'></ul><footer></footer>");
	$("header").html("<h3 id='level'>Level 1</h3><h3 id='score'>Score: 0 / 24</h3>");
	$(".word-container").html("<img src='images/level1.png' id='word-image'>");
}