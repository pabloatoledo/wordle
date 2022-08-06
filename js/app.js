window.onload = function() {

    //variables 

    var btnLetra = document.getElementsByClassName("letra")     //busca los botones del teclado
    var numBtns = btnLetra.length
    var letTeclado = "QWERTYUIOPASDFGHJKLÑZXCVBNM"              //para validar letras usadas y pintar el teclado
    var enter = document.getElementById("enviar")
    var borrar = document.getElementById("borrar")
    var empJuego = document.getElementById("jugar")
    var nombre = document.getElementById("nombre")
    var palabra = "RAJAR"                       //palabra a encontrar en el tablero
    var filaActual = 0                          //determina la fila actual (principalmente en el focus)
    var colActual = 0                           //determina la columna actual (principalmente en el focus)
    var palCorrecta = false                     //determina si la palabra en el renglon es la correcta
    var jugar = false                           //determina si el juego finalizo o no
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

    empJuego.addEventListener("click", startJuego)
    enter.addEventListener("click",validaPalabra)
    borrar.addEventListener("click",borraLetra)
    document.addEventListener("keydown", focus)
    for (var i = 0; i < numBtns; i++) {
        btnLetra[i].addEventListener('click', focus);  
    }

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

    function startJuego () {
        if (nombre.value != "") {
            jugar = true
        } else {
            console.log("falta poner el nombre boludo")
            opModFalNom()
        }
    }

    function focus() {              //detecta que sea una letra lo ingresado y en función de eso corre el focus o renglon
        if(jugar == true && colActual < 5 && event.keyCode > 64 && event.keyCode < 91 || event.keyCode == 192) {
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
        if(jugar == true && colActual < 5 && this.value != null) {        //ingresa valores desde el teclado
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
            }
            colActual = 0
        } else {
            alert("La palabra no esta completa")
        }
    }

    function borraLetra () {        //cuando el usuario presiona en la tecla borrar, borra la letra del tablero
        if(colActual > 0) {
            colActual--
        }
        var celdaActual = "r" + filaActual + "c" + colActual
        var celda = document.getElementById(celdaActual)
        celda.value = ""
    }

    function validaRenglonCompleto() {          //valida que el renglón este completo
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

    function obtenerPalabra() {                 //procesa la palabra con las validaciones y obtiene la palabra
        var newPalabra = palabra
        palCorrecta = true
        //revisa los verdes
        for (let colCelda = 0; colCelda < 5; colCelda++) {
            var celda = recCeldas(colCelda)
            if(palabra.charAt(colCelda) == celda.value) {    //compara las letras de la palabra con el valor de celda
                celda.classList.add("bg-green")
                pintaTeclado(celda, "bg-green")
                newPalabra = newPalabra.replace(celda.value, "*")
                palCorrecta = palCorrecta * true
            } else {
                palCorrecta = palCorrecta * false
            }
        }
        //revisa los amarillos - grises
        for (let colCelda = 0; colCelda < 5; colCelda++) {          //revisa que encuentre la letra en la variable que dejo el verde
            var celda = recCeldas(colCelda)                         //y que no sea verde tampoco
            if(newPalabra.match(celda.value) && palabra.charAt(colCelda) != celda.value) {
                newPalabra = newPalabra.replace(celda.value, "*")       
                celda.classList.add("bg-yellow")
                pintaTeclado(celda, "bg-yellow")
            }
            else if(palabra.charAt(colCelda) != celda.value) {
                celda.classList.add("bg-gray")
                pintaTeclado(celda, "bg-gray")
            }
        }
        if (palCorrecta) {
            jugar = false
            ganaJuego()
        } else if (filaActual == 5) {
            jugar = false
            pierdeJuego()
        }
    }

    function recCeldas (idCel) {                //recorre las celdas y devuelve el valor rXcX
        var celda = "r" + filaActual + "c" + idCel
        var iCelda = document.getElementById(celda)
        return iCelda
    }

    function pintaTeclado (celda, color) {      //pinta el teclado con los colores que determine la funcion obtenerPalabra
        if (letTeclado.match(celda.value)) {
            letTeclado.replace(celda.value, "*")
            var idBtnLet = "let" + celda.value
            var btnLet = document.getElementById(idBtnLet)
            btnLet.classList.add(color)
        }
    }

    function ganaJuego () {                     //se dispara cuando se gana el juego
        opModGano()
    }

    function pierdeJuego () {                   //se dispara cuando se pierde el juego
        opModPerdio()
    }

    // ---------- modales ---------- //

    //DOM
    var modalGano = document.getElementById("modalGano")
    var modalPerdio = document.getElementById("modalPerdio")
    var modalNombre = document.getElementById("modalFaltaNombre")
    var closeNombre = document.getElementsByClassName("closeNombre")[0]
    var closeGano = document.getElementsByClassName("closeGano")[0]
    var closePerdio = document.getElementsByClassName("closePerdio")[0]

    //cierra modales
    closeGano.onclick = function() {
        modalGano.classList.remove("block")
        modalGano.classList.add("oculto")
    }
    closePerdio.onclick = function() {
        modalPerdio.classList.remove("block")
        modalPerdio.classList.add("oculto")
    }
    closeNombre.onclick = function() {
        modalNombre.classList.remove("block")
        modalNombre.classList.add("oculto")
    }
    window.onclick = function(event) {
        if (event.target == modalGano) {
            modalGano.classList.remove("block")
            modalGano.classList.add("oculto")
        }
        if (event.target == modalPerdio) {
            modalPerdio.classList.remove("block")
            modalPerdio.classList.add("oculto")
        }
        if (event.target == modalNombre) {
            modalNombre.classList.remove("block")
            modalNombre.classList.add("oculto")
        }
    }

    //abre modales
    function opModGano () {
        modalGano.classList.remove("oculto")
        modalGano.classList.add("block")
    }
    function opModPerdio () {
        modalPerdio.classList.remove("oculto")
        modalPerdio.classList.add("block")
    }
    function opModFalNom () {
        modalNombre.classList.remove("oculto")
        modalNombre.classList.add("block")
    }
}

