
const reglamentos = [
    {
        id: 1,
        title: "Placeholder",
        rules: ["Test", "Test", "Test"]
    },
    {
        id: 2,
        title: "Reglamento del SoloQChallenge (2022)",
        rules: [
            "Los participantes que ya tengan la Smurf se verá su nick en <b style='color:green'>color verde</b>.",
            "Los participantes que ya no usen la Smurf se verá su nick en <b style='color:red'>color rojo</b> y estará debajo siempre que los que usen Smurf.",
            "Solo valen las partidas clasificatorias Solo/Duo en modalidad de <b>SoloQ</b>.",
            "El máximo de partidas a jugar durante el tiempo del SoloQChallenger son de <b>150 partidas</b>.",
            "Fecha de inicio y Fin aún no están decididas."
        ]
    },
    {
        id: 10,
        title: "Reglamento del torneo de Modo Arena (2vs2vs2vs2)",
        rules: [
            "El torneo se jugará en el modo Arena (2vs2vs2vs2).",
            "El precio de inscripción es <b>gratuito</b>.",
            "El máximo de jugadores permitidos serán 8 (Hasta llenar el Lobby). <span>Los organizadores podrán decidir quienes son los 8 jugadores en base a los participantes iniciales.</span>",
            "Se jugarán un máximo de 7 partidas. <span>Para que todos los jugadores puedan jugar una partida con otro jugador sin repetir compañero.</span>",
            "Los equipos de cada partida lo decidirá el propio algoritmo que hace los equipos. <span>De ninguna manera está permitido cambiarse de equipo los jugadores</span>",
            "La pareja de jugadores que queden primero en cada partida conseguirán 5 puntos cada uno, los segundos 3 puntos, los terceros 1 punto.",
            "Los puntos le servirá a cada jugador para clasificarse en la tabla de puntuación.",
            "Tras el Septimo partido, la clasificación será el orden en orden ascendente de jugadores con más puntos.",
            "Los premios se incluirán en el popup de premios",
            "Las partidas podrán jugarse los 7 el mismo día, o separarse en 2 o varios días, siempre intentando favorecer el horario de la mayoría de jugadores.",
            "Si un jugador no se presenta al torneo sin motivo alguno quedará excluido para futuros torneos de este estilo.",
            "Si un jugador abandona o se niega a jugar durante el trascurso del torneo, quedará excluido para futuros torneos, se invalidarán los puntos que tuviera tanto él como los compañeros que tuvieron en partidas anteriores, además los compañeros de las próximas partidas que tuviera no podrán jugar.",
            "Si un jugador abandona alegando un motivo de necesidad, podrá decidir que otro jugador que no sea participante del torneo pueda jugar por él el resto del torneo, aunque el premio lo recibirá el jugador inicialmente inscrito.",
            "Si por las razones anteriores una pareja no juega quedando 3 parejas, el 4to equipo serán los guiris, cuyos puntos que consiga tras posicionarse no irá para ningún jugador",
            "El torneo se cancelará automaticamente si no se presenta, abandona o se niega a jugar 2 o más jugadores, dejando los premios para futuros torneos."
        ]
    },
    {
        id: 11,
        title: "Premios del torneo de Modo Arena (2vs2vs2vs2)",
        rules: [
            "<b>Primer puesto:</b> Tarjeta regalo con 20€ en RP",
            "<b>Segundo puesto:</b> Tarjeta regalo con 10€ en RP",
            "<b>Tercer puesto:</b> Tarjeta regalo con 5€ en RP",
            "<b>Cuarto puesto:</b> Tarjeta regalo con 5€ en RP",
            "Además, se sorteará una Tarjeta regalo con 5€ en RP entre los últimos 4 jugadores siempre y cuando hayan jugado las 7 partidas."
        ]
    }
];

export function setRules(id, selectorTitulo = "#popupReglasTitulo", selectorReglas = "#popupReglasNormas") {
    let game = reglamentos.find((element) => element.id == id);
    if (game == null) {
        console.error("ERROR: Juego con ID " + id + " no encontrado");
        return;
    }

    $(selectorTitulo).text(game.title);
    $(selectorReglas).empty();
    game.rules.forEach(rule => {
        $("<li>" + rule + "</li>").appendTo("#popupReglasNormas");
    });
}