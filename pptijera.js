// Hacer un juego de piedra, papel o tijera. Que se pueda elegir si es singleplayer o multiplayer (2 jugadores).

let gameMode = parseInt(prompt("Elige en que modo quieres jugar: 1. Singleplayer 2. Multiplayer")),
    player1 = 0,
    player2 = 0;
if (gameMode == 1) {
  player1 = parseInt(prompt("Jugador 1 elige: 1.Piedra 2.Papel 3.Tijera"));
  player2 = aleatorio(1,3);
  jugar (player1, player2);
} else if (gameMode == 2){
    player1 = parseInt(prompt("Jugador 1 elige: 1.Piedra 2.Papel 3.Tijera"));
    player2 = parseInt(prompt("Jugador 2 elige: 1.Piedra 2.Papel 3.Tijera"));
    jugar (player1, player2);
} else {
    document.write("Error, escribe una de las opciones dadas por favor.");
}
function aleatorio(min, max){
	let resultado;
	resultado =  Math.floor(Math.random() * (max - min + 1)) + min;
	return resultado;
}
function jugar(j1, j2) {
  if (j1 >= 1 && j2 >= 1 && j1 <= 3 && j2 <= 3) {
    if (j1 == j2) {
      document.write("It's a draw.");
    } else if (j1 == j2 - 1 || j2 == j1 - 1) {
      if (j1 > j2) {
        document.write("Jugador 1 ha ganado!");
      } else {
        document.write("Jugador 2 ha ganado!");
      }
    } else if (j1 == j2 - 2 || j2 == j1 - 2) {
      if (j1 > j2) {
        document.write("Jugador 2 ha ganado!");
      } else {
        document.write("Jugador 1 ha ganado!");
      }
    }
} else {
    document.write("Please write only numbers between 1 and 3, try again.");
}
}