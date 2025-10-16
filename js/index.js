const inputNombre = document.getElementById("nombre");
const inputTel = document.getElementById("telefono");
const btnGuardar = document.getElementById("btn-guardar");
const btnVer = document.getElementById("btn-ver");
const form = document.getElementById("form");
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
// falta eliminar, modificar contacto
btnVer.addEventListener("click", () => {

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