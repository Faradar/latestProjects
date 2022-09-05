/* Hacer un juego de piedra, papel o tijera. 
Que se pueda elegir si es singleplayer o multiplayer (2 jugadores).
Que tenga imagenes clickeables.
Que tenga una pantalla de seleccion de modo con botones que luego te lleven al juego
Que puedas volver a esa pantalla de seleccion con otro boton
Que las imagenes y las fuentes sean sacadas de la web y no de archivos en la carpeta
*/

const parrafo0 = document.getElementById('par0')
const parrafo1 = document.createElement("p")
const parrafo2 = document.createElement("p")
const choices = ["piedra", "papel", "tijera"]
const sources = ["https://i.imgur.com/749xmq8.png", "https://i.imgur.com/zjYmEWQ.png", "https://i.imgur.com/iVZLgXJ.png"]

let single = false
let multi = false
let clicked = false
let score1 = 0
let score2 = 0

function singleplayer () {
    single = true
    parrafo0.innerHTML = "<h2>Singleplayer</h2><p>Choose rock, paper or scissors!</p>"
    setup()
}

function multiplayer() {
    multi = true
    parrafo0.innerHTML = "<h2>Multiplayer</h2><p>Player 1: Choose rock, paper or scissors!</p>"
    setup()
}

function setup() {
    choices.forEach(choice => {
        img = document.createElement("img")
        img.id = choices.indexOf(choice)
        img.src = sources[choices.indexOf(choice)] // Otra forma de hacer esto => img.src = `./img/${choice}.png` => que es igual a escribir => "./img/" + choice + ".png"
        document.body.appendChild(img)
        img.addEventListener("click", handleClick)
    })

    const refresh = document.createElement("button")
    refresh.innerHTML = "Menu"
    refresh.onclick = function () {
        window.location.reload() // reloads the page
    }
    document.body.appendChild(parrafo1)
    document.body.appendChild(parrafo2)
    document.body.appendChild(refresh)
}

function handleClick (e) {
    const target = parseInt(e.target.id) // Need to make it a number
    if (single) {
        userChoice = target
        computerChoice = Math.floor(Math.random() * (3))
        getResults (userChoice, computerChoice)
        console.log(userChoice, computerChoice)
    } else if (multi) { // The user needs to be able to make 2 clicks before getting a result
        if (!clicked) {
            clicked = true
            userChoice = target
            parrafo0.innerHTML += "<p>Player 1 has chosen!</p><p>Now, Player 2: Choose rock, paper or scissors!</p>"
        } else {
            clicked = false
            user2Choice = target
            getResults (userChoice, user2Choice)
            parrafo0.innerHTML = "<h2>Multiplayer</h2><p>Player 1: Choose rock, paper or scissors!</p>"
        }
        console.log(userChoice, user2Choice)
    }
}

function getResults(player1, player2) {
    if (player1 == player2) {
        parrafo1.innerHTML = "It's a draw!"
    } else if (player1 == player2 + 1 || player1 == player2 - 2) {
        parrafo1.innerHTML = "Player 1 has won!"
        score1++;
    } else {
        parrafo1.innerHTML = "Player 2 has won!"
        score2++;
    }
    parrafo2.innerHTML = "Score Player 1: " + score1 + "<br>Score Player 2: " + score2
}