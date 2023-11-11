
import { recuperarJugadoresDuoQChallenge } from "./llamadasAjax.js";

const players = [];

//recuperarJugadoresDuoQChallenge(players);

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

export function getNormas() {
	return normas;
}

