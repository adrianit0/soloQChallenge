
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
      let leagues = data.data.leagueProfile.latestRanks.filter( s => s.queue === "RANKED_SOLO_5X5");
      if (leagues.length > 0) {
        player.data.soloQ = leagues[0];
      } else {
        player.data.soloQ = {
          leaguePoints: 0,
          losses: 0,
          queue: "RANKED_SOLO_5X5",
          rank: "",
          tier: "UNRANKED",
          wins: 0
        };
      }
      
    });

  fetchs.push(fetched);
}

function inicializar() {
  players.forEach ( p => {
    recuperarInvocador(p);
  });

  const allData = Promise.all(fetchs);
  allData.then((res) => { 
    players = players.sort( (a, b) => {
        return returnValue(b.data.soloQ) - returnValue(a.data.soloQ);
    });
    players.forEach ( p => {
      añadirFilaTabla(p);
    });
    console.log(players);
  });

  $("#quantityPlayers").text(players.length + " jugadores")
  
}

function añadirFilaTabla(player) {

  const games = player.data.soloQ.wins + player.data.soloQ.losses;
  const percentaje = Math.round(player.data.soloQ.wins/games*100);
  const translatedRank = translateRank(player.data.soloQ.tier);
  let fila = '<tr class="odd">' +
                '<td class="sorting_1">' + posicion + '</td>' +
                '<td> ' + player.name + ' </td>' +
                '<td>' +
                '  <img style="vertical-align: middle; height:30px;width:30px;border-radius:30px" src=" images/' + player.lane + '_high.png">' +
                '</td>' +
                '<td>' +
                '  <img style="vertical-align: middle; height:30px;width:30px;border-radius:30px" src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/' + player.data.profileIconId + '.png"> ' + player.accountName +
                '</td>' +
                '<td>' +
                '  <img style="vertical-align: middle; height:30px;border-radius:30px" src="images/lol/' + translatedRank + '_' + player.data.soloQ.rank + '.png">' +
                '  <b>' + translatedRank + ' ' + player.data.soloQ.rank + ' </b> (' + player.data.soloQ.leaguePoints + ' LP)' +
                '</td>' +
                '<td>' + games + '</td>' +
                '<td>' +
                '  <font color="green">' + player.data.soloQ.wins + '</font>' +
                '</td>' +
                '<td>' +
                '  <font color="red">' + player.data.soloQ.losses + '</font>' +
                '</td>' +
                '<td>' + percentaje + '%</td>' +
                '<td>' +
                '  <b>' +
                '    <a href="https://euw.op.gg/summoner/userName=' + player.accountName + '" target="_blank" style="color:#5383e8;">OP.GG</a>' +
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
    points += 6000;
  if (tier === "PLATINUM")
    points += 5000;
  if (tier === "GOLD")
    points += 4000;
  if (tier === "SILVER")
    points += 3000;
  if (tier === "BRONZE")
    points += 2000;
  if (tier === "IRON")
    points += 1000;

  if (tier === "I")
    points += 401;
  if (tier === "II")
    points += 301;
  if (tier === "III")
    points += 201;
  if (tier === "IV")
    points += 101;

  points += soloQData.leaguePoints;

  return points;
}

// recuperarInvocador("IWS Piña");

document.addEventListener("DOMContentLoaded", function(event) { 
    inicializar();
});