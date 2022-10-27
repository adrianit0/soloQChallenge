
import { getTournamentPlayers } from "./players.js";
import { recuperarInvocador } from "./llamadasAjax.js";

let players = getTournamentPlayers();
let fetchs = [];



function inicializar() {
  players.forEach ( p => {
    recuperarInvocador(p, fetchs);
  });

  const allData = Promise.all(fetchs);
    allData.then((res) => { 
      crearTabla();
      console(players);
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
    "results": [            
      [                     
        //[0, 0], [0, 0], [0, 0], [0, 0]
      ], 
      /*[
        [1, 0], [1, 0]
      ],
      [
        [1, 0]
      ]*/
    ]
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
  return '<img style="vertical-align: middle; height:20px;width:20px;border-radius:30px" src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/' + player.data.profileIconId + '.png"> ' + player.accountName;
}

document.addEventListener("DOMContentLoaded", function(event) { 
    inicializar();
});