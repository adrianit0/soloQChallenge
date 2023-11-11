import { getPlayerSoloQChallengeList, getPlayerDuoQChallengeList } from "./playerList.js";

const traerDelServer = true;

export function recuperarJugadoresSoloQChallenge (players) {
  let promise = null;
  if (!traerDelServer) {
    promise = new Promise(function(resolve, reject) {
      resolve(getPlayerSoloQChallengeList());
    });
  } else {
    promise = fetch("https://api.npoint.io/158f7490c25f188a79b0")
      .then((response) => response.json());
  }

  return promise.then((data) => { 
    players.push(...data);  
  });
}

export function recuperarJugadoresDuoQChallenge (teams) {
  let promise = null;
  if (!traerDelServer) {
    promise = new Promise(function(resolve, reject) {
      resolve(getPlayerDuoQChallengeList());
    });
  } else {
    promise = fetch("https://api.npoint.io/77399165a3f18a6e3124")
      .then((response) => response.json());
  }

  return promise.then((data) => { 
    teams.push(...data);  
  });
}

export function recuperarJugadoresTorneo (players) {
  return fetch("https://api.npoint.io/85437d797df802828617")
    .then((response) => response.json())
    .then((data) => { 
      players.push(...(data.filter(p => p.tournament)));
  });
}

export function recuperarJugadoresArena (players) {
  return fetch("https://api.npoint.io/a44dd97067152540c004")
    .then((response) => response.json())
    .then((data) => {
      players.push(...(data.filter(p => p.tournament)));
  });
}

// https://www.npoint.io/docs/33d24f20fa5d5c90d65b
export function recuperarPosicionesTorneo (resultado) {
  return fetch("https://api.npoint.io/33d24f20fa5d5c90d65b")
    .then((response) => response.json())
    .then((data) => { 
      resultado.push(...data);
  });
}

export function recuperarInvocador (player, fetchs) {
  //const fetched = fetch("https://riot.iesdev.com/graphql?query=query%20LeagueProfile%28%24summoner_name%3AString%2C%24summoner_id%3AString%2C%24account_id%3AString%2C%24region%3ARegion%21%2C%24puuid%3AString%29%7BleagueProfile%28summoner_name%3A%24summoner_name%2Csummoner_id%3A%24summoner_id%2Caccount_id%3A%24account_id%2Cregion%3A%24region%2Cpuuid%3A%24puuid%29%7Bid%20accountId%20puuid%20summonerId%20summonerName%20summonerLevel%20profileIconId%20updatedAt%20latestRanks%7Bqueue%20tier%20rank%20wins%20losses%20leaguePoints%20insertedAt%7D%7D%7D&variables=%7B%22summoner_name%22%3A%22" + player.accountName + "%22%2C%22region%22%3A%22EUW1%22%7D")
  const fetched = fetch("https://riot.iesdev.com/graphql?query=query+LeagueProfile%28%24summoner_name%3AString+%24summoner_id%3AString+%24account_id%3AString+%24region%3ARegion%21+%24puuid%3AString%29%7BleagueProfile%28summoner_name%3A%24summoner_name+summoner_id%3A%24summoner_id+account_id%3A%24account_id+region%3A%24region+puuid%3A%24puuid%29%7Branks%28first%3A30%29%7Bqueue+tier+rank+wins+losses+leaguePoints+insertedAt%7Did+accountId+puuid+summonerId+summonerName+summonerLevel+profileIconId+updatedAt+latestRanks%7Bqueue+tier+rank+wins+losses+leaguePoints+insertedAt%7D%7D%7D&variables=%7B%22summoner_name%22%3A%22" + player.accountName + "%22%2C%22region%22%3A%22EUW1%22%7D")
    .then((response) => response.json())
    .then((data) => { 
      player.data = data.data.leagueProfile;
      seleccionarLigaJugador("RANKED_SOLO_5X5", player);
  });

  fetchs.push(fetched);
}

export function seleccionarLigaJugador(liga, player) {
  let noEncontrado = false;
  if (!player.data || !player.data.latestRanks || player.notFound) {
    player.data = {};
    player.notFound = true;
  } else {
    let leagues = player.data.latestRanks.filter( s => s.queue === liga);
    if (leagues.length > 0) {
      player.data.rankedSelected = leagues[0];
    } else {
      player.notFound = true;
    }
  }
  if (player.notFound) {
    player.notFound = false;
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

export function seleccionarLigaTeam(liga, team) {
  seleccionarLigaJugador(liga, team.player1);
  seleccionarLigaJugador(liga, team.player2);
}
