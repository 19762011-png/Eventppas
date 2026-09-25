document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // ELEMENTOS DEL LOGIN Y REGISTRO
    // =========================================

    const loginContainer = document.getElementById("loginContainer");
    const appContainer = document.getElementById("appContainer");

    const loginSection = document.getElementById("loginSection");
    const registroSection = document.getElementById("registroSection");

    const loginForm = document.getElementById("loginForm");
    const registroForm = document.getElementById("registroForm");

    const mostrarRegistro = document.getElementById("mostrarRegistro");
    const mostrarLogin = document.getElementById("mostrarLogin");

    const mensajeLogin = document.getElementById("mensajeLogin");
    const mensajeRegistro = document.getElementById("mensajeRegistro");

    // =========================================
    // ELEMENTOS DEL USUARIO
    // =========================================

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");

    const cerrarSesionBtn = document.getElementById("cerrarSesionBtn");

    // =========================================
    // MODO OSCURO / CLARO
    // =========================================

    const modoBtn = document.getElementById("modoBtn");

    const temaGuardado = localStorage.getItem("eventPassTema");

    if (temaGuardado === "oscuro") {
        document.body.classList.add("oscuro");
        modoBtn.textContent = "☀️ Modo claro";
    }

    modoBtn.addEventListener("click", function () {

        document.body.classList.toggle("oscuro");

        if (document.body.classList.contains("oscuro")) {
            localStorage.setItem("eventPassTema", "oscuro");
            modoBtn.textContent = "☀️ Modo claro";
        } else {
            localStorage.setItem("eventPassTema", "claro");
            modoBtn.textContent = "🌙 Modo oscuro";
        }

    });

    // =========================================
    // MOSTRAR REGISTRO
    // =========================================

    mostrarRegistro.addEventListener("click", function () {

        loginSection.classList.add("oculto");
        registroSection.classList.remove("oculto");

        mensajeLogin.textContent = "";
        mensajeRegistro.textContent = "";

    });

    // =========================================
    // VOLVER A INICIAR SESIÓN
    // =========================================

    mostrarLogin.addEventListener("click", function () {

        registroSection.classList.add("oculto");
        loginSection.classList.remove("oculto");

        mensajeRegistro.textContent = "";
        mensajeLogin.textContent = "";

    });

    // =========================================
    // CREAR CUENTA
    // =========================================

    registroForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const registroNombre =
            document.getElementById("registroNombre").value.trim();

        const registroCorreo =
            document.getElementById("registroCorreo").value.trim().toLowerCase();

        const registroPassword =
            document.getElementById("registroPassword").value;

        const confirmarPassword =
            document.getElementById("confirmarPassword").value;

        // Verificar contraseña
        if (registroPassword.length < 6) {

            mensajeRegistro.textContent =
                "La contraseña debe tener mínimo 6 caracteres.";

            mensajeRegistro.style.color = "#dc2626";

            return;
        }

        // Confirmar contraseña
        if (registroPassword !== confirmarPassword) {

            mensajeRegistro.textContent =
                "Las contraseñas no coinciden.";

            mensajeRegistro.style.color = "#dc2626";

            return;
        }

        // Obtener usuarios guardados
        let usuarios =
            JSON.parse(localStorage.getItem("eventPassUsuarios")) || [];

        // Verificar si el correo ya existe
        const usuarioExiste = usuarios.some(function (usuario) {

            return usuario.correo === registroCorreo;

        });

        if (usuarioExiste) {

            mensajeRegistro.textContent =
                "Este correo ya tiene una cuenta.";

            mensajeRegistro.style.color = "#dc2626";

            return;
        }

        // Crear nueva cuenta
        const nuevoUsuario = {

            nombre: registroNombre,
            correo: registroCorreo,
            password: registroPassword

        };

        // Guardar cuenta
        usuarios.push(nuevoUsuario);

        localStorage.setItem(
            "eventPassUsuarios",
            JSON.stringify(usuarios)
        );

        // Mensaje de éxito
        mensajeRegistro.textContent =
            "✅ Cuenta creada correctamente. Ahora inicia sesión.";

        mensajeRegistro.style.color = "#16a34a";

        // Limpiar formulario
        registroForm.reset();

        // Esperar un momento y regresar al login
        setTimeout(function () {

            registroSection.classList.add("oculto");
            loginSection.classList.remove("oculto");

            // Colocar automáticamente el correo registrado
            document.getElementById("loginCorreo").value =
                registroCorreo;

            document.getElementById("loginPassword").value = "";

            mensajeRegistro.textContent = "";

            mensajeLogin.textContent =
                "Cuenta creada. Ingresa tu contraseña para iniciar sesión.";

            mensajeLogin.style.color = "#16a34a";

        }, 1200);

    });

    // =========================================
    // INICIAR SESIÓN
    // =========================================

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const loginCorreo =
            document.getElementById("loginCorreo").value.trim().toLowerCase();

        const loginPassword =
            document.getElementById("loginPassword").value;

        // Obtener usuarios
        const usuarios =
            JSON.parse(localStorage.getItem("eventPassUsuarios")) || [];

        // Buscar usuario
        const usuarioEncontrado = usuarios.find(function (usuario) {

            return (
                usuario.correo === loginCorreo &&
                usuario.password === loginPassword
            );

        });

        // Si los datos son incorrectos
        if (!usuarioEncontrado) {

            mensajeLogin.textContent =
                "❌ Correo o contraseña incorrectos.";

            mensajeLogin.style.color = "#dc2626";

            return;
        }

        // Guardar sesión
        localStorage.setItem(
            "eventPassSesion",
            JSON.stringify(usuarioEncontrado)
        );

        // Ocultar login
        loginContainer.classList.add("oculto");

        // Mostrar aplicación
        appContainer.classList.remove("oculto");

        // Colocar datos del usuario
        nombre.value = usuarioEncontrado.nombre;
        correo.value = usuarioEncontrado.correo;

        mensajeLogin.textContent = "";

    });

    // =========================================
    // CERRAR SESIÓN
    // =========================================

    cerrarSesionBtn.addEventListener("click", function () {

        localStorage.removeItem("eventPassSesion");

        appContainer.classList.add("oculto");

        loginContainer.classList.remove("oculto");

        loginSection.classList.remove("oculto");

        registroSection.classList.add("oculto");

        loginForm.reset();
        registroForm.reset();

        mensajeLogin.textContent = "";
        mensajeRegistro.textContent = "";

        loginSection.scrollIntoView({
            behavior: "smooth"
        });

    });

    // =========================================
    // RESERVACIÓN
    // =========================================

    const reservaForm = document.getElementById("reservaForm");

    const evento = document.getElementById("evento");
    const cantidad = document.getElementById("cantidad");
    const asiento = document.getElementById("asiento");

    const comentario = document.getElementById("comentario");

    const precio = document.getElementById("precio");
    const subtotal = document.getElementById("subtotal");
    const iva = document.getElementById("iva");
    const total = document.getElementById("total");

    const comprobante = document.getElementById("comprobante");
    const datosComprobante =
        document.getElementById("datosComprobante");

    // =========================================
    // CALCULAR TOTAL
    // =========================================

    function calcularTotal() {

        const opcionEvento =
            evento.options[evento.selectedIndex];

        const opcionAsiento =
            asiento.options[asiento.selectedIndex];

        const precioEvento =
            Number(opcionEvento.dataset.precio) || 0;

        const extraAsiento =
            Number(opcionAsiento.dataset.extra) || 0;

        const cantidadEntradas =
            Number(cantidad.value) || 0;

        const precioEntrada =
            precioEvento + extraAsiento;

        const subtotalCompra =
            precioEntrada * cantidadEntradas;

        const ivaCompra =
            subtotalCompra * 0.13;

        const totalCompra =
            subtotalCompra + ivaCompra;

        precio.textContent =
            precioEntrada.toFixed(2);

        subtotal.textContent =
            subtotalCompra.toFixed(2);

        iva.textContent =
            ivaCompra.toFixed(2);

        total.textContent =
            totalCompra.toFixed(2);
    }

    evento.addEventListener("change", calcularTotal);
    cantidad.addEventListener("input", calcularTotal);
    asiento.addEventListener("change", calcularTotal);

    calcularTotal();

    // =========================================
    // CONFIRMAR RESERVACIÓN
    // =========================================

    reservaForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (!telefono.checkValidity()) {

            telefono.reportValidity();

            return;
        }

        const usuarioSesion =
            JSON.parse(localStorage.getItem("eventPassSesion"));

        const datosReserva = {

            nombre: nombre.value,
            correo: correo.value,
            telefono: telefono.value,

            evento: evento.value,

            cantidad: cantidad.value,

            asiento: asiento.value,

            comentario: comentario.value,

            precio: precio.textContent,

            subtotal: subtotal.textContent,

            iva: iva.textContent,

            total: total.textContent,

            fecha: new Date().toLocaleString()

        };

        localStorage.setItem(
            "reservaEventPass",
            JSON.stringify(datosReserva)
        );

        datosComprobante.innerHTML = `

            <p><strong>Cliente:</strong> ${datosReserva.nombre}</p>

            <p><strong>Correo:</strong> ${datosReserva.correo}</p>

            <p><strong>Teléfono:</strong> ${datosReserva.telefono}</p>

            <hr>

            <p><strong>Evento:</strong> ${datosReserva.evento}</p>

            <p><strong>Entradas:</strong> ${datosReserva.cantidad}</p>

            <p><strong>Asiento:</strong> ${datosReserva.asiento}</p>

            <p><strong>Comentario:</strong> ${datosReserva.comentario || "Sin comentario"}</p>

            <hr>

            <p><strong>Subtotal:</strong> $${datosReserva.subtotal}</p>

            <p><strong>IVA (13%):</strong> $${datosReserva.iva}</p>

            <p class="total">
                <strong>TOTAL: $${datosReserva.total}</strong>
            </p>

            <p><strong>Fecha:</strong> ${datosReserva.fecha}</p>

        `;

        comprobante.classList.remove("oculto");

        comprobante.scrollIntoView({
            behavior: "smooth"
        });

    });

    // =========================================
    // IMPRIMIR
    // =========================================

    const imprimirBtn = 
        document.getElementById("imprimirBtn");

    imprimirBtn.addEventListener("click", function () {

        window.print();

    });

    // =========================================
    // PDF
    // =========================================

    const pdfBtn =
        document.getElementById("pdfBtn");

    pdfBtn.addEventListener("click", function () {

        if (!window.jspdf) {

            alert("No se pudo cargar la función de PDF.");

            return;
        }

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF();

        const reserva =
            JSON.parse(
                localStorage.getItem("reservaEventPass")
            );

        doc.setFontSize(20);
        doc.text("EventPass", 20, 20);

        doc.setFontSize(12);

        doc.text(
            "Comprobante de reservación",
            20,
            30
        );

        doc.text(
            "Cliente: " + reserva.nombre,
            20,
            45
        );

        doc.text(
            "Correo: " + reserva.correo,
            20,
            55
        );

        doc.text(
            "Teléfono: " + reserva.telefono,
            20,
            65
        );

        doc.text(
            "Evento: " + reserva.evento,
            20,
            80
        );

        doc.text(
            "Entradas: " + reserva.cantidad,
            20,
            90
        );

        doc.text(
            "Asiento: " + reserva.asiento,
            20,
            100
        );

        doc.text(
            "Subtotal: $" + reserva.subtotal,
            20,
            115
        );

        doc.text(
            "IVA: $" + reserva.iva,
            20,
            125
        );

        doc.text(
            "TOTAL: $" + reserva.total,
            20,
            140
        );

        doc.text(
            "Fecha: " + reserva.fecha,
            20,
            150
        );

        doc.save("Comprobante_EventPass.pdf");

    });

    // =========================================
    // EXCEL
    // =========================================

    const excelBtn =
        document.getElementById("excelBtn");

    excelBtn.addEventListener("click", function () {

        if (!window.XLSX) {

            alert("No se pudo cargar la función de Excel.");

            return;
        }

        const reserva =
            JSON.parse(
                localStorage.getItem("reservaEventPass")
            );

        const datos = [

            {
                Cliente: reserva.nombre,
                Correo: reserva.correo,
                Telefono: reserva.telefono,
                Evento: reserva.evento,
                Entradas: reserva.cantidad,
                Asiento: reserva.asiento,
                Comentario: reserva.comentario,
                Subtotal: reserva.subtotal,
                IVA: reserva.iva,
                Total: reserva.total,
                Fecha: reserva.fecha
            }

        ];

        const hoja =
            XLSX.utils.json_to_sheet(datos);

        const libro =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            libro,
            hoja,
            "Reservación"
        );

        XLSX.writeFile(
            libro,
            "Reservacion_EventPass.xlsx"
        );

    });

    // =========================================
    // RECUPERAR SESIÓN
    // =========================================

    const sesion =
        JSON.parse(
            localStorage.getItem("eventPassSesion")
        );

    if (sesion) {

        loginContainer.classList.add("oculto");

        appContainer.classList.remove("oculto");

        nombre.value = sesion.nombre;
        correo.value = sesion.correo;

    }

});