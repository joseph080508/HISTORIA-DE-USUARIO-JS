// Creo una lista con 3 productos. Cada uno tiene id, nombre y precio.
let productos = [
    { "id": 1, "nombre": "manzana", "precio": 200 },
    { "id": 2, "nombre": "pera", "precio": 100 },
    { "id": 3, "nombre": "banana", "precio": 300 }
];

// ==========================================
// TASK 2: USO DE SET EN JAVASCRIP
// ==========================================

// Un Set es una lista que no permite elementos repetidos de forma automática.
const repetir = new Set([1, 2, 3, 4, 4, 4, 2]); 
console.log(repetir);
// Agrega el número 7 al conjunto.
repetir.add(7);
  // Pregunto si el número 2 existe.
repetir.has(2);
// Borro el número 7 del conjunto.  
repetir.delete(7); 

// Recorro el Set con un bucle para mostrar cada número guardado.
for (const item of repetir) {
    console.log(`El ${item}`);
}

// ==========================================
// TASK 3: CREACION DE UN MAP
// ==========================================

// Un Map guarda datos usando parejas de Clave y Valor.
const map = new Map();
map.set('key1', 1); 
map.set("key2", 2); 
console.log(map);

// ==========================================
// TASK 4: ITERACION SOBRE LAS ESTRUCTURAS DE DATOS
// ==========================================

// Creo un objeto.
const usuario = {
    "nombre": "Joseph",
    "edad": 18,
    "profesion": "Estudiante de Ingeneria de sistemas"
};

console.log("--- Propiedades del Objeto ---");
// Muestro nombre: Joseph, edad: 18 y profesion: Estudiante de Ingeneria de sistemas.
for (let propiedad in usuario) {
    console.log(`${propiedad}: ${usuario[propiedad]}`);
}


// Creo otro Set con palabras. Al haber dos "manzana", una se elimina automáticamente.
const frutas = new Set(["manzana", "platano", "naranja", "manzana"]); 

// Muestro en consola las frutas únicas que quedaron.
for (let fruta of frutas) {
    console.log(fruta);
}


// Creo un Map para relacionar IDs con nombres.
const mapaUsuarios = new Map();
mapaUsuarios.set("id1", "Joseph");
mapaUsuarios.set("id2", "David");
mapaUsuarios.set("id3", "Herreño");

// Uso forEach() que es una forma rápida de leer todas las claves y valores del Map.
mapaUsuarios.forEach((valor, clave) => {
    console.log(`Clave: ${clave} -> Usuario: ${valor}`);
});

// ==========================================
// BLOQUE 5: FUNCIÓN DE VALIDACIÓN DE PRODUCTOS
// ==========================================

// Esta función recibe cualquier lista y filtra solo los productos que sirven.
function validarProductos(lista) {
    return lista.filter(p => {
        // idValido: Verifica que el ID sea un número y sea mayor a 0.
        const idValido = typeof p.id === 'number' && p.id > 0;
        // nombreValido: Verifica que sea texto y que no esté vacío.
        const nombreValido = typeof p.nombre === 'string' && p.nombre.trim() !== '';
        // precioValido: Verifica que el precio sea un número y mayor a 0.
        const precioValido = typeof p.precio === 'number' && p.precio > 0;
        
        // Si las tres pruebas son verdaderas (true), el producto pasa el filtro.
        return idValido && nombreValido && precioValido;
    });
}

// Usas la función creada arriba para limpiar y validar tu lista original de productos.
const productosValidados = validarProductos(productos);

// ==========================================
// BLOQUE 8: EJECUCIÓN DE PRUEBAS FINALES
// ==========================================

// --- Prueba A: Organizar todo dentro de un Objeto ---
const productosObjeto = {};
// Recorres las frutas validadas y las guardas usando su propio "id" como llave.
productosValidados.forEach(p => productosObjeto[p.id] = p);
console.log("--- Lista Completa (Objeto) ---");
console.log(productosObjeto);

// --- Asegurar productos únicos con un Set ---

// Convertimos los objetos a texto plano (JSON.stringify) porque los Set solo detectan duplicados en textos o números directamente.
const productosSet = new Set(productosValidados.map(p => JSON.stringify(p)));
console.log("\n--- Productos Únicos (Set) ---");
// Volvemos a convertir el texto en objeto limpio (JSON.parse) al imprimir.
productosSet.forEach(p => console.log(JSON.parse(p)));

// --- Clasificar por categorías usando un Map ---
const categoriasMap = new Map();
// Como los objetos no traían una propiedad categoría, creo la categoría "Frutas" manualmente y y les agrego los nombres.
categoriasMap.set("Frutas", productosValidados.map(p => p.nombre));

console.log("\n--- Categorías y Nombres (Map) ---");
console.log(categoriasMap);
