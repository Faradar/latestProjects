class Mokepon {
    constructor(n, f, t, tt, ti, x = 1, y = 1) { // si igualo estos parametros a algo aca mismo (onda x = 500, y = 600) entonces ese 500 y ese 600 se toma como el valor a tener por defecto para la x e y de cada mokepon, si no les doy uno particular cuando los cree
        this.nombre = n
        this.foto = new Image()
        this.foto.src = f
        this.victoria = 0
        this.ataque = [
            {nombre: "🔥", id: "boton-fuego", value: "0", nombreBoton: "Fuego 🔥", tooltipId: "fuego", tooltipText: "Quema las plantas"},
            {nombre: "💧", id: "boton-agua", value: "1", nombreBoton: "Agua 💧", tooltipId: "agua", tooltipText: "Apaga el fuego"},
            {nombre: "🌱", id: "boton-planta", value: "2", nombreBoton: "Planta 🌱", tooltipId: "planta", tooltipText: "Absorbe el agua"},
        ]
        this.tooltip = t
        this.tooltipText = tt
        this.tipo = ti
        this.x = x
        this.y = y
        this.width = 80
        this.height = 80
    }
    pintarMokepon() {
        ctx.drawImage(
            this.foto,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}
const q = selector => document.querySelector(selector) // shortcut para document.querySelector
const qa = selector => document.querySelectorAll(selector) // shortcut para document.querySelectorAll
let mokepones = [
    new Mokepon(
        "Hipodoge",
        "https://i.imgur.com/bceFwyB.png",
        "doge",
        "El mejor amigo del hombre, es de tipo agua",
        1,
    ),
    new Mokepon(
        "Capipepo",
        "https://i.imgur.com/mmyMNCU.png",
        "pepo",
        "Mitad capibara mitad es un enigma, es de tipo planta",
        2,
    ),
    new Mokepon(
        "Ratigueya",
        "https://i.imgur.com/NIs4hyy.png",
        "gueya",
        "Con todo el poder de un niño rata, es de tipo fuego",
        0,
    ),
    new Mokepon(
        "Langostelvis",
        "https://i.imgur.com/xX2bzMP.png",
        "elvis",
        "Un auténtico Presley, es de tipo fuego",
        0,
    ),
    new Mokepon(
        "Pydos",
        "https://i.imgur.com/TS7ZlFh.png",
        "dos",
        "Algo sobre estar atorado y pedirle ayuda a tu hermanastro, es de tipo agua",
        1,
    ),
    new Mokepon(
        "Tucapalma",
        "https://i.imgur.com/lXkxbIm.png",
        "palma",
        "Aprendiz de Karen y siempre en busca de un gerente para quejarse, es de tipo planta",
        2,
    ),
]
const mapaBackground = new Image()
mapaBackground.src = "https://i.imgur.com/wfoXdN1.jpg"

let jugadorId = null
let mascotaJugador
let mascotaEnemigo
let ataqueJugador
let ataqueJugadorValue
let ataqueEnemigo
let ataqueEnemigoValue
let index
let continuando = false
let mascotaEnemigoAtaques
let ataquesRealizados = 0
let movimiento = 10
let keys = []
let ctx = q("#mapa").getContext("2d")

q("#mapa").width = window.innerWidth - 50
const widthMax = 800
if (q("#mapa").width > widthMax) {
    q("#mapa").width = widthMax
}
q("#mapa").height = q("#mapa").width * 600 / 800

login()
añadirAtaques()
posicionesMokepones()
mokepones.forEach(mokepon => {
    q('.tarjetas').innerHTML += `
    <input type="radio" name="mascota" id=${mokepon.nombre.toLowerCase()} value=${mokepon.nombre}>
        <label class="tarjeta-mokepon" for=${mokepon.nombre.toLowerCase()}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto.src} alt=${mokepon.nombre}>
            <span class="tooltip-text" id="tooltip-${mokepon.tooltip}">${mokepon.tooltipText}</span>
        </label>
    `
})

// funcion que se ejecuta cuando se aprieta el boton de seleccionar mascota
q('#boton-mascota').addEventListener('click', () => {
    if (q('#seleccionar-mascota input:checked')) {
        eleccionJugador()
        iniciarCanvas()
    } else {
        alert("No has seleccionado nada!")
        // si se aprieta un boton antes de seleccionar una mascota sale esto
    }
})

q("#boton-reiniciar").addEventListener("click", () => {
    location.reload() // reloads the page
})

function login() {
    fetch("http://localhost:8080/unirse")
        .then((res) => {
            if (res.ok) {
                res.text()
                    .then((respuesta) => {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function añadirAtaques() {
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
}

function posicionesMokepones() {
    const objectsMap = new Map()
    let pos
    let posArray = []
    let unique = []
    do {
        pos = {
            x:aleatorio(1, q("#mapa").width/70 - 2) * 70,
            y:aleatorio(1, q("#mapa").height/70 - 2) * 70
        }
        posArray.push(pos)
        posArray.forEach(object => {
            objectsMap.set(object.x.toString() + object.y, object)
        })
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    } while (objectsMap.size < mokepones.length)
    for (let i of objectsMap.keys()) {
        unique.push(objectsMap.get(i))
    }
    for (let i = 0; i < mokepones.length; i++) {
        mokepones[i].x = unique[i].x
        mokepones[i].y = unique[i].y
    }
}

function eleccionJugador() {
    mascotaJugador = q('#seleccionar-mascota input:checked').value
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            mokepones.push(new Mokepon(
                mokepones[i].nombre,
                mokepones[i].foto.src,
                mokepones[i].tooltip,
                mokepones[i].tooltipText,
                mokepones[i].tipo,
                10,
                10,
            ))
            mascotaJugador = mokepones[mokepones.length - 1]
            mascotaJugador.ataque = mokepones[i].ataque
        }
    }
    eleccionBackend(mascotaJugador)
}

function eleccionBackend(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador.nombre
        })
    })
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
    q("#foto-jugador").src = mascotaJugador.foto.src
    q("#foto-enemigo").src = mascotaEnemigo.foto.src
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
    })
}

function iniciarCanvas() {
    q("#seleccionar-mascota").hidden = true
    q("#ver-mapa").style.display = "flex"
    pintarCanvas()
    window.addEventListener("keydown", keysPressed, false)
    window.addEventListener("keyup", keysReleased, false)
}

function pintarCanvas() {
    ctx.clearRect(0, 0, q("#mapa").width, q("#mapa").height)
    ctx.drawImage(mapaBackground,0,0,q("#mapa").width,q("#mapa").height)
    mokepones.forEach(mokepon => {
        mokepon.pintarMokepon()
    })
    if (keys["ArrowLeft"] || keys["ArrowRight"] || keys["ArrowUp"] || keys["ArrowDown"]) {
        for (let i = 0; i < mokepones.length - 1; i++) {
            revisarColision(mokepones[i])
        }
    }
}

function keysPressed(e) {
    keys[e.code] = true
    if (keys["ArrowLeft"]) {
        if (mascotaJugador.x + 30 < 40) {
            mascotaJugador.x = mascotaJugador.x
        } else {
            mascotaJugador.x -= movimiento
        }
    }
    if (keys["ArrowUp"]) {
        if (mascotaJugador.y + 30 < 40) {
            mascotaJugador.y = mascotaJugador.y
        } else {
            mascotaJugador.y -= movimiento
        }
    }
    if (keys["ArrowRight"]) {
        if (mascotaJugador.x < q("#mapa").width - 80) {
            mascotaJugador.x += movimiento
        } else {
            mascotaJugador.x = mascotaJugador.x
        }
    }
    if (keys["ArrowDown"]) {
        if (mascotaJugador.y < q("#mapa").height - 80) {
            mascotaJugador.y += movimiento
        } else {
            mascotaJugador.y = mascotaJugador.y
        }
    }
    // e.preventDefault() // prevents your browser from reacting to any keyboard events as long as your page has focus
    pintarCanvas()
    enviarPosicion(mascotaJugador.x, mascotaJugador.y)
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then((res) => {
        if(res.ok) {
            res.json()
                .then(({enemigos}) => {
                    console.log(enemigos)
                })
        }
    })
}

function keysReleased(e) {
    keys[e.code] = false
}

function revisarColision(enemigo) {
    const arribaMascota = mascotaJugador.y + 30
    const abajoMascota = mascotaJugador.y + mascotaJugador.height - 30
    const derechaMascota = mascotaJugador.x + mascotaJugador.width - 30
    const izquierdaMascota = mascotaJugador.x + 30
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.height
    const derechaEnemigo = enemigo.x + enemigo.width
    const izquierdaEnemigo = enemigo.x
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    } else {
        mascotaEnemigo = enemigo
        mascotaEnemigoAtaques = [...mascotaEnemigo.ataque]
        window.removeEventListener("keydown", keysPressed)
        window.removeEventListener("keyup", keysReleased)
        revelarAtaque()
    }
}

function revelarAtaque() {
    q("#ver-mapa").style.display = "none"
    q("#seleccionar-ataque").hidden = false
    tipoSuperior(mascotaJugador, mascotaEnemigo)
    ponerFotos()
    ponerTexto()
    if (continuando) {
        return
    } else {
        ponerAtaques()
        botonesAtaque()
    }
}

function botonesAtaque() {
    qa(".ataque").forEach(boton => {
        boton.addEventListener("click", () => {
            ataquesRealizados += 1
            boton.style.background = "#112f58"
            boton.disabled = true

            eleccionDeAtaques(boton)
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
                    continuar()
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
    manejadorAtaquesEnemigo()
}

function aleatorio(min, max) {
    let resultado = Math.floor(Math.random() * (max - min + 1)) + min
    return resultado
}

function manejadorAtaquesEnemigo() {
    ataqueEnemigo = mascotaEnemigo.ataque[aleatorio(0, mascotaEnemigo.ataque.length - 1)]
    ataqueEnemigoValue = parseInt(ataqueEnemigo.value)

    // Remueve los ataques que el enemigo ya uso
    index = mascotaEnemigo.ataque.indexOf(ataqueEnemigo)
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

function continuar() {
    q("#boton-continuar").hidden = false
    q("#boton-continuar").addEventListener("click", () => {
        continuando = true
        q("#reiniciar").hidden = true
        q("#boton-continuar").hidden = true
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
        mascotaEnemigo.ataque = [...mascotaEnemigoAtaques]
        q("#seleccionar-ataque").hidden = true
        q("#ver-mapa").style.display = "flex"
        window.addEventListener("keydown", keysPressed, false)
        window.addEventListener("keyup", keysReleased, false)
        mascotaEnemigo.x = -500
        mascotaEnemigo.y = -500
    })
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
        mascotaEnemigo.ataque = [...mascotaEnemigoAtaques]
    })
}