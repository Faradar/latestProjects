/* Hacer un juego de piedra, papel o tijera. 
Que se pueda elegir si es singleplayer o multiplayer (2 jugadores).
Que tenga imagenes clickeables.
Que tenga una pantalla de seleccion de modo con botones que luego te lleven al juego
*/

let player1 = 0,
  player2 = 0,
  score1 = 0,
  score2 = 0,
  single = false,
  multi = false,
  parrafo0 = document.getElementById("par0"),
  parrafo1 = 0,
  parrafo2 = 0;
function setupSingle() {
  images();
  parrafos();
  goBack();
  singleMode();
}
function setupMulti() {
  images();
  parrafos();
  goBack();
  multiMode();
}
function singleMode() {
  single = true;
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
} 
function multiMode() {
  multi = true;
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
  if (single) {
    singleMode();
  }
  else if (multi) {
    multiMode();
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
function images(){
  const imgPapel = document.createElement("img"),
    imgPiedra = document.createElement("img"),
    imgTijera = document.createElement("img");
  imgPapel.src = "img/papel.png"; imgPapel.id = "Papel";
  imgPiedra.src = "img/piedra.png"; imgPiedra.id = "Piedra";
  imgTijera.src = "img/tijera.png"; imgTijera.id = "Tijera";
  document.getElementById("body").appendChild(imgPapel);
  document.getElementById("body").appendChild(imgPiedra);
  document.getElementById("body").appendChild(imgTijera);
}
function parrafos(){
  parrafo1 = document.createElement("p"),
  parrafo2 = document.createElement("p");
  parrafo1.id = "par1" ; parrafo2.id = "par2";
  document.getElementById("body").appendChild(parrafo1);
  document.getElementById("body").appendChild(parrafo2);
}
function goBack(){
  const refresh = document.createElement("button");
  document.getElementById("body").appendChild(refresh);
  refresh.innerHTML = "Menu";
  refresh.onclick = function () {
    score1 = 0;
    score2 = 0;
    single = false;
    multi = false;
    parrafo0.innerHTML = "Elige en que modo quieres jugar:<br><br>";
    parrafo1.remove();
    parrafo2.remove();
    refresh.remove();
    Papel.remove();
    Piedra.remove();
    Tijera.remove();
    const singlePlayer = document.createElement("button"),
      multiPlayer = document.createElement("button");
    document.getElementById("par0").appendChild(singlePlayer);
    document.getElementById("par0").appendChild(multiPlayer);
    singlePlayer.innerHTML = "Singleplayer";
    multiPlayer.innerHTML = "Multiplayer";
    singlePlayer.onclick = setupSingle;
    multiPlayer.onclick = setupMulti;
  }
}