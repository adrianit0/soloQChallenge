
import { getPlayers } from "./players.js";
import { recuperarJugadoresSoloQChallenge, recuperarInvocador, seleccionarLigaJugador } from "./llamadasAjax.js";
import { setHeader } from "./header.js";
import { getImgUrl } from "./config.js";
import { console, returnValue, translateRank, translateRankImg } from './utilidades.js';

// Colecciones
let debug = false;
let fetchs = [];
let players = getPlayers();
let posicion = 1;

setHeader();

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
    return returnValue(b.data.rankedSelected, b) - returnValue(a.data.rankedSelected, a);
  });
  players.forEach ( p => {
    añadirFilaTabla(p);
  });
}

function inicializar() {
  const promise = recuperarJugadoresSoloQChallenge(players);

  promise.then((res) => {
    players.forEach ( p => {
      recuperarInvocador(p, fetchs);
    });

    const allData = Promise.all(fetchs);
    allData.then((res) => { 
      addAllFilas();
      console(players);
    });

    $("#quantityPlayers").text(players.length + " jugadores")
    
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
      $("#normas-modal").addClass("is-active");
    });

    $("#boton-cerrar-modal, #boton-equis-modal, #fondo-cerrar-modal").click(() => {
      $("#normas-modal").removeClass("is-active");
    })
  });

}

function añadirFilaTabla(player) {

  const games = player.data.rankedSelected.wins + player.data.rankedSelected.losses;
  const percentaje = games === 0 ? 0 : Math.round(player.data.rankedSelected.wins/games*100);
  const translatedRank = translateRank(player.data.rankedSelected.tier);
  const imgRank = translateRankImg(player.data.rankedSelected.tier);
  const smurf = player.smurf ? "high" : "low";
  const smurfText = player.smurf ? "Es una cuenta Smurf" : "No es una cuenta Smurf";
  let fila = '<tr>' +
                '<td class="sorting_1">' + posicion + '</td>' +
                '<td> ' + player.name + ' </td>' +
                '<td>' +
                '  <img title="' + smurfText + '" style="vertical-align: middle; height:30px;width:30px;border-radius:30px" src=" images/' + player.lane + '_' + smurf + '.png">' +
                '</td>' +
                '<td>' +
                '  <img style="vertical-align: middle; height:30px;width:30px;border-radius:30px" src="' + getImgUrl(player.data.profileIconId) + '"> ' + player.accountName +
                '</td>' +
                '<td>' +
                '  <img style="vertical-align: middle; height:30px;border-radius:30px" src="images/lol/' + imgRank + '">' +
                '  <b>' + translatedRank + ' ' + player.data.rankedSelected.rank + ' </b> (' + player.data.rankedSelected.leaguePoints + ' LP)' +
                '</td>' +
                '<td>' + games + '</td>' +
                '<td>' +
                '  <font color="green">' + player.data.rankedSelected.wins + '</font>' +
                '</td>' +
                '<td>' +
                '  <font color="red">' + player.data.rankedSelected.losses + '</font>' +
                '</td>' +
                '<td>' + percentaje + '%</td>' +
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

document.addEventListener("DOMContentLoaded", function(event) { 
    inicializar();
});
