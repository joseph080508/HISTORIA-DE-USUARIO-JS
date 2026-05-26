// agarramos los elementos del html
const inputTarea = document.getElementById("input-text");
const btnAgregar = document.getElementById("btn-agregar");
const listaNotas = document.querySelector("#listaNotas");


// aqui se guardan las tareas
// si hay tareas guardadas las trae
// y si no hay deja el arreglo vacio
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// cuando le den click al boton
btnAgregar.addEventListener("click", function () {
    agregarTarea();
});

// funcion para agregar tareas
function agregarTarea() {

    // toma lo que escribio el usuario
    // trim sirve para quitar espacios
    const texto = inputTarea.value.trim();

    // valida que no este vacio
    if (texto === "") {
        alert("Por favor escribe una tarea");
        return;
    }

    // objeto de la nueva tarea
    const nuevaTarea = {
        id: Date.now(),
        texto: texto
    };

    // mete la tarea al arreglo
    tareas.push(nuevaTarea);

    // guarda en local storage
    guardarTareas();

    // muestra las tareas en pantalla
    mostrarTareas();

    // limpia el input
    inputTarea.value = "";

    // vuelve a poner el cursor en el input
    inputTarea.focus();

    console.log("Tarea agregada");
}

// funcion para mostrar tareas
function mostrarTareas() {

    // limpia la lista antes de volver a mostrar
    listaNotas.innerHTML = "";

    // recorre todas las tareas
    for (let i = 0; i < tareas.length; i++) {

        const tarea = tareas[i];

        // crea el li
        const li = document.createElement("li");

        // coloca el texto de la tarea
        li.textContent = tarea.texto;

        // crea boton eliminar
        const btnEliminar = document.createElement("button");

        btnEliminar.textContent = "Eliminar";

        // cuando le den eliminar
        btnEliminar.addEventListener("click", function () {

            eliminarTarea(tarea.id);

        });

        // mete el boton dentro del li
        li.appendChild(btnEliminar);

        // agrega el li al ul
        listaNotas.appendChild(li);
    }
}

// guarda las tareas en local storage
function guardarTareas() {

    localStorage.setItem("tareas", JSON.stringify(tareas));

}

// elimina tareas
function eliminarTarea(id) {

    // deja todas menos la que se elimino
    tareas = tareas.filter(function (tarea) {
        return tarea.id !== id;
    });

    // actualiza local storage
    guardarTareas();

    // vuelve a mostrar las tareas
    mostrarTareas();

    console.log("Tarea eliminada");
}

// muestra las tareas cuando carga la pagina
mostrarTareas();

console.log("Tareas cargadas:", tareas.length);
