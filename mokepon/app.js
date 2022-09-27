const mokepones = ["Hipodoge", "Capipepo", "Ratigueya"]
const mokeponesImg = ["https://i.imgur.com/bceFwyB.png", "https://i.imgur.com/mmyMNCU.png", "https://i.imgur.com/NIs4hyy.png"]
const vidas = ["💀", "❤", "❤❤", "❤❤❤"]
const q = selector => document.querySelector(selector) // shortcut para document.querySelector
const qa = selector => document.querySelectorAll(selector) // shortcut para document.querySelectorAll

let mascotaJugador
let mascotaEnemigo
let vidaJ = 3
let vidaE = 3

// funcion que se ejecuta cuando se aprieta el boton de seleccionar mascota
q('#boton-mascota').addEventListener('click', () => {
    if (q('#seleccionar-mascota input:checked')) {
        mascotaJugador = q('#seleccionar-mascota input:checked').value
        mascotaEnemigo = mokepones[Math.floor(Math.random() * 3)]
        // Este while esta para que la computadora eliga un mokepon diferente al jugador
        while (mascotaJugador == mascotaEnemigo) {
            mascotaEnemigo = mokepones[Math.floor(Math.random() * 3)]
        }
        // cambia el texto en elegir ataque por la mascota que elige el usuario
        q("#mascota-jugador").innerHTML = mascotaJugador
        q("#mascota-enemigo").innerHTML = mascotaEnemigo
        // y luego cambia el texto del enemigo por una mascota que se elige aleatoriamente

        // Este for pone las fotos de los mokepones seleccionados en la seccion de ataque
        for (let i = 0; i < mokeponesImg.length; i++) {
            if (mascotaJugador == mokepones[i]) {
                q("#foto-jugador").src = mokeponesImg[i]
            }

            if (mascotaEnemigo == mokepones[i]) {
                q("#foto-enemigo").src = mokeponesImg[i]
            }
        }

        q("#seleccionar-mascota").hidden = true
        q("#seleccionar-ataque").hidden = false
        // una vez seleccionado el mokepon, oculto el area de seleccion y revelo el area de ataques
    } else {
        alert("No has seleccionado nada!")
        // si se aprieta un boton antes de seleccionar una mascota sale esto
    }
})

// Le doy interactividad a los botones de clase ataque
qa(".ataque").forEach(boton => {
    boton.addEventListener("click", (e) => {
        const ataqueJugador = e.target.innerHTML
        const ataqueJugadorValue = parseInt(e.target.value)
        const ataqueAleatorio = qa(".ataque")[Math.floor(Math.random() * 3)]
        const ataqueEnemigo = ataqueAleatorio.innerHTML
        const ataqueEnemigoValue = parseInt(ataqueAleatorio.value)

        if (ataqueJugadorValue == ataqueEnemigoValue) {
            resultado = "Empataron! 🤝🏼"
        } else if (ataqueJugadorValue == ataqueEnemigoValue + 1 || ataqueJugadorValue == ataqueEnemigoValue - 2) {
            resultado = "Ganaste! 🎉"
            vidaE -= 1
            q("#vida-enemigo").innerHTML = vidas[vidaE]
        } else {
            resultado = "Perdiste! 😱"
            vidaJ -= 1
            q("#vida-jugador").innerHTML = vidas[vidaJ]
        }

        q("#mensaje-jugador").innerHTML += ataqueJugador + "<br>"
        q("#mensaje-enemigo").innerHTML += ataqueEnemigo + "<br>"

        if (q("#vida-jugador").innerHTML == "💀") {

            q("#resultado-final").innerHTML = `Su ${mascotaEnemigo} derroto a tu ${mascotaJugador}.<p>
            <a href="https://www.youtube.com/watch?v=dwLCjZVEtpE&ab_channel=SathButtons"
            target="_blank" rel="noopener noreferrer">Has perdido, pero no te rindas! 🤕</a><p>Fin del combate.`
            // Agrego un link en el texto. target="_blank" es para que se abra en una nueva tab
            // y uso rel="noopener noreferrer" para prevenir un tipo de phishing conocido como tabnabbing.
            qa(".botones-ataque2").forEach(boton => boton.remove())
            // Alternativamente, en lugar de borrar los botones puedo deshabilitarlos asi:
            // qa(".botones-ataque2").forEach(boton => boton.disabled = true)
            q("#reiniciar").hidden = false

        } else if (q("#vida-enemigo").innerHTML == "💀") {

            q("#resultado-final").innerHTML = `Tu ${mascotaJugador} derroto a su ${mascotaEnemigo}.<p>
            <a href="https://www.youtube.com/watch?v=TcZJHIzW9-w&ab_channel=NobuoUematsu-Topic"
            target="_blank" rel="noopener noreferrer">Felicitaciones, has Ganado! 🎊</a><p>Fin del combate.`
            qa(".botones-ataque2").forEach(boton => boton.remove())
            q("#reiniciar").hidden = false
        }
    })
})

q("#boton-reiniciar").addEventListener("click", () => {
    location.reload() // reloads the page
})