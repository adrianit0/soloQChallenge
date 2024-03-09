import { getPlayerSoloQChallengeList, getPlayerDuoQChallengeList } from "./playerList.js";

const traerDelServer = true;
const traerDeBlitz = true;

export function recuperarTorneos () {
    return fetch("https://api.npoint.io/542223354cbc75d05d11");
}

export function recuperarJugadoresSoloQChallenge (players) {
  let promise = null;
  if (!traerDelServer) {
    promise = new Promise(function(resolve, reject) {
      resolve(getPlayerSoloQChallengeList());
    });
  } else {
    promise = fetch("https://api.npoint.io/f5752e1372094794278c")
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

export function recuperarJugadoresArena (players, games) {
  return fetch("https://api.npoint.io/a44dd97067152540c004")
    .then((response) => response.json())
    .then((data) => {
      players.push(...(data.players.filter(p => p.visible == null || p.visible)));
      games.push(...(data.games.filter(p => p.visible == null || p.visible)))
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

export function recuperarDatosInvocador(player, fetchs) {
    if (traerDeBlitz) {
        recuperarInvocador(player, fetchs);
    } else {
        recuperarInvocadorMobalytics(player, fetchs);
    }
}

export function recuperarInvocador (player, fetchs) {
  //const fetched = fetch("https://riot.iesdev.com/graphql?query=query%20LeagueProfile%28%24summoner_name%3AString%2C%24summoner_id%3AString%2C%24account_id%3AString%2C%24region%3ARegion%21%2C%24puuid%3AString%29%7BleagueProfile%28summoner_name%3A%24summoner_name%2Csummoner_id%3A%24summoner_id%2Caccount_id%3A%24account_id%2Cregion%3A%24region%2Cpuuid%3A%24puuid%29%7Bid%20accountId%20puuid%20summonerId%20summonerName%20summonerLevel%20profileIconId%20updatedAt%20latestRanks%7Bqueue%20tier%20rank%20wins%20losses%20leaguePoints%20insertedAt%7D%7D%7D&variables=%7B%22summoner_name%22%3A%22" + player.accountName + "%22%2C%22region%22%3A%22EUW1%22%7D")
  //const fetched = fetch("https://riot.iesdev.com/graphql?query=query+LeagueProfile%28%24summoner_name%3AString+%24summoner_id%3AString+%24account_id%3AString+%24region%3ARegion%21+%24puuid%3AString%29%7BleagueProfile%28summoner_name%3A%24summoner_name+summoner_id%3A%24summoner_id+account_id%3A%24account_id+region%3A%24region+puuid%3A%24puuid%29%7Branks%28first%3A30%29%7Bqueue+tier+rank+wins+losses+leaguePoints+insertedAt%7Did+accountId+puuid+summonerId+summonerName+summonerLevel+profileIconId+updatedAt+latestRanks%7Bqueue+tier+rank+wins+losses+leaguePoints+insertedAt%7D%7D%7D&variables=%7B%22summoner_name%22%3A%22" + player.accountName + "%22%2C%22summoner_tag%22%3A%22" + player.tagLine + "%22%2C%22region%22%3A%22EUW1%22%7D")

  if (player.result) {
       seleccionarLigaJugador("RANKED_SOLO_5X5", player);
       return;
  }
  const fetched = fetch("https://riot.iesdev.com/graphql?query=query+LeagueProfile%28%24summoner_name%3AString+%24summoner_id%3AString+%24account_id%3AString+%24region%3ARegion%21+%24puuid%3AString+%24gameName%3AString+%24tagLine%3AString%29%7BleagueProfile%28summoner_name%3A%24summoner_name+summoner_id%3A%24summoner_id+account_id%3A%24account_id+region%3A%24region+puuid%3A%24puuid+gameName%3A%24gameName+tagLine%3A%24tagLine%29%7Branks%28first%3A30%29%7Bqueue+tier+rank+wins+losses+leaguePoints+insertedAt%7Did+accountId+puuid+summonerId+summonerName+summonerLevel+profileIconId+riotAccount%7Bid+puuid+gameName+tagLine%7DupdatedAt+latestRanks%7Bqueue+tier+rank+wins+losses+leaguePoints+insertedAt%7D%7D%7D&variables=%7B%22region%22%3A%22EUW1%22%2C%22gameName%22%3A%22" + player.accountName + "%22%2C%22tagLine%22%3A%22" + player.tagLine + "%22%7D")
    .then((response) => response.json())
    .then((data) => { 
      player.data = data.data.leagueProfile;
      seleccionarLigaJugador("RANKED_SOLO_5X5", player);
  });

  fetchs.push(fetched);
}

export function recuperarInvocadorMobalytics (player, fetchs) {
    if (player.result) {
       seleccionarLigaJugador("RANKED_SOLO_5X5", player);
       return;
    }

    const url = "https://mobalytics.gg/api/lol/graphql/v1/query";
    const body = '{"operationName":"LolProfilePageSummonerInfoQuery","variables":{"gameName":"' + player.accountName + '","tagLine":"' + player.tagLine + '","region":"EUW","sQueue":null,"sRole":null,"sChampion":null},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"69fd82d266137c011d209634e4b09ab5a8c66d415a19676c06aa90b1ba7632fe"}}}';
    const fetched = fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: body // body data type must match "Content-Type" header
    })
    .then((response) => response.json())
    .then((data) => traerDeBlitz ? convertirBlitzALeagueProfile(data) : convertirMobalyticsALeagueProfile(data))
    .then((data) => {
          player.data = data;
          seleccionarLigaJugador("RANKED_SOLO_5X5", player);
      });

    fetchs.push(fetched);
}

function convertirBlitzALeagueProfile(data) {
    let leagues = data.latestRanks.filter( s => s.queue === "RANKED_SOLO_5X5");
    if (leagues.length > 0) {
      data.rankedSelected = leagues[0];
    }

    data = data.data.leagueProfile;
    return data;
}

function convertirMobalyticsALeagueProfile(data) {
    const playerInfo = data.data.lol.player;
    const rankedInfo = playerInfo != null && playerInfo.queuesStats.items != null && playerInfo.queuesStats.items.length > 0
     ? playerInfo.queuesStats.items[0] :
        {wins: 0, losses: 0, lp: 0, rank: { tier: 'UNRANKED' }};
    const playerData = {
        leaguePoints: rankedInfo.lp,
        queue: "RANKED_SOLO_5X5",
        rank: rankedInfo.rank.division != null ? rankedInfo.rank.division : "",
        tier: rankedInfo.rank.tier,
        wins: rankedInfo.wins,
        losses: rankedInfo.losses
     };
    const dataProfile = {
        profileIconId : playerInfo == null ? 1 : playerInfo.icon,
        rankedSelected: playerData
    };

    return dataProfile;
}


export function seleccionarLigaJugador(liga, player) {
  let noEncontrado = false;
  if (player.result) {
      player.data = { profileIconId : 907, rankedSelected: player.result};
  } else if (!player.data || !player.data.rankedSelected || player.notFound) {
    if (player.data != null && player.data.latestRanks) {
        let leagues = player.data.latestRanks.filter( s => s.queue === liga);
        if (leagues.length > 0) {
          player.data.rankedSelected = leagues[0];
        } else {
          player.notFound = true;
        }
    } else {
        player.data = {};
        player.notFound = true;
    }

  } else {

  }
  if (player.notFound) {
    player.notFound = false;
    player.data.rankedSelected = {
      leaguePoints: 0,
      queue: liga,
      rank: "",
      tier: "UNRANKED",
      wins: 0,
      losses: 0
    };
  }

  player.data.arenaGames = [];
  player.data.arenaPoints = 0;
}

export function seleccionarLigaTeam(liga, team) {
  seleccionarLigaJugador(liga, team.player1);
  seleccionarLigaJugador(liga, team.player2);
}
