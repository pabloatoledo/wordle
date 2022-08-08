window.onload = function () {
    var nombre = document.getElementById("nombre")
    var email = document.getElementById("email")
    var comentarios = document.getElementById("mensaje")
    var btnEnviar = document.getElementById("btnEnviar")
    var btnVolver = document.getElementById("btnVolver")
    var btnCodigo = document.getElementById("btnCodigo")
    var errNom = document.getElementById("errNom")
    var errMail = document.getElementById("errMail")
    var errCom = document.getElementById("errCom")
    var campComp = true

    nombre.addEventListener("blur", valNom)
    nombre.addEventListener("focus", remErrNom)
    email.addEventListener("blur", valEmail)
    email.addEventListener("focus", remErrMail)
    comentarios.addEventListener("blur", valComen)
    comentarios.addEventListener("focus", remErrCom)
    btnEnviar.addEventListener("click", verifTodo)
    btnVolver.addEventListener("click", vuelveHome)
    btnCodigo.addEventListener("click", abreCodigo)

    function showErrNom () {
        errNom.classList.remove("oculto")
        nombre.style.borderColor = "red"
    }
    function remErrNom () {
        errNom.classList.add("oculto")
        nombre.style.borderColor = "black"
    }
    function showErrMail () {
        errMail.classList.remove("oculto")
        email.style.borderColor = "red"
    }
    function remErrMail () {
        errMail.classList.add("oculto")
        email.style.borderColor = "black"
    }
    function showErrCom () {
        errCom.classList.remove("oculto")
        comentarios.style.borderColor = "red"
    }
    function remErrCom () {
        errCom.classList.add("oculto")
        comentarios.style.borderColor = "black"
    }

    //valida campos

    function valNom () {
        var caracteres = /^[ 0-9a-zA-ZáéíóúÁÉÍÓÚñ]+$/
        if (nombre.value.length < 3 || !caracteres.test(nombre.value)) {
            campComp = campComp * false
            showErrNom()
        } else {
            campComp = campComp * true
        }
    }

    function valEmail () {
        var emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
        if (!emailRegex.test(email.value)) {
            campComp = campComp * false
            showErrMail()
        } else {
            campComp = campComp * true
        }
    }

    function valComen () {
        if(comentarios.value.length < 5) {
            campComp = campComp * false
            showErrCom()
        } else {
            campComp = campComp * true
        }
    }

    function verifTodo () {
        campComp = true
        valNom()
        valEmail()
        valComen()
        if (campComp) {
            var mensaje = "Hola, mi nombre es " + nombre.value + " y mi dirección de correo electrónico es " + email.value + ". Quiero enviarles el siguiente mensaje: " + comentarios.value
            window.open('mailto:contacto@finallppa.com?subject=Contacto desde la web&body=' + mensaje)
        }
    }

    function vuelveHome () {
        document.location.href = "../index.html"
    }

    function abreCodigo () {                    //abre la pagina de github con el codigo
        window.open("https://github.com/pabloatoledo/wordle", "_blank")
    }
}