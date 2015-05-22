/*
 * Ce jeu entraîne à retenir les intervalles entre les notes
 * Les questions sont de type: 
 *     Nombre d'intervalles entre Do et Fa ?  
 *
 * Comment jouer: 
 *     Choisir les options ci dessous
 *     Copier coller le code dans la console de votre navigateur
*/

// Options
var DURATION_MIN = 3; // Le nombre de minutes pendant lesquelles vous souhaitez jouer
var LANG = "US" // La langue utilisée pour les notes (US/FR/BOTH)
// Fin des options

var inFrench =  ['La'    , 'Si'    , 'Do'    , 'Ré'    , 'Mi'    , 'Fa'    , 'Sol'    ];
var inEnglish = ['A'     , 'B'     , 'C'     , 'D'     , 'E'     , 'F'     , 'G'      ];
var inBoth =    ['A (La)', 'B (Si)', 'C (Do)', 'D (Ré)', 'E (Mi)', 'F (Fa)', 'G (Sol)'];
var tone =      [1       , 0.5     , 1       , 1       , 0.5     , 1       , 1        ];
var byLang = { US: inEnglish, FR: inFrench, BOTH: inBoth };

var played = 0;
var score = 0;
var lastAnswer = 'Bienvenue !';
var startTime = (new Date()).getTime();
var elapsed = 0;

while (true) 
{
	var note1 = Math.floor((Math.random() * 7)) % 7;
	var note2;
	while ((note2 = Math.floor((Math.random() * 7)) % 7) == note1) ;
	var array = byLang[LANG];
	var answer = 0;
	var debug = "CORRECTION:\nEntre " + inBoth[note1] + ' et ' + inBoth[note2] + " :\n---\n";

	for (var j = note1; j != note2; j = (j + 1) % 7) {
		answer += tone[j];
		debug += tone[j] + ' entre ' + inBoth[j] + ' et ' + inBoth[(j + 1) % 7] + "\n";
	}

	debug += '= ' + answer;

	var input = prompt((lastAnswer ? lastAnswer + "\n\n" : '') + 
		"Entre " + array[note1] + ' et ' + array[note2] + ' ?');

	if (input === null) {
		lastAnswer = '';
		break;
	}

	lastAnswer = (answer == input) ? 'Bien joué !' : 'Faux :(' + "\n\n" + debug;
	score += answer == input ? 1 : 0;
	played++;

	if ((elapsed = (new Date()).getTime() - startTime) > DURATION_MIN * 60 * 1000) {
		break;
	}
}

if (played > 0) {
	var secondsPerQuestion = Math.round(1.0 * elapsed / played) / 1000;
	var percent = Math.round(100 * score / played);
	alert(lastAnswer)
	alert("Score final: " + score + "/" + played + ' (' + percent + '% de juste)' + "\n\n" +
		secondsPerQuestion + 'sec per question');
}
