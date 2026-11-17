const formulario = document.getElementById("formulario");
const tabla = document.getElementById("tabla");
const cuerpo = tabla.querySelector("tbody");
const mensaje = document.getElementById("mensaje");

// Formato de dinero en pesos mexicanos
const dinero = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();   // evita que la página se recargue

  // Entrada
  let saldo = parseFloat(document.getElementById("inicial").value);
  const aporte = parseFloat(document.getElementById("aporte").value);
  const tasaAnual = parseFloat(document.getElementById("tasa").value);
  const anios = parseInt(document.getElementById("anios").value, 10);

  if ([saldo, aporte, tasaAnual, anios].some(Number.isNaN) || anios <= 0) {
    mensaje.textContent = "Revisa que todos los datos sean números válidos.";
    tabla.hidden = true;
    return;
  }
  mensaje.textContent = "";

  // Proceso
  const tasaMensual = tasaAnual / 100 / 12;
  let totalAportado = saldo;
  cuerpo.replaceChildren();   // limpia resultados anteriores

  for (let mes = 1; mes <= anios * 12; mes++) {
    saldo = saldo * (1 + tasaMensual) + aporte;   // interés compuesto
    totalAportado += aporte;

    // Salida: una fila por cada año completo
    if (mes % 12 === 0) {
      const fila = cuerpo.insertRow();
      fila.insertCell().textContent = mes / 12;
      fila.insertCell().textContent = dinero.format(totalAportado);
      fila.insertCell().textContent = dinero.format(saldo);
      fila.insertCell().textContent = dinero.format(saldo - totalAportado);
    }
  }

  tabla.hidden = false;
});