window.onload = function() {

    //variables 

    var palabra = "pablo"
    var filaActual = 0
    var colActual = 0
    var enviar = document.getElementById("enviar")
    var letras = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ]

    //eventos

    enviar.addEventListener("click", validaPalabra)
    document.addEventListener("keydown", focus)

    //funciones

    function validaPalabra () {
        if(validaRenglonCompleto()) {
            console.log("ok")
        } else {
            console.log("DEBE COMPLETAR EL RENGLÓN!")
        }
    }

    function focus () {
        if(event.keyCode > 64 && event.keyCode < 91 || event.keyCode == 192) {
            var celdaActual = "r" + filaActual + "c" + colActual
            var celda = document.getElementById(celdaActual)
            celda.value = event.key
            if(colActual < 4) {
                colActual++
            } else {
                validaPalabra()
                colActual = 0
                filaActual++
            }
        }
    }

    function validaRenglonCompleto () {
        var filaCompleta = true
        for (let iiFila = 0; iiFila < 5; iiFila++) {
            var celda = "r"+filaActual+"c"+iiFila
            var iCelda = document.getElementById(celda)
            
            if (iCelda.value != "") {
                filaCompleta = filaCompleta * true
                iCelda.disabled = true
            } else {
                filaCompleta = filaCompleta * false
            }
        }
        return filaCompleta
    }

}