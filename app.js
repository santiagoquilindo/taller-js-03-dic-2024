// let urlCandidatos = "https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/candidatos.json";


// let usuarios = [];
// let votos = { candidato1: 0, candidato2: 0, candidato3: 0, candidato4: 0};

// document.getElementById("ingresar").addEventListener("click", () => {
//     let usuario = document.getElementById("usuario").value;
//     let clave = document.getElementById("clave").value;

//     if (usuario && clave) {
//         if (!usuarios.includes(usuario)) {
//             usuarios.push(usuario);
//             alert(`Usuario ${usuario} ingresó correctamente.`);
//             mostrarCandidatos();
//         } else {
//             alert("Este usuario ya ha ingresado.");
//         }
//     } else {
//         alert("Por favor, completa los campos.");
//     }
// });

// function mostrarCandidatos() {
//     const seccionCandidatos = document.getElementById("candidatos");
//     seccionCandidatos.innerHTML = `
//         <h2>Vota por un candidato</h2>
//         <button onclick="votar('candidato1')">Candidato 1</button>
//         <button onclick="votar('candidato2')">Candidato 2</button>
//         <button onclick="votar('candidato3')">Candidato 3</button>
//     `;
// }

// function votar(candidato) {
//     if (usuarios.length > 0) {
//         votos[candidato]++;
//         alert(`¡Gracias por tu voto para ${candidato}!`);
//         mostrarResultados();
//     } else {
//         alert("Debes ingresar primero como usuario.");
//     }
// }

// function mostrarResultados() {
//     const seccionResultados = document.getElementById("resultados");
//     seccionResultados.innerHTML = `
//         <h2>Resultados</h2>
//         <p>Candidato 1: ${votos.candidato1} votos</p>
//         <p>Candidato 2: ${votos.candidato2} votos</p>
//         <p>Candidato 3: ${votos.candidato3} votos</p>
//     `;
// }

function cargarCandidatos() {
    var peticion = new XMLHttpRequest(); // Crear la solicitud HTTP
    peticion.open("GET", urlCandidatos, true); // Configurar solicitud

    peticion.onload = function () {
        if (peticion.status === 200) {
            var respuesta;
            try {
                respuesta = JSON.parse(peticion.responseText); // Convertir respuesta JSON
            } catch (error) {
                console.log("Error al procesar la respuesta de la API:", error.message);
                return;
            }

            if (respuesta && respuesta.length > 0) {
                mostrarCandidatos(respuesta); // Mostrar candidatos si existen
            } else {
                console.log("La API no devolvió candidatos.");
            }
        } else {
            console.log("Error al cargar candidatos. Código de estado: " + peticion.status);
        }
    };

    peticion.onerror = function () {
        console.log("No se pudo conectar con el servidor.");
    };

    peticion.send(); // Enviar la solicitud
}

function mostrarCandidatos(lista) {
    var contenedor = document.getElementById("candidatos");
    contenedor.innerHTML = "<h2>Vota por un candidato</h2>";

    lista.forEach(candidato => {
        contenedor.innerHTML += `
            <div class="candidato">
                <img src="${candidato.foto}" alt="${candidato.nombre}" class="foto-candidato" onclick="votar('${candidato.nombre}')">
                <p>${candidato.nombre}</p>
                <p>${candidato.programa || "Sin programa"}</p>
            </div>
        `;
    });
}

function votar(nombre) {
    alert("¡Gracias por votar por " + nombre + "!");
    console.log("Votaste por: " + nombre);
}
