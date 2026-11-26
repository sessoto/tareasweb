const test = require('node:test');
const assert = require('node:assert');
const { urlApi, crearItem, cargarTareas } = require('../js/app');

// Documento falso: reemplaza al navegador durante las pruebas
function documentoFalso() {
  const elementos = {
    estado: { textContent: '' },
    lista: { hijos: [], appendChild(hijo) { this.hijos.push(hijo); } }
  };
  return {
    elementos,
    getElementById: (id) => elementos[id],
    createElement: () => ({ textContent: '' })
  };
}

const ubicacion = { protocol: 'http:', hostname: 'localhost', port: '8090' };

test('la URL de la API usa el puerto de la web + 1', () => {
  assert.strictEqual(urlApi(ubicacion), 'http://localhost:8091');
});

test('una tarea hecha se marca con un check', () => {
  const doc = documentoFalso();
  assert.strictEqual(crearItem(doc, { titulo: 'A', hecha: true }).textContent, '✔ A');
  assert.strictEqual(crearItem(doc, { titulo: 'B', hecha: false }).textContent, 'B');
});

test('muestra las tareas que entrega la API', async () => {
  const doc = documentoFalso();
  const pedir = async () => ({ json: async () => [{ titulo: 'A', hecha: false }, { titulo: 'B', hecha: true }] });
  await cargarTareas(doc, ubicacion, pedir);
  assert.strictEqual(doc.elementos.lista.hijos.length, 2);
  assert.strictEqual(doc.elementos.estado.textContent, '2 tareas');
});

test('avisa si la API no responde', async () => {
  const doc = documentoFalso();
  const pedir = async () => { throw new Error('sin conexion'); };
  await cargarTareas(doc, ubicacion, pedir);
  assert.strictEqual(doc.elementos.estado.textContent, 'No se pudo conectar con la API');
});
