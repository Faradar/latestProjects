class Mokepon {
    constructor(n, f, t, tt, ti) {
        this.nombre = n
        this.foto = f
        this.victoria = 0
        this.ataque = [
            {nombre: "🔥", id: "boton-fuego", value: "0", nombreBoton: "Fuego 🔥", tooltipId: "fuego", tooltipText: "Quema las plantas"},
            {nombre: "💧", id: "boton-agua", value: "1", nombreBoton: "Agua 💧", tooltipId: "agua", tooltipText: "Apaga el fuego"},
            {nombre: "🌱", id: "boton-planta", value: "2", nombreBoton: "Planta 🌱", tooltipId: "planta", tooltipText: "Absorbe el agua"},
        ]
        this.tooltip = t
        this.tooltipText = tt
        this.tipo = ti
    }
}

const q = selector => document.querySelector(selector) // shortcut para document.querySelector
const qa = selector => document.querySelectorAll(selector) // shortcut para document.querySelectorAll

let ctx = q("#mapa").getContext("2d")
let mascotaJugador
let mascotaEnemigo
let ataqueJugador
let ataqueJugadorValue
let ataqueEnemigo
let ataqueEnemigoValue
let mascotaEnemigoAtaques = 0
let ataquesRealizados = 0
let mokepones = [
    new Mokepon("Hipodoge", "https://i.imgur.com/bceFwyB.png", "doge", "El mejor amigo del hombre, es de tipo agua", 1),
    new Mokepon("Capipepo", "https://i.imgur.com/mmyMNCU.png", "pepo", "Mitad capibara mitad es un enigma, es de tipo planta", 2),
    new Mokepon("Ratigueya", "https://i.imgur.com/NIs4hyy.png", "gueya", "Con todo el poder de un niño rata, es de tipo fuego", 0),
    new Mokepon("Langostelvis", "https://i.imgur.com/xX2bzMP.png", "elvis", "Un auténtico Presley, es de tipo fuego", 0),
    new Mokepon("Pydos", "https://i.imgur.com/TS7ZlFh.png", "dos", "Algo sobre estar atorado y pedirle ayuda a tu hermanastro, es de tipo agua", 1),
    new Mokepon("Tucapalma", "https://i.imgur.com/lXkxbIm.png", "palma", "Aprendiz de Karen y siempre en busca de un gerente para quejarse, es de tipo planta", 2)
]

mokepones[0].ataque.push(
    {nombre: "💧", id: "boton-agua", value: "1", nombreBoton: "Agua 💧", tooltipId: "agua", tooltipText: "Apaga el fuego"},
    {nombre: "💧", id: "boton-agua", value: "1", nombreBoton: "Agua 💧", tooltipId: "agua", tooltipText: "Apaga el fuego"},
)

mokepones[1].ataque.push(
    {nombre: "🌱", id: "boton-planta", value: "2", nombreBoton: "Planta 🌱", tooltipId: "planta", tooltipText: "Absorbe el agua"},
    {nombre: "🌱", id: "boton-planta", value: "2", nombreBoton: "Planta 🌱", tooltipId: "planta", tooltipText: "Absorbe el agua"},
)

mokepones[2].ataque.push(
    {nombre: "🔥", id: "boton-fuego", value: "0", nombreBoton: "Fuego 🔥", tooltipId: "fuego", tooltipText: "Quema las plantas"},
    {nombre: "🔥", id: "boton-fuego", value: "0", nombreBoton: "Fuego 🔥", tooltipId: "fuego", tooltipText: "Quema las plantas"},
)

mokepones[3].ataque.push(
    {nombre: "🔥", id: "boton-fuego", value: "0", nombreBoton: "Fuego 🔥", tooltipId: "fuego", tooltipText: "Quema las plantas"},
    {nombre: "💧", id: "boton-agua", value: "1", nombreBoton: "Agua 💧", tooltipId: "agua", tooltipText: "Apaga el fuego"},
)

mokepones[4].ataque.push(
    {nombre: "💧", id: "boton-agua", value: "1", nombreBoton: "Agua 💧", tooltipId: "agua", tooltipText: "Apaga el fuego"},
    {nombre: "🌱", id: "boton-planta", value: "2", nombreBoton: "Planta 🌱", tooltipId: "planta", tooltipText: "Absorbe el agua"},
)

mokepones[5].ataque.push(
    {nombre: "🌱", id: "boton-planta", value: "2", nombreBoton: "Planta 🌱", tooltipId: "planta", tooltipText: "Absorbe el agua"},
    {nombre: "🔥", id: "boton-fuego", value: "0", nombreBoton: "Fuego 🔥", tooltipId: "fuego", tooltipText: "Quema las plantas"},
)

mokepones.forEach(mokepon => {
    q('.tarjetas').innerHTML += `
    <input type="radio" name="mascota" id=${mokepon.nombre.toLowerCase()} value=${mokepon.nombre}>
        <label class="tarjeta-mokepon" for=${mokepon.nombre.toLowerCase()}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
            <span class="tooltip-text" id="tooltip-${mokepon.tooltip}">${mokepon.tooltipText}</span>
        </label>
    `
})

// funcion que se ejecuta cuando se aprieta el boton de seleccionar mascota
q('#boton-mascota').addEventListener('click', () => {
    if (q('#seleccionar-mascota input:checked')) {
        eleccionJugador()
        eleccionEnemigo()
        tipoSuperior(mascotaJugador, mascotaEnemigo)
        ponerFotos()
        ponerTexto()
        ponerAtaques()
        revelarAtaques()
        botonesAtaque()
    } else {
        alert("No has seleccionado nada!")
        // si se aprieta un boton antes de seleccionar una mascota sale esto
    }
})

q("#boton-reiniciar").addEventListener("click", () => {
    location.reload() // reloads the page
})

function eleccionJugador() {
    mascotaJugador = q('#seleccionar-mascota input:checked').value
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            mascotaJugador = mokepones[i]
        }
    }
}

// La computadora debe elegir un mokepon diferente al jugador
function eleccionEnemigo() {
    do {
        mascotaEnemigo = mokepones[aleatorio(0, mokepones.length - 1)]
    } while (mascotaJugador == mascotaEnemigo.nombre)
}

// Quien tenga un tipo "superior" recibe un ataque extra equivalente a su tipo (si es tipo fuego recibe un ataque de fuego)
function tipoSuperior(mokepon1, mokepon2) {
    if (mokepon1.tipo == mokepon2.tipo) {
        return
    } else if (mokepon1.tipo == mokepon2.tipo + 1 || mokepon1.tipo == mokepon2.tipo - 2){
        mokepon1.ataque.push (mokepon1.ataque[3])
    } else {
        mokepon2.ataque.push (mokepon2.ataque[3])
    }
}

function ponerFotos() {
    q("#foto-jugador").src = mascotaJugador.foto
    q("#foto-enemigo").src = mascotaEnemigo.foto
}

function ponerTexto() {
    q("#mascota-jugador").innerHTML = mascotaJugador.nombre
    q("#mascota-enemigo").innerHTML = mascotaEnemigo.nombre
}

function ponerAtaques() {
    mascotaJugador.ataque.forEach(ataque => {
        q('.botones-ataque').innerHTML += `
        <div class="botones-ataque2">
            <button id=${ataque.id} class="ataque" value=${ataque.value}>${ataque.nombreBoton}</button>
            <span class="tooltip-text tooltip-ataque" id="tooltip-${ataque.tooltipId}">${ataque.tooltipText}</span>
        </div>
        `
    });
}

function revelarAtaques() {
    q("#seleccionar-mascota").hidden = true
    q("#seleccionar-ataque").hidden = false

    /* q("#ver-mapa").hidden = false
    let imagenAsd = new Image()
    imagenAsd.src = mascotaJugador.foto
    ctx.drawImage(imagenAsd,20,40,100,100) */
}

function botonesAtaque() {
    qa(".ataque").forEach(boton => {
        boton.addEventListener("click", () => {
            ataquesRealizados += 1
            boton.style.background = "#112f58"
            boton.disabled = true

            eleccionDeAtaques(boton)
            manejadorAtaquesEnemigo()
            ponerTextoAtaque()
            determinarVictoria()

            // Esto no sucede hasta que se hagan 5 ataques
            if (ataquesRealizados > 4) {
                if (mascotaJugador.victoria > mascotaEnemigo.victoria) {
                    fin(
                        mascotaJugador,
                        "derroto a",
                        mascotaEnemigo,
                        "https://www.youtube.com/watch?v=TcZJHIzW9-w&ab_channel=NobuoUematsu-Topic",
                        "Felicitaciones, has Ganado! 🎊"
                    )
                } else if (mascotaEnemigo.victoria > mascotaJugador.victoria) {
                    fin(
                        mascotaEnemigo,
                        "derroto a",
                        mascotaJugador,
                        "https://www.youtube.com/watch?v=dwLCjZVEtpE&ab_channel=SathButtons",
                        "Has perdido, pero no te rindas! 🤕"
                    )
                } else {
                    fin(
                        mascotaJugador,
                        "empato contra",
                        mascotaEnemigo,
                        "https://www.youtube.com/watch?v=hBkHNTCIvrE&ab_channel=VideoGamesMusic",
                        "Esto no puede quedar así, intentalo de nuevo! 💪"
                    )
                    desempatar()
                }
            }
        })
    })
}

function eleccionDeAtaques(btn) {
    ataqueJugador = btn.innerHTML
    ataqueJugadorValue = parseInt(btn.value)
    ataqueEnemigo = mascotaEnemigo.ataque[aleatorio(0, mascotaEnemigo.ataque.length - 1)]
    ataqueEnemigoValue = parseInt(ataqueEnemigo.value)
}

function aleatorio(min, max) {
    let resultado = Math.floor(Math.random() * (max - min + 1)) + min;
    return resultado;
}

function manejadorAtaquesEnemigo() {
    const index = mascotaEnemigo.ataque.indexOf(ataqueEnemigo)

    // Guarda una copia del array de ataques del enemigo, por si hay una revancha.
    if (mascotaEnemigoAtaques == 0) {
        mascotaEnemigoAtaques = mascotaEnemigo.ataque.slice()
    }

    // Remueve los ataques que el enemigo ya uso
    if (index > -1) { // only splice array when item is found
        mascotaEnemigo.ataque.splice(index, 1) // 2nd parameter means remove one item only
    }
}

function ponerTextoAtaque() {
    q("#mensaje-jugador").innerHTML += ataqueJugador.slice(-2) + "<br>" //el slice es para que solo me de el simbolo del ataque
    q("#mensaje-enemigo").innerHTML += ataqueEnemigo.nombre + "<br>"
}

function determinarVictoria() {
    if (ataqueJugadorValue == ataqueEnemigoValue) {
        return
    } else if (ataqueJugadorValue == ataqueEnemigoValue + 1 || ataqueJugadorValue == ataqueEnemigoValue - 2) {
        mascotaJugador.victoria += 1
        q("#victoria-jugador").innerHTML = mascotaJugador.victoria
    } else {
        mascotaEnemigo.victoria += 1
        q("#victoria-enemigo").innerHTML = mascotaEnemigo.victoria
    }
}

function fin(mokepon1, resolucion, mokepon2, link, texto) {
    q("#resultado-final").innerHTML = `${mokepon1.nombre} ${resolucion} ${mokepon2.nombre}.<p>
    <a href= ${link}
    target="_blank" rel="noopener noreferrer">${texto}</a><p>Fin del combate.`
    // Agrego un link en el texto. target="_blank" es para que se abra en una nueva tab
    // y uso rel="noopener noreferrer" para prevenir un tipo de phishing conocido como tabnabbing.
    qa(".botones-ataque2").forEach(boton => boton.style.display = "none")
    // Alternativamente, en lugar de esconder los botones puedo borrarlos asi: (boton => boton.remove())
    // Tambien puedo deshabilitarlos asi: (boton => boton.disabled = true)
    q("#reiniciar").hidden = false
}

// Para los empates decidi crear un boton de revancha que permita volver a hacer esa pelea para desempatar
function desempatar() {
    q("#boton-revancha").hidden = false
    q("#boton-revancha").addEventListener("click", () => {
        q("#reiniciar").hidden = true
        q("#boton-revancha").hidden = true
        q("#resultado-final").innerHTML = ""
        qa(".botones-ataque2").forEach(boton => boton.style.display = "block")
        qa(".ataque").forEach(boton => {
            boton.disabled = false
            boton.style.background = "none"
        })
        q("#mensaje-jugador").innerHTML = ""
        q("#mensaje-enemigo").innerHTML = ""
        mascotaJugador.victoria = 0
        mascotaEnemigo.victoria = 0
        q("#victoria-jugador").innerHTML = 0
        q("#victoria-enemigo").innerHTML = 0
        ataquesRealizados = 0
        mascotaEnemigo.ataque = mascotaEnemigoAtaques
        mascotaEnemigoAtaques = 0
    })
}