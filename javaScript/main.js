// Definir productos en JSON
const productos = [
    { nombre: "Camisa", precio: 20 },
    { nombre: "Pantalón", precio: 30 },
    { nombre: "Zapatos", precio: 50 }
  ];
  
  // Función para mostrar productos en el DOM
  function mostrarProductos() {
    const productosDiv = document.getElementById("productos");
    productosDiv.innerHTML = "<h2>Productos disponibles:</h2>";
    productos.forEach((producto, index) => {
      const productoElement = document.createElement("div");
      productoElement.classList.add("producto");
      productoElement.innerHTML = `<p>${index + 1}. ${producto.nombre} - $${producto.precio}</p>`;
      productosDiv.appendChild(productoElement);
    });
  }
  
  // Función para realizar una compra (con asincronía y AJAX)
  function comprarProducto(event) {
    event.preventDefault();
    const productoIndex = document.getElementById("producto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
  
    if (cantidad > 0 && cantidad <= 10) {
      const productoSeleccionado = productos[productoIndex];
      const total = cantidad * productoSeleccionado.precio;
  
      document.getElementById("mensaje").innerHTML = "Procesando compra...";
  
      // Simulando una llamada a un servidor utilizando fetch
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          producto: productoSeleccionado.nombre,
          cantidad,
          total
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(response => response.json())
      .then(data => {
        const fechaHora = moment().format("DD/MM/YYYY HH:mm:ss");
        const mensaje = `¡Gracias por su compra! Usted compró ${cantidad} ${productoSeleccionado.nombre}(s) por un total de $${total}. Fecha y hora: ${fechaHora}`;
        document.getElementById("mensaje").innerHTML = mensaje;
  
        // Almacenar la compra en localStorage
        const compra = { producto: productoSeleccionado.nombre, cantidad, total, fechaHora };
        const historialCompras = JSON.parse(localStorage.getItem("historialCompras")) || [];
        historialCompras.push(compra);
        localStorage.setItem("historialCompras", JSON.stringify(historialCompras));
  
        // Mostrar el historial actualizado
        mostrarHistorial();
      })
      .catch(error => {
        const mensajeError = "Lo sentimos, la compra no pudo ser procesada en este momento. Inténtelo de nuevo más tarde.";
        document.getElementById("mensaje").innerHTML = mensajeError;
      });
    } else {
      document.getElementById("mensaje").innerHTML = "Cantidad inválida. Debe ser un número entre 1 y 10.";
    }
  }
  
  // Función para mostrar historial de compras
  function mostrarHistorial() {
    const historialDiv = document.getElementById("historial");
    historialDiv.innerHTML = "<h2>Historial de Compras:</h2>";
    const historialCompras = JSON.parse(localStorage.getItem("historialCompras")) || [];
    if (historialCompras.length === 0) {
      historialDiv.innerHTML += "<p>No hay compras registradas.</p>";
    } else {
      historialCompras.forEach(compra => {
        const compraElement = document.createElement("div");
        compraElement.classList.add("compra");
        compraElement.innerHTML = `<p><strong>Producto:</strong> ${compra.producto}, <strong>Cantidad:</strong> ${compra.cantidad}, <strong>Total:</strong> $${compra.total}, <strong>Fecha y Hora:</strong> ${compra.fechaHora}</p>`;
        historialDiv.appendChild(compraElement);
      });
    }
  }
  
  // Función principal de la tienda
  function tienda() {
    console.log("¡Bienvenido a la tienda!");
    mostrarProductos();
    const formularioCompra = document.getElementById("formulario-compra");
    formularioCompra.addEventListener("submit", comprarProducto);
    mostrarHistorial();
  }
  
  // Iniciar la tienda
  tienda();
  