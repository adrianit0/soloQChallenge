
import { getPlayers } from "./players.js";

// Colecciones
let fetchs = [];
let players = getPlayers();
let posicion = 1;

function recuperarInvocador (player) {
  const fetched = fetch("https://riot.iesdev.com/graphql?query=query%20LeagueProfile%28%24summoner_name%3AString%2C%24summoner_id%3AString%2C%24account_id%3AString%2C%24region%3ARegion%21%2C%24puuid%3AString%29%7BleagueProfile%28summoner_name%3A%24summoner_name%2Csummoner_id%3A%24summoner_id%2Caccount_id%3A%24account_id%2Cregion%3A%24region%2Cpuuid%3A%24puuid%29%7Bid%20accountId%20puuid%20summonerId%20summonerName%20summonerLevel%20profileIconId%20updatedAt%20latestRanks%7Bqueue%20tier%20rank%20wins%20losses%20leaguePoints%20insertedAt%7D%7D%7D&variables=%7B%22summoner_name%22%3A%22" + player.accountName + "%22%2C%22region%22%3A%22EUW1%22%7D")
    .then((response) => response.json())
    .then((data) => { 
      player.data = data.data.leagueProfile;
      seleccionarLigaJugador("RANKED_SOLO_5X5", player);
  });

  fetchs.push(fetched);
}

function seleccionarLigaJugador(liga, player) {
  let leagues = player.data.latestRanks.filter( s => s.queue === liga);
  if (leagues.length > 0) {
    player.data.rankedSelected = leagues[0];
  } else {
    player.data.rankedSelected = {
      leaguePoints: 0,
      losses: 0,
      queue: liga,
      rank: "",
      tier: "UNRANKED",
      wins: 0
    };
  }
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
    return returnValue(b.data.rankedSelected) - returnValue(a.data.rankedSelected);
  });
  players.forEach ( p => {
    añadirFilaTabla(p);
  });
}

function inicializar() {
  players.forEach ( p => {
    recuperarInvocador(p);
  });

  const allData = Promise.all(fetchs);
  allData.then((res) => { 
    addAllFilas();
    console.log(players);
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
}

function añadirFilaTabla(player) {

  const games = player.data.rankedSelected.wins + player.data.rankedSelected.losses;
  const percentaje = Math.round(player.data.rankedSelected.wins/games*100);
  const translatedRank = translateRank(player.data.rankedSelected.tier);
  let fila = '<tr>' +
                '<td class="sorting_1">' + posicion + '</td>' +
                '<td> ' + player.name + ' </td>' +
                '<td>' +
                '  <img style="vertical-align: middle; height:30px;width:30px;border-radius:30px" src=" images/' + player.lane + '_high.png">' +
                '</td>' +
                '<td>' +
                '  <img style="vertical-align: middle; height:30px;width:30px;border-radius:30px" src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/' + player.data.profileIconId + '.png"> ' + player.accountName +
                '</td>' +
                '<td>' +
                '  <img style="vertical-align: middle; height:30px;border-radius:30px" src="images/lol/' + translatedRank + '_' + player.data.rankedSelected.rank + '.png">' +
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

function translateRank(rank) {
  if (rank === "DIAMOND")
    return "Diamante";
  if (rank === "PLATINUM")
    return "Platino";
  if (rank === "GOLD")
    return "Oro";
  if (rank === "SILVER")
    return "Plata";
  if (rank === "BRONZE")
    return "Bronce";
  if (rank === "IRON")
    return "Hierro";
  return "Unranked";
}

function returnValue(soloQData) {
  let points = 0;
  let tier = soloQData.tier;
  let rank = soloQData.rank;

  if (tier === "DIAMOND")
    points += 600000;
  if (tier === "PLATINUM")
    points += 500000;
  if (tier === "GOLD")
    points += 400000;
  if (tier === "SILVER")
    points += 300000;
  if (tier === "BRONZE")
    points += 200000;
  if (tier === "IRON")
    points += 100000;

  if (tier === "I")
    points += 40100;
  if (tier === "II")
    points += 30100;
  if (tier === "III")
    points += 20100;
  if (tier === "IV")
    points += 10100;

  points += soloQData.leaguePoints * 100;

  points += soloQData.wins /100;

  return points;
}

// recuperarInvocador("IWS Piña");

document.addEventListener("DOMContentLoaded", function(event) { 
    inicializar();
});