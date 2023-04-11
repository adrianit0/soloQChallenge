
import { getPlayers } from "./playersDuoQChallenge.js";
import { recuperarJugadoresDuoQChallenge, recuperarInvocador, seleccionarLigaTeam } from "./llamadasAjax.js";
import { setHeader } from "./header.js";
import { getImgUrl } from "./config.js";
import { console, returnValue, translateRank } from './utilidades.js';

// Colecciones
let fetchs = [];
let teams = getPlayers();
let posicion = 1;

setHeader();

function seleccionarLiga(liga) {
  posicion = 1;
  $("#tablaContenido").children().remove();
  teams.forEach ( p => {
    seleccionarLigaTeam(liga, p);
  });

  addAllFilas();
}

function addAllFilas() {
  teams = teams.sort( (a, b) => {
    return Math.max(returnValue(b.player1.data.rankedSelected, b), returnValue(b.player2.data.rankedSelected, b)) - 
           Math.max(returnValue(a.player1.data.rankedSelected, a), returnValue(a.player2.data.rankedSelected, a));
  });
  teams.forEach ( p => {
    añadirFilaTabla(p);
  });
}

function inicializar() {
  const promise = recuperarJugadoresDuoQChallenge(teams);

  promise.then((res) => {
    teams.forEach ( t => {
      recuperarInvocador(t.player1, fetchs);
      recuperarInvocador(t.player2, fetchs);
    });

    const allData = Promise.all(fetchs);
    allData.then((res) => { 
      addAllFilas();
      console(teams);
    });

    $("#quantityTeams").text((teams.length) + " equipos");
    $("#quantityPlayers").text((teams.length*2) + " jugadores");
    
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

function añadirFilaTabla(team) {

  const player1 = team.player1;
  const player2 = team.player2;

  const games = player1.data.rankedSelected.wins + player1.data.rankedSelected.losses;
  const percentaje = games === 0 ? 0 : Math.round(player1.data.rankedSelected.wins/games*100);
  const translatedRank = translateRank(player1.data.rankedSelected.tier);
  const smurf = player1.smurf ? "high" : "low";
  const smurfText = player1.smurf ? "Es una cuenta Smurf" : "No es una cuenta Smurf";

  const games2 = player2.data.rankedSelected.wins + player2.data.rankedSelected.losses;
  const percentaje2 = games2 === 0 ? 0 : Math.round(player2.data.rankedSelected.wins/games2*100);
  const translatedRank2 = translateRank(player2.data.rankedSelected.tier);
  const smurf2 = player2.smurf ? "high" : "low";
  const smurfText2 = player2.smurf ? "Es una cuenta Smurf" : "No es una cuenta Smurf";

  let fila = '<tr>' +
                '<td class="sorting_1 teamColumn">' + posicion + '</td>' +
                '<td class="teamColumn"> ' + team.name + ' </td>' +
                  '<td> ' + player1.name + ' </td>' +
                  '<td>' +
                  '  <img title="' + smurfText + '" style="vertical-align: middle; height:30px;width:30px;border-radius:30px" src=" images/' + player1.lane + '_' + smurf + '.png">' +
                  '</td>' +
                  '<td>' +
                  '  <img style="vertical-align: middle; height:30px;width:30px;border-radius:30px" src="' + getImgUrl(player1.data.profileIconId) + '"> ' + player1.accountName +
                  '</td>' +
                  '<td>' +
                  '  <img style="vertical-align: middle; height:30px;border-radius:30px" src="images/lol/' + translatedRank + '_' + player1.data.rankedSelected.rank + '.png">' +
                  '  <b>' + translatedRank + ' ' + player1.data.rankedSelected.rank + ' </b> (' + player1.data.rankedSelected.leaguePoints + ' LP)' +
                  '</td>' +
                  '<td>' + games + '</td>' +
                  '<td>' +
                  '  <font color="green">' + player1.data.rankedSelected.wins + '</font>' +
                  '</td>' +
                  '<td>' +
                  '  <font color="red">' + player1.data.rankedSelected.losses + '</font>' +
                  '</td>' +
                  '<td>' + percentaje + '%</td>' +
                  '<td>' +
                  '  <b>' +
                  '    <a href="https://euw.op.gg/summoner/userName=' + player1.accountName + '" target="_blank" style="color:#5383e8;">OP.GG</a>' +
                  '    <a href="https://blitz.gg/lol/profile/euw1/' + player1.accountName + '" target="_blank" style="color:#5383e8; margin-left: 8px;">BLITZ</a>' +
                  '  </b>' +
                  '</td>' +

              '</tr><tr>' +
              '<td class="sorting_1"></td>' +
                '<td>  </td>' +

                  '<td> ' + player2.name + ' </td>' +
                  '<td>' +
                  '  <img title="' + smurfText2 + '" style="vertical-align: middle; height:30px;width:30px;border-radius:30px" src=" images/' + player2.lane + '_' + smurf2 + '.png">' +
                  '</td>' +
                  '<td>' +
                  '  <img style="vertical-align: middle; height:30px;width:30px;border-radius:30px" src="' + getImgUrl(player2.data.profileIconId) + '"> ' + player2.accountName +
                  '</td>' +
                  '<td>' +
                  '  <img style="vertical-align: middle; height:30px;border-radius:30px" src="images/lol/' + translatedRank2 + '_' + player2.data.rankedSelected.rank + '.png">' +
                  '  <b>' + translatedRank2 + ' ' + player2.data.rankedSelected.rank + ' </b> (' + player2.data.rankedSelected.leaguePoints + ' LP)' +
                  '</td>' +
                  '<td>' + games2 + '</td>' +
                  '<td>' +
                  '  <font color="green">' + player2.data.rankedSelected.wins + '</font>' +
                  '</td>' +
                  '<td>' +
                  '  <font color="red">' + player2.data.rankedSelected.losses + '</font>' +
                  '</td>' +
                  '<td>' + percentaje2 + '%</td>' +
                  '<td>' +
                  '  <b>' +
                  '    <a href="https://euw.op.gg/summoner/userName=' + player2.accountName + '" target="_blank" style="color:#5383e8;">OP.GG</a>' +
                  '    <a href="https://blitz.gg/lol/profile/euw1/' + player2.accountName + '" target="_blank" style="color:#5383e8; margin-left: 8px;">BLITZ</a>' +
                  '  </b>' +
                  '</td>' +
              '</tr>';


  $("#tablaContenido").append(fila);
  posicion ++;
}

document.addEventListener("DOMContentLoaded", function(event) { 
    inicializar();
});
