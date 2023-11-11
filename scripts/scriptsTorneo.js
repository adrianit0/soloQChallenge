
import { getTournamentPlayers } from "./players.js";
import { recuperarJugadoresTorneo, recuperarPosicionesTorneo, recuperarInvocador } from "./llamadasAjax.js";
import { getImgUrl } from "./config.js";
import { setHeader } from "./header.js";

let players = [];
let fetchs = [];
let results = [];

setHeader();

function inicializar() {
  const promise = recuperarJugadoresTorneo(players);
  const promise2 = recuperarPosicionesTorneo(results);

  Promise.all([promise, promise2]).then((res) => {
    players.forEach ( p => {
      recuperarInvocador(p, fetchs);
    });

    const allData = Promise.all(fetchs);
    allData.then((res) => { 
       crearTabla();
    });
  });
}

function crearTabla() {
  var singleElimination = {
    "teams": [              
      [recoverPlayer(0), recoverPlayer(1)],
      [recoverPlayer(2), recoverPlayer(3)],
      [recoverPlayer(4), recoverPlayer(5)],
      [recoverPlayer(6), recoverPlayer(7)],
    ],
    "results": results
  };

  $('.torneo').bracket({
    init: singleElimination,
    teamWidth: 250, // number
    //scoreWidth: '', // number
    roundMargin: 10, // number
    //matchMargin: '', // number
    skipConsolationRound: true,
  });
}

function recoverPlayer (id) {
  let player = players[id];
  return '<img style="vertical-align: middle; height:20px;width:20px;border-radius:30px" src=" ' + getImgUrl(player.data.profileIconId) + ' "> ' + player.accountName;
}

document.addEventListener("DOMContentLoaded", function(event) { 
    inicializar();
});