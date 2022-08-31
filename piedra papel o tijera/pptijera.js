/* Hacer un juego de piedra, papel o tijera. 
Que se pueda elegir si es singleplayer o multiplayer (2 jugadores).
Que tenga imagenes clickeables.
Que tenga una pantalla de seleccion de modo con botones que luego te lleven al juego
*/

let player1 = 0,
  player2 = 0,
  score1 = 0,
  score2 = 0,
  multi = false;
const parrafo0 = document.getElementById("par0"),
  imgPiedra = document.createElement("img"),
  imgPapel = document.createElement("img"),
  imgTijera = document.createElement("img"),
  parrafo1 = document.createElement("p"),
  parrafo2 = document.createElement("p"),
  refresh = document.createElement("button");
function singleMode() {
  setup();
  parrafo0.innerHTML = "<h2>Singleplayer</h2><p>Elige piedra, papel o tijera!</p>";
  imgPiedra.onclick = function() {
    player1 = 1;
    player2 = aleatorio(1,3);
    jugar (player1, player2);
  };
  imgPapel.onclick = function() {
    player1 = 2;
    player2 = aleatorio(1,3);
    jugar (player1, player2);
  };
  imgTijera.onclick = function() {
    player1 = 3;
    player2 = aleatorio(1,3);
    jugar (player1, player2);
  };
} 
function multiMode() {
  setup();
  multi = true;
  parrafo0.innerHTML = "<h2>Multiplayer</h2><p>Jugador 1: Elige piedra, papel o tijera!</p>";
  imgPiedra.onclick = function() {
    player1 = 1;
    elegir();
  };
  imgPapel.onclick = function() {
    player1 = 2;
    elegir();
  };
  imgTijera.onclick = function() {
    player1 = 3;
    elegir();
  };
}
function aleatorio(min, max){
	let resultado = Math.floor(Math.random() * (max - min + 1)) + min;
	return resultado;
}
function jugar(j1, j2) {
  if (j1 == j2) {
    parrafo1.innerHTML = "It's a draw.";
  } else if (j1 == j2 + 1) {
    parrafo1.innerHTML = "Jugador 1 ha ganado!";
  } else if (j1 == j2 - 2) {
    parrafo1.innerHTML = "Jugador 1 ha ganado!";
  } else {
    parrafo1.innerHTML = "Jugador 2 ha ganado!";
  }
  if (parrafo1.innerHTML == "Jugador 1 ha ganado!") {
    score1++;
  } else if (parrafo1.innerHTML == "Jugador 2 ha ganado!") {
    score2++;
  }
  if (multi) {
    multiMode();
  }
  parrafo2.innerHTML = "Score Jugador 1: " + score1 + "<br>Score Jugador 2: " + score2;
}
function elegir() {
  parrafo0.innerHTML = "<h2>Multiplayer</h2><p>Jugador 1 hizo su eleccion!</p><p>Ahora, Jugador 2: Elige piedra, papel o tijera!</p>";
  imgPiedra.onclick = function() {
    player2 = 1;
    jugar (player1, player2);
  };
  imgPapel.onclick = function() {
    player2 = 2;
    jugar (player1, player2);
  };
  imgTijera.onclick = function() {
    player2 = 3;
    jugar (player1, player2);
  };
} 
function setup(){
  imgPiedra.src = "img/piedra.png";
  imgPapel.src = "img/papel.png";
  imgTijera.src = "img/tijera.png";
  document.getElementById("body").appendChild(imgPiedra);
  document.getElementById("body").appendChild(imgPapel);
  document.getElementById("body").appendChild(imgTijera);
  document.getElementById("body").appendChild(parrafo1);
  document.getElementById("body").appendChild(parrafo2);
  document.getElementById("body").appendChild(refresh);
  refresh.innerHTML = "Menu";
  refresh.onclick = function () {
    window.location.reload(); // reloads the page
  }
}