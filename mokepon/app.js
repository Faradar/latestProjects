document.getElementById('boton-mascota').addEventListener('click', () => {
    try {
        alert(`Usted a seleccionado ${document.querySelector('#seleccionar-mascota input:checked').id}`)
    } catch (error) {
        alert("No ha seleccionado nada!")
    }
})