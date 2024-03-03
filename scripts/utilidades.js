
  let debug = false;

  export function translateRank(rank) {
    if (rank === "DIAMOND")
      return "Diamante";
    if (rank === "EMERALD")
      return "Esmeralda";
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

  export function translateRankImg(rank) {
      var root = "Rank=";
      if (rank === "DIAMOND")
        return root + "Diamond.png";
      if (rank === "EMERALD")
        return root + "Emerald.png";
      if (rank === "PLATINUM")
        return root + "Platinum.png";
      if (rank === "GOLD")
        return root + "Gold.png";
      if (rank === "SILVER")
        return root + "Silver.png";
      if (rank === "BRONZE")
        return root + "Bronze.png";
      if (rank === "IRON")
        return root + "Iron.png";
      return "Unranked_.png";
    }
  
  export function returnValue(soloQData, player) {
    let points = 0;
    let tier = soloQData.tier;
    let rank = soloQData.rank;
  
    if (player.smurf) {
      points += 1000000;
    }
  
    if (tier === "DIAMOND")
      points += 700000;
    if (tier === "EMERALD")
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
  
    if (rank === "I")
      points += 40100;
    if (rank === "II")
      points += 30100;
    if (rank === "III")
      points += 20100;
    if (rank === "IV")
      points += 10100;
  
    points += soloQData.leaguePoints * 100;
  
    points += soloQData.wins /10000;
  
    return points;
  }
  
  export function console (text) {
    if (debug)
      console.log(text);
  }