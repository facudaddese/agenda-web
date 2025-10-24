const form = document.getElementById("form");
const inputNombre = document.getElementById("nombre");
const inputTel = document.getElementById("telefono");
const btnGuardar = document.getElementById("btn-guardar");
const btnVer = document.getElementById("btn-ver");
const btnDeshacer = document.getElementById("btn-deshacer");
const contactos = document.getElementById("contactos");

document.addEventListener("DOMContentLoaded", () => {
    verAgenda();
});
btnGuardar.addEventListener("click", (event) => {
    event.preventDefault();

    if (inputNombre.value !== "" && inputTel.value !== "") {
        const objContacto =
        {
            nombre: inputNombre.value,
            tel: inputTel.value
        }
        let arrayContactos = JSON.parse(localStorage.getItem("contacto")) || [];
        let existe = arrayContactos.some(i => i.tel === objContacto.tel);

        if (existe) {
            Toastify({
                text: "⚠️ Contacto repetido",
                duration: 1500,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #ef4444, #dc2626)",
                }
            }).showToast();
            inputTel.value = "";
        } else {
            arrayContactos.push(objContacto);
            localStorage.setItem("contacto", JSON.stringify(arrayContactos));

            Toastify({
                text: "Guardando contacto...",
                duration: 1700,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #2563eb, #1e40af)",
                }
            }).showToast();

            setTimeout(() => {
                Toastify({
                    text: "Contacto guardado correctamente ✅",
                    duration: 2000,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "linear-gradient(to right, #2563eb, #1e40af)",
                    }
                }).showToast();
                verAgenda();
                form.reset();
            }, 2000);
        }
    } else {
        Toastify({
            text: "⚠️ Todos los campos son obligatorios",
            duration: 1500,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #ef4444, #dc2626)",
            }
        }).showToast();
    }
})

btnVer.addEventListener("click", async () => {

    contactos.innerHTML = "";
    btnVer.classList.add("disable");
    btnDeshacer.classList.remove("disable");
    btnDeshacer.classList.add("active");

    if (localStorage.length > 0) {
        JSON.parse(localStorage.getItem("contacto")).forEach(element => {
            contactos.innerHTML +=
                `   
                    <div>
                        <div style="display:flex; justify-content: space-between; width: 150%; align-items: center; gap: 10px;">
                            <p class="p-nombre">${element.nombre}</p>
                            <span class="material-icons">edit</span>
                        </div>
                        <div style="display:flex; justify-content: space-between;   width: 150%; align-items: center; gap: 10px;">
                            <p class="p-cel" style="padding-top:5px;">${element.tel}</p>
                            <span class="material-icons">delete</span>
                        </div>
                    </div>
                    <hr>
                `
        });
    }
});

contactos.addEventListener("click", async (event) => {

    if (event.target.tagName === "SPAN") {
        const contactoDiv = event.target.closest("div").parentElement;
        const nombreActual = contactoDiv.querySelector(".p-nombre").textContent;
        const telActual = contactoDiv.querySelector(".p-cel").textContent;
        let contactosGuardados = JSON.parse(localStorage.getItem("contacto")) || [];

        if (event.target.textContent === "edit") {
            Swal.fire({
                title: "Qué deseas editar?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Nombre",
                cancelButtonText: "Teléfono"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Ingrese el nuevo nombre",
                        input: "text",
                        inputPlaceholder: "Nuevo nombre",
                        showCancelButton: true,
                        confirmButtonText: "Guardar",
                        cancelButtonText: "Cancelar",
                        preConfirm: (value) => {
                            if (!value) {
                                Swal.showValidationMessage("Por favor, escriba un nombre");
                                return false;
                            }
                            return value;
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const nombreNuevo = result.value;
                            let i = contactosGuardados.findIndex(c => c.tel === telActual);
                            if (i !== -1) {
                                contactosGuardados[i].nombre = nombreNuevo;
                                localStorage.setItem("contacto", JSON.stringify(contactosGuardados));
                                Toastify({
                                    text: `Nombre cambiado a ${nombreNuevo}`,
                                    duration: 2000,
                                    gravity: "bottom",
                                    position: "right",
                                    style: { background: "#4CAF50" },
                                }).showToast();
                                btnVer.click();
                            }
                        }
                    });
                } else {
                    Swal.fire({
                        title: "Ingrese el nuevo número",
                        input: "number",
                        inputPlaceholder: "Nuevo teléfono",
                        showCancelButton: true,
                        confirmButtonText: "Guardar",
                        cancelButtonText: "Cancelar",
                        preConfirm: (value) => {
                            if (!value) {
                                Swal.showValidationMessage("Por favor, escriba un número de telefono");
                                return false;
                            }
                            return value;
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const nroNuevo = result.value;
                            let i = contactosGuardados.findIndex(c => c.tel === telActual);
                            if (i !== -1) {
                                contactosGuardados[i].tel = nroNuevo;
                                localStorage.setItem("contacto", JSON.stringify(contactosGuardados));
                                Toastify({
                                    text: `Teléfono cambiado a ${nroNuevo}`,
                                    duration: 2000,
                                    gravity: "bottom",
                                    position: "right",
                                    style: { background: "#4CAF50" },
                                }).showToast();
                                btnVer.click();
                            }
                        }
                    });
                }
            });
        } else if (event.target.textContent === "delete") {
            Swal.fire({
                title: `Eliminar a ${nombreActual}?`,
                text: "Esta acción no se puede deshacer",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
            }).then((result) => {
                if (result.isConfirmed) {
                    contactosGuardados = contactosGuardados.filter(c => c.tel !== telActual);
                    localStorage.setItem("contacto", JSON.stringify(contactosGuardados));
                    Swal.fire({
                        title: "Contacto eliminado",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    verAgenda();
                    btnVer.click();
                    setTimeout(() => {
                        Toastify({
                            text: "Contacto borrado",
                            duration: 2000,
                            gravity: "bottom",
                            position: "right",
                            style: {
                                background: "#4CAF50",
                            },
                        }).showToast();
                    }, 200);
                }
            });
        }
    }
});

btnDeshacer.addEventListener("click", () => {
    contactos.innerHTML = "";
    btnVer.classList.remove("disable");
    btnVer.classList.add("active");
    btnDeshacer.classList.add("disable");
});

const verAgenda = () => {
    if (localStorage.length > 0) {
        btnVer.classList.remove("disable");
        btnVer.classList.add("active");
    } else {
        btnVer.classList.remove("active");
        btnVer.classList.add("disable");
    }
}