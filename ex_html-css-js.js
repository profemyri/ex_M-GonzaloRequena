// Referencias a los elementos del formulario
const formulario = document.getElementById("formulario-pedido");
const botonEnviar = document.getElementById("enviar-pedido");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const direccion = document.getElementById("direccion");
const telefono = document.getElementById("telefono");
const raciones = document.getElementById("raciones");
const tipoPescado = document.getElementsByName("tipo-pescado");
const acompanhamientos = document.getElementsByName("acompanhamiento");
const instrucciones = document.getElementById("instrucciones");
const precioTotal = document.createElement("p");
formulario.appendChild(precioTotal);

// Modo claro/oscuro
const modoOscuroBoton = document.createElement("button");
modoOscuroBoton.textContent = "Modo oscuro";
document.body.appendChild(modoOscuroBoton);

modoOscuroBoton.onclick = function () {
    document.body.classList.toggle("dark-mode");
    modoOscuroBoton.textContent = document.body.classList.contains("dark-mode") ? "Modo claro" : "Modo oscuro";
};

// Validación del formulario
botonEnviar.onclick = function (event) {
    const nombreValor = nombre.value.trim();
    const emailValor = email.value.trim();
    const direccionValor = direccion.value.trim();
    const telefonoValor = telefono.value.trim();
    let errores = false;

    if (!nombreValor || !emailValor || !direccionValor || !telefonoValor) {
        alert("Algunos campos son incorrectos o están incompletos.");
        event.preventDefault();
        errores = true;
        return;
    }

    if (!emailValor.includes("@")) {
        alert("Introduce un email válido (con @).");
        event.preventDefault();
        errores = true;
        return;
    }

    if (telefonoValor.length !== 9 || isNaN(telefonoValor)) {
        alert("Introduce un número de teléfono válido (9 dígitos numéricos).");
        event.preventDefault();
        errores = true;
        return;
    }

    if (direccionValor.length < 18) {
        alert("Introduce una dirección válida (al menos 18 caracteres).");
        event.preventDefault();
        errores = true;
        return;
    }

    // Deshabilitar o habilitar el botón según los errores
    botonEnviar.disabled = errores;

    if (errores) {
        botonEnviar.style.opacity = "0.5"; // Visualmente deshabilitado
        botonEnviar.style.cursor = "not-allowed";
    } else {
        botonEnviar.style.opacity = "1"; // Visualmente habilitado
        botonEnviar.style.cursor = "pointer";
    }

    // Confirmación antes de enviar
    if (!confirm("¿Seguro que quieres confirmar y enviar tu pedido ahora?")) {
        event.preventDefault();
        return;
    }

    alert(`¡Gracias por tu pedido, ${nombreValor}!`);
};

// Contador de caracteres en "Instrucciones adicionales"
const contadorCaracteres = document.createElement("p");
instrucciones.parentNode.insertBefore(contadorCaracteres, instrucciones.nextSibling);

instrucciones.oninput = function () {
    const caracteresRestantes = 150 - instrucciones.value.length;
    contadorCaracteres.textContent = `Caracteres restantes: ${caracteresRestantes}`;
    if (caracteresRestantes < 0) {
        instrucciones.value = instrucciones.value.slice(0, 150);
        contadorCaracteres.textContent = "Caracteres restantes: 0";
    }
};

// Cálculo del precio del pedido
function calcularPrecio() {
    let precioPescado = 0;
    for (const pescado of tipoPescado) {
        if (pescado.checked) {
            if (pescado.value === "calamares") precioPescado = 6;
            if (pescado.value === "adobo") precioPescado = 7;
            if (pescado.value === "boquerones") precioPescado = 8;
        }
    }

    let precioAcompanhamientos = 0;
    for (const acompanhamiento of acompanhamientos) {
        if (acompanhamiento.checked) precioAcompanhamientos += 4;
    }

    const total = (precioPescado * (parseInt(raciones.value) || 1)) + precioAcompanhamientos;
    precioTotal.textContent = "Precio total: ${total}€";
}

// Actualizar precio en tiempo real
formulario.oninput = calcularPrecio;

// Efecto visual en botón "Enviar pedido"
const originalColor = botonEnviar.style.backgroundColor;

botonEnviar.onmouseover = function () {
    botonEnviar.style.backgroundColor = "white";
    botonEnviar.style.color = "#0077b6";
};

botonEnviar.onmouseout = function () {
    botonEnviar.style.backgroundColor = originalColor || "#0077b6";
    botonEnviar.style.color = "white";
};
