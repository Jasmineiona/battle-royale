var Contender = function(named, promCent, warExp, isBadass, isAlcoholic, isGenius, isHuman, img) {
	this.named = named;
	this.promCent = promCent;
	this.warExp = warExp;
	this.isBadass = isBadass;
	this.isAlcoholic = isAlcoholic;
	this.isGenius = isGenius;
	this.isHuman = isHuman;
	this.img = img;
	this.chance = 50;
	this.adv = 0;
	this.bonusList = [];

	this.getAdv = function(){
		if (this.isBadass === true) {
			this.adv += 7;
			this.bonusList.push("BONAFIDE BADASS BONUS +700");
		} //Bonafide Badass
		if (this.warExp === 2) {
			this.adv += 7;
			this.bonusList.push("WAR HERO +700");
		} else if (this.warExp === 1) {
			this.adv += 4;
			this.bonusList.push("FIGHTER +400");
		} //War Experience - War Hero / Figher / Civilian
		if (this.isAlcoholic === true) {
			this.adv -= 2;
			this.bonusList.push("ALCOHOLISM -200");
		} //Alcholic Burdon
 		if (this.isGenius === true) {
 			this.adv += 5;
 			this.bonusList.push("GENIUS BONUS +500");
 		} //Genius Bonus
 		if (this.isHuman === true) {
 			this.adv += 5;
 			this.bonusList.push("HUMANITARIAN +500");
 		}
	};
};


var imgs = new Array();
imgs[0] = new Image();
imgs[0].src = 'images/arc.jpg';
imgs[1] = new Image();
imgs[1].src = 'images/beethoven.jpg';
imgs[2] = new Image();
imgs[2].src = 'images/curie.jpg';
imgs[3] = new Image();
imgs[3].src = 'images/einstein.jpg';
imgs[4] = new Image();
imgs[4].src = 'images/franklin.jpg';
imgs[5] = new Image();
imgs[5].src = 'images/gandhi.jpg';
imgs[6] = new Image();
imgs[6].src = 'images/salk.jpg';
imgs[7] = new Image();
imgs[7].src = 'images/teresa.jpg';
imgs[8] = new Image();
imgs[8].src = 'images/tesla.jpg';
imgs[9] = new Image();
imgs[9].src = 'images/tubman.jpg';
imgs[10] = new Image();
imgs[10].src = 'images/twain.jpg';
imgs[11] = new Image();
imgs[11].src = 'images/vinci.jpg';
imgs[12] = new Image();
imgs[12].src = 'images/washington.jpg';

function getContenderList() {
	var arc = new Contender("Joan of Arc", 13, 2, true, false, false, false, imgs[0]);
	var beethoven = new Contender("Ludwig Beethoven", 15, 0, false, false, true, false, imgs[1]);
	var curie = new Contender("Marie Curie", 20, 0, false, false, true, true, imgs[2]);
	var einstein = new Contender("Albert Einstein", 20, 0, false, false, true, true, imgs[3]);
	var franklin = new Contender("Benjamin Fraklin", 18, 1, false, false, true, false, imgs[4]);
	var tesla = new Contender("Nikola Tesla", 19, 0, false, true, true, false, imgs[8]);
	var twain = new Contender("Mark Twain", 19, 1, true, true, false, false, imgs[10]);

	contenderList.push(arc, beethoven, curie, einstein, franklin, tesla, twain);
}

function getAllBonus() {
	for (var i = 0; i < contenderList.length; i++) {
		contenderList[i].getAdv();
	}
}

function randomizer() {
	return Math.floor(Math.random() * contenderList.length);
}

function pickContenders() {
	p1Choice = contenderList[randomizer()];
	console.log(p1Choice);
	do {
		p2Choice = contenderList[randomizer()];
	}
	while (p1Choice === p2Choice);
	console.log(p2Choice);
}

function fight(contA, contB) {
	var chanceMultiplier = 1.75;

	console.log(contA.named + "'s advantage is " + contA.adv);
	console.log(contB.named + "'s advantage is " + contB.adv);

	if (contA.adv >= contB.adv) {
		var diff = contA.adv - contB.adv;
		contA.chance += diff * chanceMultiplier;
	} else {
		var diff = contB.adv - contA.adv;
		contA.chance -= diff * chanceMultiplier;
	}
	console.log("Difference is " + diff);
	console.log(contA.named + "'s chance is " + contA.chance);


	var fate = Math.floor(Math.random() * 100);
	console.log("Fate has chosen " + fate);

	var elWinner = document.getElementById('winnerbox');
	var elWinExtra = document.getElementById('winner-extra');
	if (fate <= contA.chance) {
		console.log(contA.named + " is the winner!");
		elWinner.textContent = (contA.named);
		elWinExtra.textContent = "is the Winner!";
	} else {
		console.log(contB.named + " is the winner!");
		elWinner.textContent = (contB.named);
		elWinExtra.textContent = "is the Winner!";
	}
}

function placePics(contA, contB) {
	var p1Pic = document.getElementById('left-pic');
	var p2Pic = document.getElementById('right-pic');
	var p1Name = document.getElementById('left-nametag');
	var p2Name = document.getElementById('right-nametag');

	if (p1Pic.firstChild) {
		p1Pic.removeChild(p1Pic.firstChild);
		p2Pic.removeChild(p2Pic.firstChild);
	} 

	p1Pic.appendChild(contA.img);
	p2Pic.appendChild(contB.img);
	p1Name.textContent = contA.named;
	p2Name.textContent = contB.named;
}

function placeBonus(contA, contB) {
	var p1List = document.getElementById('left-bonus');
	var p2List = document.getElementById('right-bonus');

	while (p1List.hasChildNodes()) {
		p1List.removeChild(p1List.lastChild);
		p1List.innerHTML = '';
	}
	while (p2List.hasChildNodes()) {
		p2List.removeChild(p2List.lastChild);
		p1List.innerHTML = '';
	}
	// contA.getAdv();
	// contB.getAdv();

	for (var i = 0; i < contA.bonusList.length; i++) {
		var itemA = document.createElement('li');
		itemA.appendChild(document.createTextNode(contA.bonusList[i]));
		p1List.appendChild(itemA);
	}
	for (var j = 0; j < contB.bonusList.length; j++) {
		var itemB = document.createElement('li');
		itemB.appendChild(document.createTextNode(contB.bonusList[j]));
		p2List.appendChild(itemB);
	}	
}

function removeWinner() {
	var elWinner = document.getElementById('winnerbox');
	var elWinExtra = document.getElementById('winner-extra');
	elWinner.textContent = '';
	elWinExtra.textContent = '';
}

var p1tracker = function() {
	var elWinner = document.getElementById('winnerbox');
	if (p1Choice.named === elWinner.textContent) {
		userWinningBets += 1;
	} else if (p2Choice.named === elWinner.textContent) {
		userLosingBets += 1;
	}
	console.log("You chose " + p1Choice.named);
};

var p2tracker = function() {
	var elWinner = document.getElementById('winnerbox')
	if (p2Choice.named === elWinner.textContent) {
		userWinningBets += 1;
	} else if (p1Choice.named === elWinner.textContent) {
		userLosingBets += 1;
	}
	console.log("You chose " + p2Choice.named);
};

//+++++++++++++++++++++++++++++++++++++++++++++ GLOBAL VARIABLES

var contenderList = new Array();
getContenderList();
getAllBonus();
var p1Choice;
var p2Choice;
var userWinningBets = 0;
var userLosingBets = 0;
var goButton = document.getElementById('button');
var p1 = document.getElementById('left-container');
var p2 = document.getElementById('right-container');

//+++++++++++++++++++++++++++++++++++++++++++++ EVENT LISTENERS

goButton.addEventListener('click', function() {
	pickContenders();
	placePics(p1Choice, p2Choice);
	placeBonus(p1Choice, p2Choice);
	removeWinner();
});

p1.addEventListener('click', function() {
	fight(p1Choice, p2Choice);
	p1tracker();
	console.log("Running winning bets: " + userWinningBets);
	console.log("Running losing bets: " + userLosingBets);
});

p2.addEventListener('click', function() {
	fight(p1Choice, p2Choice);
	p2tracker();
	console.log("Running winning bets: " + userWinningBets);
	console.log("Running losing bets: " + userLosingBets);	
});


