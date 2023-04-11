const playersList = [
    {
      "name": "Manuel",
      "accountName": "LapusheaSion",
      "lane": "top",
      "smurf": true,
      "tournament": true,
      "data": null
    },
    {
      "name": "Enrique",
      "accountName": "Aceessienas",
      "lane": "mid",
      "smurf": true,
      "tournament": true,
      "data": null
    },
    {
      "name": "Piña",
      "accountName": "Zileano",
      "lane": "support",
      "smurf": true,
      "tournament": true,
      "data": null
    },
    {
      "name": "Joni",
      "accountName": "Aillmarudr",
      "lane": "top",
      "smurf": true,
      "tournament": true,
      "data": null
    },
    {
      "name": "Lechón",
      "accountName": "Aicatiand",
      "lane": "support",
      "smurf": true,
      "tournament": true,
      "data": null
    },
    {
      "name": "Guille",
      "accountName": "El chico macro",
      "lane": "jungle",
      "smurf": true,
      "tournament": true,
      "data": null
    },
    {
      "name": "Lobitoh",
      "accountName": "FOX Lobitoh",
      "lane": "top",
      "smurf": false,
      "tournament": true,
      "data": null
    },
   
    {
      "name": "Kike",
      "accountName": "Aikoylava",
      "lane": "adc",
      "smurf": true,
      "tournament": true,
      "data": null
    },
    
    {
      "name": "Raul",
      "accountName": "The JabaQ Method",
      "lane": "jungle",
      "smurf": true,
      "tournament": false,
      "data": null
    },
    
    {
      "name": "Adri",
      "accountName": "Tengo Zed",
      "lane": "mid",
      "smurf": true,
      "tournament": false,
      "data": null
    },
    
    {
      "name": "Musha2",
      "accountName": "Azuk1tu Fanboy",
      "lane": "support",
      "smurf": true,
      "tournament": false,
      "data": null
    },
  ];

const duoQChallengePlayers = [
    {
        name: "TOPocho",
        player1: {
            "name": "Manue",
            "accountName": "Toy sin viSion",
            "lane": "top",
            "smurf": true,
            "tournament": false,
            "data": null
          },
        
        player2: {
            "name": "Kike",
            "accountName": "Zallorisey",
            "lane": "adc",
            "smurf": true,
            "tournament": false,
            "data": null
          },
    },
    {
      name: "El mejor y el peor juntos",
      player1: {
          "name": "Joni",
          "accountName": "El Mago Wisin",
          "lane": "top",
          "smurf": true,
          "tournament": false,
          "data": null
        },
      
      player2: {
          "name": "Lechon",
          "accountName": "Capitan Yandel",
          "lane": "support",
          "smurf": true,
          "tournament": false,
          "data": null
        },
    },
    {
      name: "Team Tilteo",
      player1: {
          "name": "Enrique",
          "accountName": "FOX Lobitoh",
          "lane": "mid",
          "smurf": true,
          "tournament": false,
          "data": null
        },
      
      player2: {
          "name": "Calvo",
          "accountName": "FOX Lobitoh",
          "lane": "mid",
          "smurf": true,
          "tournament": false,
          "data": null
        },
    },
    {
      name: "Carritos desde la Top",
      player1: {
          "name": "Guille",
          "accountName": "FOX Lobitoh",
          "lane": "jungle",
          "smurf": true,
          "tournament": false,
          "data": null
        },
      
      player2: {
          "name": "Fran",
          "accountName": "FOX Lobitoh",
          "lane": "top",
          "smurf": true,
          "tournament": false,
          "data": null
        },
    },
    {
      name: "Posiblemente los ultimos",
      player1: {
          "name": "Mario",
          "accountName": "pqbvsja",
          "lane": "jungle",
          "smurf": true,
          "tournament": false,
          "data": null
        },
      
      player2: {
          "name": "Lobo",
          "accountName": "FOX Lobitoh",
          "lane": "top",
          "smurf": true,
          "tournament": false,
          "data": null
        },
    },
    {
      name: "Surrender at 15",
      player1: {
          "name": "Marcos",
          "accountName": "FOX Lobitoh",
          "lane": "adc",
          "smurf": true,
          "tournament": false,
          "data": null
        },
      
      player2: {
          "name": "Sami",
          "accountName": "FOX Lobitoh",
          "lane": "adc",
          "smurf": true,
          "tournament": false,
          "data": null
        },
    }
];

export function getPlayerSoloQChallengeList() {
    return playersList;
}

export function getPlayerDuoQChallengeList() {
    return duoQChallengePlayers;
}