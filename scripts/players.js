
import { recuperarJugadoresArena } from "./llamadasAjax.js";

const players = [];

// Lista de reglas para el soloQChallenge
const normas = [

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

