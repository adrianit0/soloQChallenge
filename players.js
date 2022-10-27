
const players = [
	{
		name: "Manuel",
		accountName: "manμe",
		lane: "top",
		smurf: false,
		tournament: true,
		data: null
	},
	{
		name: "Lechon",
		accountName: "420 Mia Ákalifa",
		lane: "support",
		smurf: false,
		tournament: true,
		data: null
	},
	{
		name: "Adrián",
		accountName: "Señor Piña",
		lane: "support",
		smurf: false,
		tournament: true,
		data: null
	},
	{
		name: "Enrique",
		accountName: "kidbuho",
		lane: "mid",
		smurf: false,
		tournament: true,
		data: null
	},
	{
		name: "Kike",
		accountName: "Aphelitoshueles",
		lane: "adc",
		smurf: false,
		tournament: true,
		data: null
	},
	{
		name: "Guille",
		accountName: "alejop",
		lane: "jungle",
		smurf: false,
		tournament: true,
		data: null
	},
	{
		name: "Zeta",
		accountName: "Żëłä",
		lane: "jungle",
		smurf: false,
		tournament: true,
		data: null
	},
	{
		name: "Joni",
		accountName: "The Topfatther",
		lane: "top",
		smurf: false,
		tournament: true,
		data: null
	},
	{
		name: "Lobito",
		accountName: "Lobitoh",
		lane: "top",
		smurf: false,
		tournament: false,
		data: null
	},
	{
		name: "Fran",
		accountName: "ƒrann",
		lane: "top",
		smurf: false,
		tournament: false,
		data: null
	},
	{
		name: "Patty",
		accountName: "Otp Patty",
		lane: "jungle",
		smurf: false,
		tournament: false,
		data: null
	},
	{
		name: "Adrisasteer",
		accountName: "Mimamamememima",
		lane: "mid",
		smurf: false,
		tournament: false,
		data: null
	},
	{
		name: "Óscar",
		accountName: "Resjer",
		lane: "adc",
		smurf: false,
		tournament: false,
		data: null
	}
];

// Lista de reglas para el soloQChallenge
const normas = [
	"Los participantes que ya tengan la Smurf se verá su nick en <b style='color:green'>color verde</b>.",
	"Los participantes que ya no usen la Smurf se verá su nick en <b style='color:red'>color rojo</b> y estará debajo siempre que los que usen Smurf.",
	"Solo valen las partidas clasificatorias Solo/Duo en modalidad de <b>SoloQ</b>.",
	"El máximo de partidas a jugar durante el tiempo del SoloQChallenger son de <b>150 partidas</b>.",
	"Fecha de inicio y Fin aún no están decididas."
];

export function getPlayers() {
	return players;
}

export function getTournamentPlayers() {
	return players.filter(p => p.tournament);
}

export function getNormas() {
	return normas;
}

