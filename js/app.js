// La API está en el mismo host, en el puerto de la web + 1
// (dev: web 8090 -> API 8091 | prod: web 8190 -> API 8191)
function urlApi(ubicacion) {
  return `${ubicacion.protocol}//${ubicacion.hostname}:${Number(ubicacion.port) + 1}`;
}

function crearItem(doc, tarea) {
  const item = doc.createElement('li');
  item.textContent = tarea.hecha ? `✔ ${tarea.titulo}` : tarea.titulo;
  return item;
}

async function cargarTareas(doc, ubicacion, pedir) {
  const estado = doc.getElementById('estado');
  const lista = doc.getElementById('lista');
  try {
    const respuesta = await pedir(`${urlApi(ubicacion)}/tareas`);
    const tareas = await respuesta.json();
    tareas.forEach((tarea) => lista.appendChild(crearItem(doc, tarea)));
    estado.textContent = `${tareas.length} tareas`;
  } catch {
    estado.textContent = 'No se pudo conectar con la API';
  }
}

if (typeof module === 'undefined') {
  // En el navegador
  cargarTareas(document, globalThis.location, globalThis.fetch.bind(globalThis));
} else {
  // En las pruebas (Node)
  module.exports = { urlApi, crearItem, cargarTareas };
}
