window.onload = function() {

    //variables 

    var palabra = "pablo"
    var rowActual = 0
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

    //funciones

    // function inicio () {
    //     for (let iFila = 0; iFila < letras.length; iFila++) {
    //         for (let iCol = 0; iCol < letras[iFila].length; iCol++) {
    //             var id = "r"+iFila+"c"+iCol
    //             var input = document.getElementById(id)
    //             input.oninput = function() {
    //                 letras[iFila][iCol] = this.value
    //                 console.log(letras)
    //             }
    //         }
    //     }
    // }

    function validaPalabra () {
        if(validaRenglonCompleto()) {
            console.log("ok")
        } else {
            console.log("no ok")
        }
    }

    function validaRenglonCompleto () {
        var filaCompleta = true
        for (let iiFila = 0; iiFila < 5; iiFila++) {
            var celda = "r"+rowActual+"c"+iiFila
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