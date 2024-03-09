
import { getPlayers } from "./players.js";
import { recuperarJugadoresArena, recuperarInvocador, seleccionarLigaJugador } from "./llamadasAjax.js";
import { setHeader } from "./header.js";
import { getImgUrl } from "./config.js";
import { setRules } from "./reglamento.js";
import { console, returnValue, translateRank } from './utilidades.js';

// Colecciones
let debug = false;
let fetchs = [];
let players = []; //getPlayers();
let games = [];
let posicion = 1;
// TODO: Cambiar a un valor dinámico para poder crear más torneo tipo Arena
let ID_GAME = 10;
let ID_PRIZES = 11;

// constantes
const UKNOWN_RESULT = " ";
const POSITION_POINTS = [5,3,1,0];

setHeader();

function inicializar() {
  const promise = recuperarJugadoresArena(players, games);

  promise.then((res) => {
    players.forEach ( p => {
      recuperarInvocador(p, fetchs);
    });

    Promise.all(fetchs)
    .then((res) => { 
      inicializarPartidas();
      addAllFilas();
    });
    

    $("#quantityPlayers").text(players.length + " jugadores");
    
    $("#boton-derecho").click(() => {
      $("#boton-izquierdo").removeClass('selected');
      $("#boton-derecho").addClass('selected');
      seleccionarLiga("RANKED_FLEX_SR");
    });

    $("#boton-izquierdo").click(() => {
      $("#boton-derecho").removeClass('selected');
      $("#boton-izquierdo").addClass('selected');
      seleccionarLiga("RANKED_SOLO_5X5");
    });

    $("#boton-normas").click(() => {
        setRules(ID_GAME);
      $("#normas-modal").addClass("is-active");
    });

    $("#boton-premio").click(() => {
      setRules(ID_PRIZES);
      $("#normas-modal").addClass("is-active");
    });

    $("#boton-cerrar-modal, #boton-equis-modal, #fondo-cerrar-modal").click(() => {
      $("#normas-modal").removeClass("is-active");
    })
  });

}

function seleccionarLiga(liga) {
  posicion = 1;
  $("#tablaContenido").children().remove();
  players.forEach ( p => {
    seleccionarLigaJugador(liga, p);
  });

  addAllFilas();
}

function addAllFilas() {
  players = players.sort( (a, b) => {
    return b.data.arenaPoints - a.data.arenaPoints;
  });
  players.forEach ( p => {
    añadirFilaTabla(p);
  });
}

function añadirFilaTabla(player) {
  const baneado = player.banned;
  const games = player.data.arenaGames.length;
  const translatedRank = translateRank(player.data.rankedSelected.tier);
  const posicionMedia = player.data.arenaGames.length == 0 ? "N/A" : Math.round(player.data.arenaGames.reduce((a,b) => a + b, 0) / player.data.arenaGames.length * 100)/100;
  const puntos = player.data.arenaPoints;

  let fila = (baneado ? '<tr class="jugadorBaneado">' : '<tr>') +
                '<td class="sorting_1">' + posicion + '</td>' +
                '<td> ' + player.name + '#' + player.tagLine + ' </td>' +
                '<td>' +
                '  <img style="vertical-align: middle; height:30px;width:30px;border-radius:30px" src="' + getImgUrl(player.data.profileIconId) + '"> ' + player.accountName +
                '</td>' +
                '<td><font>' + games + '</font></td>' +
                '<td>' +
                '  <font>' + posicionMedia + '</font>' +
                '</td>' +
                '<td>' +
                '  <font>' + puntos + '</font>' +
                '</td>' +
                '<td>' +
                '  <b>' +
                '    <a href="https://euw.op.gg/summoner/userName=' + player.accountName + '" target="_blank" style="color:#5383e8;">OP.GG</a>' +
                '    <a href="https://blitz.gg/lol/profile/euw1/' + player.accountName + '" target="_blank" style="color:#5383e8; margin-left: 8px;">BLITZ</a>' +
                '  </b>' +
                '</td>' +
              '</tr>';


  $("#tablaContenido").append(fila);
  posicion ++;
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
