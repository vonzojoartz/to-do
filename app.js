const colores = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#33FFF5"];
const contenedor = document.getElementById('contenedor');
let index = 0;
let datos = {}; // Aquí se almacenará el JSON cargado

// Función para generar una tarjeta con texto e imagen
function generarTarjeta(item, color) {
  const nombre = item.nombre || JSON.stringify(item);
  const imagen = item.imagen ? `<img src="${item.imagen}" alt="${nombre}" style="max-width: 80%; max-height: 80%; display: block; margin: auto;">` : '';
  
  contenedor.innerHTML = `<div class="tarjeta" style="background-color: ${color};">
                            <h1>${nombre}</h1>
                            ${imagen}
                          </div>`;
}

// Navegación entre elementos
function mostrarSiguiente() {
  const items = datos.Hacienda.items;
  if (index >= items.length) index = 0;
  
  const itemActual = items[index];
  const color = colores[index % colores.length];
  generarTarjeta(itemActual, color);
  index++;
}

// Función para cargar el JSON usando fetch
function cargarJSON() {
  fetch('lista.json')  // Ruta del archivo JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar el archivo JSON');
      }
      return response.json();  // Convertir la respuesta a JSON
    })
    .then(data => {
      datos = data;  // Guardar los datos del JSON
      mostrarSiguiente();  // Mostrar la primera tarjeta
    })
    .catch(error => {
      console.error('Hubo un problema con la carga del JSON:', error);
    });
}

// Iniciar la carga del JSON
cargarJSON();

// Navegar con las teclas de flecha
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    mostrarSiguiente();
  }
});
