
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
let posicion = 1;
// TODO: Cambiar a un valor dinámico para poder crear más torneo tipo Arena
let ID_GAME = 10;
let ID_PRIZES = 11;

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
  const promise = recuperarJugadoresArena(players);

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

function añadirFilaTabla(player) {

  const games = 0;
  const translatedRank = translateRank(player.data.rankedSelected.tier);
  const posicionMedia = "N/A";
  const puntos = 0;

  let fila = '<tr>' +
                '<td class="sorting_1">' + posicion + '</td>' +
                '<td> ' + player.name + ' </td>' +
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

document.addEventListener("DOMContentLoaded", function(event) { 
    inicializar();
});
