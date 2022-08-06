window.onload = function() {

    //variables 

    var btnLetra = document.getElementsByClassName("letra")
    var numBtns = btnLetra.length
    var letTeclado = "QWERTYUIOPASDFGHJKLÑZXCVBNM"
    var enter = document.getElementById("enviar")
    var borrar = document.getElementById("borrar")
    var palabra = "RAJAR"
    var filaActual = 0
    var colActual = 0
    var palCorrecta = false
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

    for (var i = 0; i < numBtns; i++) {
        btnLetra[i].addEventListener('click', focus);  
    }
    enter.addEventListener("click",validaPalabra)
    borrar.addEventListener("click",borraLetra)
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
        console.log(this.value)
        if(colActual < 5 && event.keyCode > 64 && event.keyCode < 91 || event.keyCode == 192) {
            var celda = recCeldas(colActual)
            celda.value = event.key.toUpperCase()
            letras[filaActual][colActual] = event.key
            if(colActual < 5) {
                colActual++
            }
        }
        if(event.keyCode == 13) {       //tecla enter
            validaPalabra()
            
        }
        if(event.keyCode == 8) {        //tecla borrar
            borraLetra()
        }
        if(colActual < 5 && this.value != null) {        //ingresa valores desde el teclado
            var celda = recCeldas(colActual)
            celda.value = this.value
            letras[filaActual][colActual] = this.value
            if(colActual < 5) {
                colActual++
            }
        }
    }

    function validaPalabra() {      //cuando presiona enter, hace las validaciones de la palabra y si esta completo
        if(validaRenglonCompleto()) {
            obtenerPalabra()
            if(filaActual < 5) {
                filaActual++
            } else {
                alert("Finalizó el juego!!")
            }
            colActual = 0
        } else {
            alert("La palabra no esta completa")
        }
    }

    function borraLetra () {
        if(colActual > 0) {
            colActual--
        }
        var celdaActual = "r" + filaActual + "c" + colActual
        var celda = document.getElementById(celdaActual)
        celda.value = ""
    }

    function validaRenglonCompleto() {      //valida que el renglón este completo
        var filaCompleta = true
        for (let colCelda = 0; colCelda < 5; colCelda++) {
            var celda = recCeldas(colCelda)
            if (celda.value != "") {
                filaCompleta = filaCompleta * true
            } else {
                filaCompleta = filaCompleta * false
            }
        }
        return filaCompleta
    }

    function obtenerPalabra() {         //si el renglón esta completo, procesa la palabra con las validaciones y obtiene la palabra
        var newPalabra = palabra
        palCorrecta = true
        //revisa los verdes
        for (let colCelda = 0; colCelda < 5; colCelda++) {
            var celda = recCeldas(colCelda)
            if(palabra.charAt(colCelda) == celda.value) {    //compara las letras de la palabra con el valor de celda
                celda.classList.add("bg-green")
                newPalabra = newPalabra.replace(celda.value, "*")
                palCorrecta = palCorrecta * true
                pintaTeclado(celda, "bg-green")
            } else {
                palCorrecta = palCorrecta * false
            }
        }
        //revisa los amarillos - grises
        for (let colCelda = 0; colCelda < 5; colCelda++) {
            var celda = recCeldas(colCelda)
            if(newPalabra.match(celda.value) && palabra.charAt(colCelda) != celda.value) {
                celda.classList.add("bg-yellow")
                newPalabra = newPalabra.replace(celda.value, "*")
                pintaTeclado(celda, "bg-yellow")
            }
            else if(palabra.charAt(colCelda) != celda.value) {
                celda.classList.add("bg-gray")
                pintaTeclado(celda, "bg-gray")
            }
        }
        if (palCorrecta) {
            alert("GANO EL JUEGO!!!")
        }
    }

    function recCeldas (idCel) {                // recorre las celdas y devuelve el valor rXcX
        var celda = "r" + filaActual + "c" + idCel
        var iCelda = document.getElementById(celda)
        return iCelda
    }

    function pintaTeclado (celda, color) {
        if (letTeclado.match(celda.value)) {
            letTeclado.replace(celda.value, "*")
            var idBtnLet = "let" + celda.value
            var btnLet = document.getElementById(idBtnLet)
            btnLet.classList.add(color)
        }
    }
}