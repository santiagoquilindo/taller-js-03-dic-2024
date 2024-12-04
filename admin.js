document.addEventListener("DOMContentLoaded", () => {
    let urlAdministrador = "https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/administrador.json";

    fetch(urlAdministrador)
        .then(respuesta => respuesta.json())
        .then(administrador => {
            validarUsuario(administrador);
        }).catch(error => {
            console.error("Error al cargar el archivo JSON:", error);
        });

});

function validarUsuario(administrador) {
    const botonIniciarElecciones = document.getElementById("ingresar");
    botonIniciarElecciones.addEventListener("click", () => {
        let contenedor = document.getElementById("candidatos");

        let usuario = document.getElementById("usuario").value;
        let clave = document.getElementById("clave").value;

        if (usuario === administrador.username && clave === administrador.password) {

            if (contenedor.classList.contains("desbloqueado")) {
                contenedor.classList.remove("desbloqueado");
                botonIniciarElecciones.textContent = "abrir elecciones";
            } else {
                contenedor.classList.add("desbloqueado");
                botonIniciarElecciones.textContent = "cerrar elecciones";

            }
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
        document.getElementById("usuario").value = "";
        document.getElementById("clave").value = "";
    });
}
