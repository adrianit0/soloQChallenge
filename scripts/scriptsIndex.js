
import { recuperarTorneos } from "./llamadasAjax.js";
import { setHeader } from "./header.js";
import { console, returnValue, translateRank } from './utilidades.js';

// Colecciones
let debug = false;
let fetchs = [];
let tournaments = [];

setHeader();

function inicializar() {
  recuperarTorneos().then((tournaments) => {
       crearTorneos(tournaments);
  });
}

function crearTorneos(torneos) {
    console("XD");
}

function inicializarPartidas() {
  games.forEach ( g => {
    crearPartida(g);
  });
}

function crearPartida(game) {

  let nombrePartida = "Partida " + game.id;

  const titulo = $('<label class="labelPartido">' + nombrePartida + '</label>');
  let bodyPartida = null;

  if (!game.blocked) {
    bodyPartida = $('<div class="arena-game-card"></div>');

    for (let i = 0; i < game.players.length; i++) {
      const player1Id = parseInt(game.players[i][0])-1;
      const player2Id = parseInt(game.players[i][1])-1;

      const jugador1 = players[player1Id];
      const jugador2 = players[player2Id];

      const baneado = jugador1.banned || jugador2.banned;

      const resultado = game.result[i] == 0 ? UKNOWN_RESULT : game.result[i];
      let claseResultado = "unknown";


      if (baneado) {
        claseResultado = "banned";
      } else if (resultado == 1) {
        claseResultado = "first";
      } else if (resultado == 2) {
        claseResultado = "second";
      } else if (resultado == 3) {
        claseResultado = "third";
      } else if (resultado == 4) {
        claseResultado = "fourth";
      }

      let puntosObtenidos = '';
      if (!baneado  && resultado != UKNOWN_RESULT && POSITION_POINTS[resultado-1]>0) {
        puntosObtenidos = '<span class="labelPuntuacion"> (+' + POSITION_POINTS[resultado-1] + ') </span>'
      }

      const stylePlayer1 = "player_" + player1Id;
      const stylePlayer2 = "player_" + player2Id;

      const bodyEquipo = $('<div class="arena-team-card ' + claseResultado + '"></div>');
      const bodyEquipo1 = $('<div class="arena-player-card-left ' + claseResultado + ' '+ stylePlayer1 +'">' + jugador1.name + puntosObtenidos + '</div>');
      const bodyResult = $('<div class="arena-result-card ' + claseResultado + '"> <span>' + resultado + '</span> </div>');
      const bodyEquipo2 = $('<div class="arena-player-card-right ' + claseResultado + ' ' + stylePlayer2 + '">' + jugador2.name + puntosObtenidos + '</div>');

      if (!baneado && resultado != UKNOWN_RESULT) {
        jugador1.data.arenaGames.push(resultado);
        jugador2.data.arenaGames.push(resultado);

        jugador1.data.arenaPoints += POSITION_POINTS[resultado-1];
        jugador2.data.arenaPoints += POSITION_POINTS[resultado-1];
      }

      bodyEquipo.append(bodyEquipo1);
      bodyEquipo.append(bodyResult);
      bodyEquipo.append(bodyEquipo2);
      bodyPartida.append(bodyEquipo);

      bodyEquipo1.hover(function() {
        $('.' + stylePlayer1).css('background-color', '#171d2f');
      }, function() {
        // on mouseout, reset the background colour
        $('.' + stylePlayer1).css('background-color', 'transparent');
      });

      bodyEquipo2.hover(function() {
        $('.' + stylePlayer2).css('background-color', '#171d2f');
      }, function() {
        // on mouseout, reset the background colour
        $('.' + stylePlayer2).css('background-color', 'transparent');
      });
    }
  } else {
    bodyPartida = $('<div class="arena-game-blocked-card"> <div class="arena-team-blocked-card-left"> </div> <div class="arena-team-blocked-card-right"></div>  <div class="arena-team-blocked-card-center"><i class="fa fa-lock"></i></div> </div>');
  }

  $("#contenedorPartidas").append(titulo);
  $("#contenedorPartidas").append(bodyPartida);
}

document.addEventListener("DOMContentLoaded", function(event) {
    inicializar();
});
