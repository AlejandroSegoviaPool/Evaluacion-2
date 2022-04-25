let baraja = [];
let carta;
let totalJugador = 0;
let totalComputadora = 0;

function nuevaBaraja() {
    baraja = [];

    const numeros = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const letras = ["A", "J", "Q", "K"];
    const palo = ["C", "D", "H", "S"];

    for (const n of numeros) {
        for (const p of palo) {
            baraja.push(n + p)
        }
    }
    for (const l of letras) {
        for (const p of palo) {
            baraja.push(l + p)
        }
    }

    baraja = _.shuffle(baraja);

    console.log(baraja);
}

function valorCarta(carta) {
    let numCarta = carta.substring(0, carta.length - 1);

    if (["A"].includes(numCarta)) {
        return 11;
    } else if (["J", "Q", "K"].includes(numCarta)) {
        return 10;
    } else {
        numCarta = numCarta * 1;
    }
    return numCarta;
}

function turnoComputadora() {
    let jugadorGana = true;
    do {
        carta = baraja.shift();
        $("#cartasComputadora").html($("#cartasComputadora").html() + `<img src="/cartas/${carta}.png" alt="">`)

        totalComputadora += valorCarta(carta);
        $("#contadorComputadora").text(totalComputadora)

        if(totalJugador > 21){
            jugadorGana = false;
            break;
        }
    } while (totalComputadora <= 21 && totalComputadora < totalJugador);

    if(totalComputadora <= 21 && totalComputadora>= totalJugador){
        jugadorGana = false
    }
    ganador(jugadorGana ? 'El jugador ha ganado' : 'La computadora ha ganado')
}

function ganador(ganador){
    $("#ganador").removeClass("hidden");
    $("#ganador").text(ganador)
}
//Click en el boton Pedir Cartas
$("#pedirCarta").click(function () {
    carta = baraja.shift();
    $("#cartasJugador").html($("#cartasJugador").html() + `<img src="/cartas/${carta}.png" alt="">`)

    totalJugador += valorCarta(carta);
    $("#contadorJugador").text(totalJugador)

    if (totalJugador >= 21) {
        $("#pedirCarta").attr("disabled", "true")
        $("#detenerse").attr("disabled", "true")
        turnoComputadora();
    }

    console.log(baraja);
})

//Click en el boton Nuevo Juego
$("#nuevoJuego").click(function () {
    $("#cartasJugador").html("");
    $("#cartasComputadora").html("");
    nuevaBaraja();

    totalJugador = 0;
    $("#contadorJugador").text(totalJugador)

    totalComputadora = 0;
    $("#contadorComputadora").text(totalComputadora)

    $("#pedirCarta").removeAttr("disabled")
    $("#detenerse").removeAttr("disabled")

    $("#ganador").addClass("hidden");


})

//Click en boton detenerse
$("#detenerse").click(function () {
    $("#pedirCarta").attr("disabled", "true")
    $("#detenerse").attr("disabled", "true")
    turnoComputadora();
})

nuevaBaraja();