class Mokepon {
    constructor(n, f, v, t, tt) {
        this.nombre = n
        this.foto = f
        this.victoria = v
        this.ataque = []
        this.tooltip = t
        this.tooltipText = tt
    }
}

const q = selector => document.querySelector(selector) // shortcut para document.querySelector
const qa = selector => document.querySelectorAll(selector) // shortcut para document.querySelectorAll

let mascotaJugador
let mascotaEnemigo
let mokepones = [
    new Mokepon("Hipodoge", "https://i.imgur.com/bceFwyB.png", 0, "doge", "El mejor amigo del hombre"),
    new Mokepon("Capipepo", "https://i.imgur.com/mmyMNCU.png", 0, "pepo", "Mitad capibara mitad es un enigma"),
    new Mokepon("Ratigueya", "https://i.imgur.com/NIs4hyy.png", 0, "gueya", "Con todo el poder de un niño rata")
]

mokepones[0].ataque.push(
    {nombre: "💧", id: "boton-agua", value: "1", nombreBoton: "Agua 💧", tooltipId: "agua", tooltipText: "Apaga el fuego"},
    {nombre: "💧", id: "boton-agua", value: "1", nombreBoton: "Agua 💧", tooltipId: "agua", tooltipText: "Apaga el fuego"},
    {nombre: "💧", id: "boton-agua", value: "1", nombreBoton: "Agua 💧", tooltipId: "agua", tooltipText: "Apaga el fuego"},
    {nombre: "🔥", id: "boton-fuego", value: "0", nombreBoton: "Fuego 🔥", tooltipId: "fuego", tooltipText: "Quema las plantas"},
    {nombre: "🌱", id: "boton-planta", value: "2", nombreBoton: "Planta 🌱", tooltipId: "planta", tooltipText: "Absorbe el agua"},
)

mokepones[1].ataque.push(
    {nombre: "🌱", id: "boton-planta", value: "2", nombreBoton: "Planta 🌱", tooltipId: "planta", tooltipText: "Absorbe el agua"},
    {nombre: "🌱", id: "boton-planta", value: "2", nombreBoton: "Planta 🌱", tooltipId: "planta", tooltipText: "Absorbe el agua"},
    {nombre: "🌱", id: "boton-planta", value: "2", nombreBoton: "Planta 🌱", tooltipId: "planta", tooltipText: "Absorbe el agua"},
    {nombre: "🔥", id: "boton-fuego", value: "0", nombreBoton: "Fuego 🔥", tooltipId: "fuego", tooltipText: "Quema las plantas"},
    {nombre: "💧", id: "boton-agua", value: "1", nombreBoton: "Agua 💧", tooltipId: "agua", tooltipText: "Apaga el fuego"},
)

mokepones[2].ataque.push(
    {nombre: "🔥", id: "boton-fuego", value: "0", nombreBoton: "Fuego 🔥", tooltipId: "fuego", tooltipText: "Quema las plantas"},
    {nombre: "🔥", id: "boton-fuego", value: "0", nombreBoton: "Fuego 🔥", tooltipId: "fuego", tooltipText: "Quema las plantas"},
    {nombre: "🔥", id: "boton-fuego", value: "0", nombreBoton: "Fuego 🔥", tooltipId: "fuego", tooltipText: "Quema las plantas"},
    {nombre: "💧", id: "boton-agua", value: "1", nombreBoton: "Agua 💧", tooltipId: "agua", tooltipText: "Apaga el fuego"},
    {nombre: "🌱", id: "boton-planta", value: "2", nombreBoton: "Planta 🌱", tooltipId: "planta", tooltipText: "Absorbe el agua"},
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

function aleatorio(min, max) {
    let resultado = Math.floor(Math.random() * (max - min + 1)) + min;
    return resultado;
}

// funcion que se ejecuta cuando se aprieta el boton de seleccionar mascota
q('#boton-mascota').addEventListener('click', () => {
    if (q('#seleccionar-mascota input:checked')) {
        mascotaJugador = q('#seleccionar-mascota input:checked').value
        mascotaEnemigo = mokepones[aleatorio(0, mokepones.length - 1)]

        // Este while esta para que la computadora eliga un mokepon diferente al jugador
        while (mascotaJugador == mascotaEnemigo.nombre) {
            mascotaEnemigo = mokepones[aleatorio(0, mokepones.length - 1)]
        }

        // Este for pone las fotos de los mokepones seleccionados en la seccion de ataque
        for (let i = 0; i < mokepones.length; i++) {
            if (mascotaJugador == mokepones[i].nombre) {
                mascotaJugador = mokepones[i]
                q("#foto-jugador").src = mascotaJugador.foto
                q("#foto-enemigo").src = mascotaEnemigo.foto
            }
        }

        // cambia el texto en elegir ataque por la mascota que elige el usuario
        q("#mascota-jugador").innerHTML = mascotaJugador.nombre
        q("#mascota-enemigo").innerHTML = mascotaEnemigo.nombre
        // y luego cambia el texto del enemigo por una mascota que se elige aleatoriamente

        // Le agrega dinamismo a la página, agregando automáticamente botones de ataque
        // Aunque agregar mas de 3 hace problemático el uso de tooltips
        mascotaJugador.ataque.forEach(ataque => {
            q('.botones-ataque').innerHTML += `
            <div class="botones-ataque2">
                <button id=${ataque.id} class="ataque" value=${ataque.value}>${ataque.nombreBoton}</button>
                <span class="tooltip-text tooltip-ataque" id="tooltip-${ataque.tooltipId}">${ataque.tooltipText}</span>
            </div>
            `
        });

        q("#seleccionar-mascota").hidden = true
        q("#seleccionar-ataque").hidden = false
        // una vez seleccionado el mokepon, oculto el area de seleccion y revelo el area de ataques

        // Le doy interactividad a los botones de clase ataque
        qa(".ataque").forEach(boton => {
            boton.addEventListener("click", (e) => {
                // boton = e.target
                boton.style.background = "#112f58"
                boton.disabled = true
                const ataqueJugador = e.target.innerHTML
                const ataqueJugadorValue = parseInt(e.target.value)
                const ataqueAleatorio = mascotaEnemigo.ataque[aleatorio(0, mascotaEnemigo.ataque.length - 1)]
                const ataqueEnemigo = ataqueAleatorio.nombre
                const ataqueEnemigoValue = parseInt(ataqueAleatorio.value)
                const index = mascotaEnemigo.ataque.indexOf(ataqueAleatorio)

                // Remueve los ataques que el enemigo ya uso
                if (index > -1) { // only splice array when item is found
                    mascotaEnemigo.ataque.splice(index, 1) // 2nd parameter means remove one item only
                }

                q("#mensaje-jugador").innerHTML += ataqueJugador.slice(-2) + "<br>" //el slice es para que solo me de el simbolo del ataque
                q("#mensaje-enemigo").innerHTML += ataqueEnemigo + "<br>"

                if (ataqueJugadorValue == ataqueEnemigoValue) {
                    return
                } else if (ataqueJugadorValue == ataqueEnemigoValue + 1 || ataqueJugadorValue == ataqueEnemigoValue - 2) {
                    mascotaJugador.victoria += 1
                    q("#victoria-jugador").innerHTML = mascotaJugador.victoria
                } else {
                    mascotaEnemigo.victoria += 1
                    q("#victoria-enemigo").innerHTML = mascotaEnemigo.victoria
                }

                if (mascotaEnemigo.ataque.length < 1) { // esto no sucede hasta que el enemigo haga todos sus ataques
                    if (mascotaJugador.victoria < mascotaEnemigo.victoria) {

                        q("#resultado-final").innerHTML = `Su ${mascotaEnemigo.nombre} derroto a tu ${mascotaJugador.nombre}.<p>
                        <a href="https://www.youtube.com/watch?v=dwLCjZVEtpE&ab_channel=SathButtons"
                        target="_blank" rel="noopener noreferrer">Has perdido, pero no te rindas! 🤕</a><p>Fin del combate.`
                        // Agrego un link en el texto. target="_blank" es para que se abra en una nueva tab
                        // y uso rel="noopener noreferrer" para prevenir un tipo de phishing conocido como tabnabbing.
                        qa(".botones-ataque2").forEach(boton => boton.remove())
                        // Alternativamente, en lugar de borrar los botones puedo deshabilitarlos asi:
                        // qa(".botones-ataque2").forEach(boton => boton.disabled = true)
                        q("#reiniciar").hidden = false

                    } else if (mascotaJugador.victoria > mascotaEnemigo.victoria) {

                        q("#resultado-final").innerHTML = `Tu ${mascotaJugador.nombre} derroto a su ${mascotaEnemigo.nombre}.<p>
                        <a href="https://www.youtube.com/watch?v=TcZJHIzW9-w&ab_channel=NobuoUematsu-Topic"
                        target="_blank" rel="noopener noreferrer">Felicitaciones, has Ganado! 🎊</a><p>Fin del combate.`
                        qa(".botones-ataque2").forEach(boton => boton.remove())
                        q("#reiniciar").hidden = false
                    }
                }
            })
        })

    } else {
        alert("No has seleccionado nada!")
        // si se aprieta un boton antes de seleccionar una mascota sale esto
    }
})

q("#boton-reiniciar").addEventListener("click", () => {
    location.reload() // reloads the page
})