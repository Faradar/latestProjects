const mokepones = ["Hipodoge", "Capipepo", "Ratigueya"]
const ataques = ["Fuego", "Agua", "Tierra"]
const q = selector => document.querySelector(selector) // shortcut para document.querySelector
const qa = selector => document.querySelectorAll(selector) // shortcut para document.querySelectorAll

let mascotaJugador
let mascotaEnemigo

// funcion que se ejecuta cuando se aprieta el boton de seleccionar mascota
q('#boton-mascota').addEventListener('click', () => {
    if (q('#seleccionar-mascota input:checked')) {
        mascotaJugador = q('#seleccionar-mascota input:checked').value
        mascotaEnemigo = mokepones[Math.floor(Math.random() * 3)] 
        // cambia el texto en elegir ataque por la mascota que elige el usuario
        q("#mascota-jugador").innerHTML = mascotaJugador
        q("#mascota-enemigo").innerHTML = mascotaEnemigo
        // cambia el texto del enemigo en elegir ataque por la mascota que se elige aleatoriamente
    } else {
        alert("No has seleccionado nada!") 
        // si se aprieta un boton antes de seleccionar una mascota sale esto
    }
})

// Le doy interactividad a los botones de clase ataque
qa(".ataque").forEach(boton => {
    boton.addEventListener("click", (e) => {
        if (mascotaJugador) {
            
            const ataqueJugador = e.target.innerHTML
            const ataqueJugadorValue = parseInt(e.target.value)
            const ataqueAleatorio = qa(".ataque")[Math.floor(Math.random() * 3)]
            const ataqueEnemigo = ataqueAleatorio.innerHTML
            const ataqueEnemigoValue = parseInt(ataqueAleatorio.value)
            
            console.log(ataqueJugadorValue, ataqueEnemigoValue)
    
            ataqueJugadorValue == ataqueEnemigoValue ? resultado = "Empataron! 😮" 
                : ataqueJugadorValue == ataqueEnemigoValue + 1 
                || ataqueJugadorValue == ataqueEnemigoValue - 2 
                ? (resultado = "Ganaste! 🎉", q("#vida-enemigo").innerHTML -= 1)
                    : (resultado = "Perdiste! 😱" , q("#vida-jugador").innerHTML -= 1)
    
            q("#mensajes > p").innerHTML += `Tu ${mascotaJugador} atacó con ${ataqueJugador}, 
            su ${mascotaEnemigo} ataco con ${ataqueEnemigo} - ${resultado}<p>`

            if (q("#vida-jugador").innerHTML == 0) {

                q("#resultado-final").innerHTML = `Su ${mascotaEnemigo} derroto a tu ${mascotaJugador}.<p>
                <a href="https://www.youtube.com/watch?v=dwLCjZVEtpE&ab_channel=SathButtons" 
                target="_blank" rel="noopener noreferrer">Has perdido, pero no te rindas! 🤕</a><p>Fin del combate.`
                // Agrego un link en el texto. target="_blank" es para que se abra en una nueva tab 
                // y uso rel="noopener noreferrer" para prevenir un tipo de phishing conocido como tabnabbing.
                qa(".ataque").forEach(boton => boton.remove())

            } else if (q("#vida-enemigo").innerHTML == 0) {

                q("#resultado-final").innerHTML = `Tu ${mascotaJugador} derroto a su ${mascotaEnemigo}.<p>
                <a href="https://www.youtube.com/watch?v=TcZJHIzW9-w&ab_channel=NobuoUematsu-Topic" 
                target="_blank" rel="noopener noreferrer">Felicitaciones, has Ganado! 🎊</a><p>Fin del combate.`
                qa(".ataque").forEach(boton => boton.remove())
            }
        } else {
            alert("No has seleccionado nada!") 
            // si se aprieta un boton antes de seleccionar una mascota sale esto
        }            
    })
})

q("#boton-reiniciar").addEventListener("click", () => {
    window.location.reload() // reloads the page
})