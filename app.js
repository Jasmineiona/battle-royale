var Contender = function(named, promCent, warExp, isBadass, isAlcoholic, isGenius, isHuman) {
	this.named = named;
	this.promCent = promCent;
	this.warExp = warExp;
	this.isBadass = isBadass;
	this.isAlcoholic = isAlcoholic;
	this.isGenius = isGenius;
	this.isHuman = isHuman;
	this.chance = 50;
	this.adv = 0;

	this.getAdv = function(){
		if (this.warExp === 2) {
			this.adv += 7;
		} else if (this.warExp === 1) {
			this.adv += 4;
		} //War Experience - War Hero / Figher / Civilian
		if (this.isBadass === true) {
			this.adv += 7;
		} //Bonafide Badass
		if (this.isAlcoholic === true) {
			this.adv -= 2;
		} //Alcholic Burdon
 		if (this.isGenius === true) {
 			this.adv += 5;
 		} //Genius Bonus
 		if (this.isHuman === true) {
 			this.adv += 5;
 		}
	}
};

var markTwain = new Contender("Mark Twain", 19, 1, true, true, false, false);
var nikTesla = new Contender("Nikola Tesla", 19, 0, false, true, true, false);

function fight(contA, contB) {
	var chanceMultiplier = 1.75;

	contA.getAdv();
	contB.getAdv();
	console.log(contA.named + "'s advantage is " + contA.adv);
	console.log(contB.named + "'s advantage is " + contB.adv);

	if (contA.adv >= contB.adv) {
		var diff = contA.adv - contB.adv;
		contA.chance += diff * chanceMultiplier;
	} else {
		var diff = contB.adv - contA.adv;
		contA.chance -= diff * chanceMultiplier;
	}
	console.log("Different is " + diff);
	console.log(contA.named + "'s chance is " + contA.chance);
	console.log(contB.named + "'s chance is " + contB.chance);

	var fate = Math.floor(Math.random() * 100);
	console.log("Fate has chosen " + fate);

	var elWinner = document.getElementById('winnerbox');
	if (fate <= contA.chance) {
		console.log(contA.named + " is the winner!");
		elWinner.textContent = (contA.named + " is the winner!");
	} else {
		console.log(contB.named + " is the winner!");
		elWinner.textContent = (contB.named + " is the winner!");
	}
}



var imgs = new Array();
imgs[0] = new Image();
imgs[0].src = 'images/twain.jpg';
imgs[1] = new Image();
imgs[1].src = 'images/tesla.jpg';

var p1 = document.getElementById('left-pic');
var p2 = document.getElementById('right-pic');
var name1 = document.getElementById('left-nametag');
var name2 = document.getElementById('right-nametag');

p1.appendChild(imgs[0]);
p2.appendChild(imgs[1]);
name1.textContent = markTwain.named;
name2.textContent = nikTesla.named;

var test = function() {
	console.log("user right or wrong function placeholder");
};

p1.addEventListener('click', function() {
	fight(markTwain,nikTesla);
});
p1.addEventListener('click', test);
p2.addEventListener('click', function() {
	fight(markTwain,nikTesla);
});
p2.addEventListener('click', test);
