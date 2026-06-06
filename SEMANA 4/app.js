// =============================
// VARIABLES GLOBALES
// =============================

const API_URL = "http://localhost:3000/products";

const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productList = document.getElementById("productList");
const message = document.getElementById("message");
const syncBtn = document.getElementById("syncBtn");

let products = [];

// =============================
// MENSAJES
// =============================

function showMessage(text, type) {
    message.textContent = text;

    if (type === "success") {
        message.style.color = "green";
    } else {
        message.style.color = "red";
    }
}

// =============================
// LOCAL STORAGE
// =============================

function saveLocalStorage() {
    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );
}

function loadLocalStorage() {
    const data = localStorage.getItem("products");

    if (data) {
        products = JSON.parse(data);
        renderProducts();
    }
}

// =============================
// RENDERIZAR DOM
// =============================

function renderProducts() {

    productList.innerHTML = "";

    products.forEach(product => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${product.name} - $${product.price}
            <button onclick="deleteProduct(${product.id})">
                Eliminar
            </button>

            <button onclick="updateProduct(${product.id})">
                Editar
            </button>
        `;

        productList.appendChild(li);
    });
}

// =============================
// AGREGAR PRODUCTO
// =============================

productForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = productName.value.trim();
    const price = Number(productPrice.value);

    if (!name || price <= 0) {
        showMessage(
            "Datos inválidos",
            "error"
        );
        return;
    }

    const product = {
        id: Date.now(),
        name,
        price
    };

    products.push(product);

    saveLocalStorage();
    renderProducts();

    await createProductAPI(product);

    showMessage(
        "Producto agregado correctamente",
        "success"
    );

    productForm.reset();
});

// =============================
// ELIMINAR PRODUCTO
// =============================

async function deleteProduct(id) {

    products = products.filter(
        product => product.id !== id
    );

    saveLocalStorage();
    renderProducts();

    await deleteProductAPI(id);

    showMessage(
        "Producto eliminado",
        "success"
    );
}

// =============================
// ACTUALIZAR PRODUCTO
// =============================

async function updateProduct(id) {

    const product = products.find(
        p => p.id === id
    );

    const newName = prompt(
        "Nuevo nombre:",
        product.name
    );

    const newPrice = prompt(
        "Nuevo precio:",
        product.price
    );

    if (!newName || newPrice <= 0) {
        showMessage(
            "Datos inválidos",
            "error"
        );
        return;
    }

    product.name = newName;
    product.price = Number(newPrice);

    saveLocalStorage();
    renderProducts();

    await updateProductAPI(product);

    showMessage(
        "Producto actualizado",
        "success"
    );
}

// =============================
// GET
// =============================

async function getProductsAPI() {

    try {

        const response =
            await fetch(API_URL);

        const data =
            await response.json();

        console.log("GET:", data);

    } catch (error) {

        console.error(error);

    }
}

// =============================
// POST
// =============================

async function createProductAPI(product) {

    try {

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify(product)
            });

        const data =
            await response.json();

        console.log("POST:", data);

    } catch (error) {

        console.error(error);

    }
}

// =============================
// PUT
// =============================

async function updateProductAPI(product) {

    try {

        const response =
            await fetch(
                `${API_URL}/${product.id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify(product)
                }
            );

        const data =
            await response.json();

        console.log("PUT:", data);

    } catch (error) {

        console.error(error);

    }
}

// =============================
// DELETE
// =============================

async function deleteProductAPI(id) {

    try {

        await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );

        console.log(
            "DELETE realizado"
        );

    } catch (error) {

        console.error(error);

    }
}

// =============================
// SINCRONIZAR
// =============================

syncBtn.addEventListener(
    "click",
    getProductsAPI
);

// =============================
// INICIO
// =============================

loadLocalStorage();
