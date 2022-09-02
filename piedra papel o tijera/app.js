/* Hacer un juego de piedra, papel o tijera. 
Que se pueda elegir si es singleplayer o multiplayer (2 jugadores).
Que tenga imagenes clickeables.
Que tenga una pantalla de seleccion de modo con botones que luego te lleven al juego
*/

const parrafo0 = document.getElementById('par0')
const parrafo1 = document.createElement("p")
const parrafo2 = document.createElement("p")
const choices = ["piedra", "papel", "tijera"]

let single = false
let multi = false
let clicked = false
let score1 = 0
let score2 = 0

function singleplayer () {
    single = true
    parrafo0.innerHTML = "<h2>Singleplayer</h2><p>Elige piedra, papel o tijera!</p>"
    setup()
}

function multiplayer() {
    multi = true
    parrafo0.innerHTML = "<h2>Multiplayer</h2><p>Jugador 1: Elige piedra, papel o tijera!</p>"
    setup()
}

function setup() {
    choices.forEach(choice => {
        img = document.createElement("img")
        img.src = "img/" + choice + ".png"
        img.id = choices.indexOf(choice)
        document.body.appendChild(img)
        img.addEventListener("click", handleClick)
    })

    const refresh = document.createElement("button")
    refresh.innerHTML = "Menu"
    refresh.onclick = function () {
        window.location.reload() // reloads the page
    }
    document.body.appendChild(parrafo1);
    document.body.appendChild(parrafo2);
    document.body.appendChild(refresh)
}

function handleClick (e) {
    const target = parseInt(e.target.id) // Need to make it a number
    if (single) {
        userChoice = target
        computerChoice = Math.floor(Math.random() * (3))
        getResults (userChoice, computerChoice) // (player1, player2)
        console.log(userChoice, computerChoice)
    }
    if (multi) { // The user needs to be able to make 2 clicks before getting a result
        if (!clicked) {
            clicked = true
            userChoice = target
            parrafo0.innerHTML += "<p>Jugador 1 hizo su eleccion!</p><p>Ahora, Jugador 2: Elige piedra, papel o tijera!</p>";
        } else {
            clicked = false
            user2Choice = target
            getResults (userChoice, user2Choice)
            parrafo0.innerHTML = "<h2>Multiplayer</h2><p>Jugador 1: Elige piedra, papel o tijera!</p>"
        }
        console.log(userChoice, user2Choice)
    }
}

function getResults(player1, player2) {
    if (player1 == player2) {
        parrafo1.innerHTML = "It's a draw.";
    } else if (player1 == player2 + 1) {
        parrafo1.innerHTML = "Jugador 1 ha ganado!";
        score1++;
    } else if (player1 == player2 - 2) {
        parrafo1.innerHTML = "Jugador 1 ha ganado!";
        score1++;
    } else {
        parrafo1.innerHTML = "Jugador 2 ha ganado!";
        score2++;
    }
    parrafo2.innerHTML = "Score Jugador 1: " + score1 + "<br>Score Jugador 2: " + score2;
}