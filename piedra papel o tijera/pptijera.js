/* Hacer un juego de piedra, papel o tijera. 
Que se pueda elegir si es singleplayer o multiplayer (2 jugadores).
Que tenga imagenes clickeables.
Que tenga una pantalla de seleccion de modo con botones que luego te lleven al juego
*/

let gameMode = parseInt(prompt("Elige en que modo quieres jugar: 1. Singleplayer 2. Multiplayer")),
  player1 = 0,
  player2 = 0,
  score1 = 0,
  score2 = 0,
  parrafo0 = document.getElementById("par0"),
  parrafo1 = document.getElementById("par1"),
  parrafo2 = document.getElementById("par2");
main();
function main() {
  if (gameMode == 1) {
    parrafo0.innerHTML = "<h2>Singleplayer</h2><p>Elige piedra, papel o tijera!</p>";
    document.getElementById("Papel").onclick = function() {
      player1 = 2;
      player2 = aleatorio(1,3);
      jugar (player1, player2);
    };
    document.getElementById("Piedra").onclick = function() {
      player1 = 1;
      player2 = aleatorio(1,3);
      jugar (player1, player2);
    };
    document.getElementById("Tijera").onclick = function() {
      player1 = 3;
      player2 = aleatorio(1,3);
      jugar (player1, player2);
    };
  } else if (gameMode == 2){
      parrafo0.innerHTML = "<h2>Multiplayer</h2><p>Jugador 1: Elige piedra, papel o tijera!</p>";
      document.getElementById("Papel").onclick = function() {
        player1 = 2;
        elegir();
      };
      document.getElementById("Piedra").onclick = function() {
        player1 = 1;
        elegir();
      };
      document.getElementById("Tijera").onclick = function() {
        player1 = 3;
        elegir();
      };
  } else {
      document.write("Error, escribe una de las opciones dadas por favor.");
  }
}
function aleatorio(min, max){
	let resultado;
	resultado =  Math.floor(Math.random() * (max - min + 1)) + min;
	return resultado;
}
function jugar(j1, j2) {
  if (j1 == j2) {
    parrafo1.innerHTML = "It's a draw.";
  } else if (j1 == j2 - 1 || j2 == j1 - 1) {
    if (j1 > j2) {
      parrafo1.innerHTML = "Jugador 1 ha ganado!";
    } else {
      parrafo1.innerHTML = "Jugador 2 ha ganado!";
    }
  } else if (j1 == j2 - 2 || j2 == j1 - 2) {
    if (j1 > j2) {
      parrafo1.innerHTML = "Jugador 2 ha ganado!";
    } else {
      parrafo1.innerHTML = "Jugador 1 ha ganado!";
    }
  }
  if (parrafo1.innerHTML == "Jugador 1 ha ganado!") {
    score1++;
    parrafo2.innerHTML = "Score Jugador 1: " + score1 + "<br>Score Jugador 2: " + score2;
  } else if (parrafo1.innerHTML == "Jugador 2 ha ganado!") {
    score2++;
    parrafo2.innerHTML = "Score Jugador 1: " + score1 + "<br>Score Jugador 2: " + score2;
  }
  if (gameMode == 2) {
    main();
  }
}
function elegir() {
  parrafo0.innerHTML = "<h2>Multiplayer</h2><p>Jugador 1 hizo su eleccion!</p><p>Ahora, Jugador 2: Elige piedra, papel o tijera!</p>";
  document.getElementById("Papel").onclick = function() {
    player2 = 2;
    jugar (player1, player2);
  };
  document.getElementById("Piedra").onclick = function() {
    player2 = 1;
    jugar (player1, player2);
  };
  document.getElementById("Tijera").onclick = function() {
    player2 = 3;
    jugar (player1, player2);
  };
}