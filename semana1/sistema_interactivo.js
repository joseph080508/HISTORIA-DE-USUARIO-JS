// 1. Solicitar datos con los prompts
let nombre = prompt("Cual es tu nombre? ")
let edad = prompt("Cuantos años tienes? ")

// 2. Validar si la edad es un número válido
if (isNaN(edad) || edad <= 0) {
    console.error("Error: Por favor, ingresa una edad válida en números.");
    alert("Error: Por favor, ingresa una edad válida en números.");
} else {
// 3. Valida si es mayor de edad o no
    if (edad < 18){
        alert("Hola " + nombre + ",eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!")
    }else{
    alert("Hola " + nombre + ",eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!") 
    }
}
