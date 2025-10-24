
# Agenda de contactos

Este proyecto es una **agenda de contactos simple** creada con **HTML, CSS y JavaScript**, utilizando **localStorage** para guardar la información de manera persistente en el navegador. Permite agregar, ver, editar y eliminar contactos, mostrando notificaciones con **Toastify** y alertas con **SweetAlert2**. [Ver sitio](https://facudaddese.github.io/agenda-web/)

---

##  Funcionalidades

1. **Agregar contacto**
   - Se validan los campos `Nombre` y `Teléfono`.
   - Evita duplicados por número de teléfono.
   - Muestra notificaciones mientras se guarda el contacto.

2. **Ver contactos**
   - Renderiza la lista completa de contactos guardados en `localStorage`.
   - Cada contacto muestra:
     - Nombre
     - Teléfono
     - Íconos para editar y eliminar

3. **Editar contacto**
   - Permite modificar:
     - Nombre
     - Teléfono
   - Utiliza **SweetAlert2** para pedir el nuevo valor.
   - Actualiza automáticamente el `localStorage` y la vista de contactos.
   - Muestra notificaciones de confirmación con **Toastify**.

4. **Eliminar contacto**
   - Confirma la acción con **SweetAlert2** antes de borrar.
   - Actualiza `localStorage` y refresca la lista.
   - Muestra notificación de contacto eliminado.

5. **Control de la interfaz**
   - Botón “Ver contactos” se habilita o deshabilita según haya contactos.
   - Botón “Deshacer” permite ocultar la lista de contactos.

---

## Tecnologías utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**  
  - Gestión de eventos y lógica de la agenda.
  - Manejo de `localStorage` para persistencia.  
- **Librerías externas**:
  - **Toastify**   
  - **SweetAlert2**

---

## Autor

[Facundo D'addese](https://www.linkedin.com/in/facundo-d-addese-797b241aa/) estudiante de Licenciatura en Sistemas y en camino a ser FrontEnd Developer.
