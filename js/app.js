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

    //inicio

    desCampos()

    //eventos

    enviar.addEventListener("click", validaPalabra)
    document.addEventListener("keydown", focus)
    
    //funciones

    function desCampos() {
        for (let iFila = 0; iFila < letras.length; iFila++) {
            for (let iCol = 0; iCol < letras[iFila].length; iCol++) {
                var id = "r"+iFila+"c"+iCol
                var celda = document.getElementById(id)
                celda.disabled = true
            }
        }
    }

    function validaPalabra() {
        if(validaRenglonCompleto()) {
            console.log("ok")
            colActual = 0
        } else {
            console.log("DEBE COMPLETAR EL RENGLÓN!")
        }
    }

    function focus() {
        if(colActual < 5 && event.keyCode > 64 && event.keyCode < 91 || event.keyCode == 192) {
            var celdaActual = "r" + filaActual + "c" + colActual
            var celda = document.getElementById(celdaActual)
            celda.value = event.key
            letras[filaActual][colActual] = event.key
            if(colActual < 5) {
                colActual++
            }
        }
        if(event.keyCode == 13) {
            validaPalabra()
            if(filaActual < 5) {
                filaActual++
            } else {
                console.log("JUEGO FINALIZADO!")
            }
        }
        if(event.keyCode == 8) {
            if(colActual > 0) {
                colActual--
            }
            var celdaActual = "r" + filaActual + "c" + colActual
            var celda = document.getElementById(celdaActual)
            celda.value = ""
        }
    }

    function validaRenglonCompleto() {
        var filaCompleta = true
        for (let iiFila = 0; iiFila < 5; iiFila++) {
            var celda = "r"+filaActual+"c"+iiFila
            var iCelda = document.getElementById(celda)
            
            if (iCelda.value != "") {
                filaCompleta = filaCompleta * true
            } else {
                filaCompleta = filaCompleta * false
            }
        }
        return filaCompleta
    }

}