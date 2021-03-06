window.onload = function() {

    //variables 

    var palabra = "RAJAR"
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

    function desCampos() {          //deshabilita todos los campos para que el usuario no los pueda usar
        for (let iFila = 0; iFila < letras.length; iFila++) {
            for (let iCol = 0; iCol < letras[iFila].length; iCol++) {
                var id = "r"+iFila+"c"+iCol
                var celda = document.getElementById(id)
                celda.disabled = true
            }
        }
    }

    function focus() {              //detecta que sea una letra lo ingresado y en función de eso corre el focus o renglon
        if(colActual < 5 && event.keyCode > 64 && event.keyCode < 91 || event.keyCode == 192) {
            var celdaActual = "r" + filaActual + "c" + colActual
            var celda = document.getElementById(celdaActual)
            celda.value = event.key.toUpperCase()
            letras[filaActual][colActual] = event.key
            if(colActual < 5) {
                colActual++
            }
        }
        if(event.keyCode == 13) {
            validaPalabra()
            
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

    function validaPalabra() {      //cuando presiona enter, hace las validaciones de la palabra y si esta completo
        if(validaRenglonCompleto()) {
            obtenerPalabra()
            if(filaActual < 5) {
                filaActual++
            } else {
                console.log("JUEGO FINALIZADO!")
            }
            colActual = 0
        } else {
            console.log("DEBE COMPLETAR EL RENGLÓN!")
        }
    }

    function validaRenglonCompleto() {      //valida que el renglón este completo
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

    function obtenerPalabra() {         //si el renglón esta completo, procesa la palabra con las validaciones
        for (let idCelda = 0; idCelda < 5; idCelda++) {
            var celda = "r" + filaActual + "c" + idCelda
            var iCelda = document.getElementById(celda)
            if(palabra.charAt(idCelda) == iCelda.value) {    //compara las letras de la palabra con el valor de celda
                iCelda.classList.add("bg-green")
            } else {
                if(palabra.match(iCelda.value)) {
                    iCelda.classList.add("bg-yellow")
                } else {
                    iCelda.classList.add("bg-gray")
                }
            }
        }
    }

}