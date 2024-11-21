/**Prestamos
 * Se desea llevar un control de los préstamos que
    realiza una oficina. Se tiene por cada préstamo: nombre
    del cliente, código del préstamo, monto y cantidad de
    meses. Se requiere de un programa que permita el
    registro de esta información, conociendo al principio de
    la ejecución el monto disponible para préstamos y el
    porcentaje de comisión mensual que se cobrará.

    Estructuras de datos recomendadas
    - Cl_oficina: montoCaja, porcComisionMensual
    - Cl_prestamo: cliente, codigo, prestamo, meses

    Primeros requerimientos
    - Los datos entrada vienen en un archivo (con
    import... ver anexo)
    - Monto final disponible
    - Clientes que pidieron por 2 meses
    - Clientes que pidieron el préstamo mínimo 
*/

import Cl_oficina from "./Cl_oficina.js";
import Cl_prestamo from "./Cl_prestamo.js";
import Dt_oficina from "./Dt_oficina.js";
import Dt_prestamos from "./Dt_prestamos.js";

const oficina = new Cl_oficina(Dt_oficina.montoDisponible, Dt_oficina.porcComisionMensual);

Dt_prestamos.forEach((prestamo) =>
  oficina.agregarPrestamo(
    new Cl_prestamo(prestamo.cliente, prestamo.codigo, prestamo.prestamo, prestamo.meses)
  )
);

let salida1 = document.getElementById("salida1"),
    salida2 = document.getElementById("salida2"),
    opciones = document.getElementById("opciones");

salida1.innerHTML = `<br>Seleccione una opción:
  <br>1 - Agregar préstamo
  <br>2 - Modificar préstamo
  <br>3 - Eliminar préstamo
  <br>4 - Listar préstamos
  <br>5 - Monto final disponible
  <br>6 - Clientes que pidieron por 2 meses
  <br>7 - Clientes que pidieron el préstamo mínimo`;

opciones.onclick = () => {
  let opcion = +prompt("Seleccione su opción:");
  switch (opcion) {
    case 1:
      agregarPrestamo(oficina);
      break;
    case 2:
      modificarPrestamo(oficina);
      break;
    case 3:
      eliminarPrestamo(oficina);
      break;
    case 4:
      listarPrestamos(oficina, salida2);
      break;
    case 5:
      mostrarMontoFinal(oficina, salida2);
      break;
    case 6:
      mostrarClientesDosMeses(oficina, salida2);
      break;
    case 7:
      mostrarClientesPrestamoMinimo(oficina, salida2);
      break;
  }
};

function agregarPrestamo(oficina) {
  let cliente = prompt("Ingrese el nombre del cliente:");
  let codigo = prompt("Ingrese el código del préstamo:");
  let prestamo = prompt("Ingrese el monto del préstamo:");
  let meses = prompt("Ingrese la cantidad de meses:");
  oficina.agregarPrestamo(new Cl_prestamo(cliente, codigo, prestamo, meses));
};

function modificarPrestamo(oficina) {
    let codigo = prompt("Ingrese el código del préstamo a modificar:");
    codigo = parseInt(codigo, 10);
    let cliente = prompt("Ingrese el nuevo nombre del cliente (deje vacío para no cambiar):");
    let prestamo = prompt("Ingrese el nuevo monto del préstamo (deje vacío para no cambiar):");
    let meses = prompt("Ingrese la nueva cantidad de meses (deje vacío para no cambiar):");
    
    const prestamoExistente = oficina.prestamos.find(prestamo => prestamo.codigo === codigo);

    if (prestamoExistente) {
    //solo se cambiaran los valores si el usuario ingresó algo nuevo
    if (cliente !== "") 
        prestamoExistente.cliente = cliente;

    if (prestamo !== "") 
        prestamoExistente.prestamo = prestamo;

    if (meses !== "") 
        prestamoExistente.meses = meses;

    alert(`Préstamo ${codigo} modificado correctamente.`);
    } 
    else 
    {
    alert(`No existe un préstamo con el código ${codigo}.`);
    }
};

function eliminarPrestamo(oficina) {
  let codigo = prompt("Ingrese el código del préstamo a eliminar:");
  if (oficina.eliminarPrestamo(codigo)) {
    alert(`Préstamo ${codigo} eliminado correctamente.`);
  } else {
    alert(`No existe un préstamo con el código ${codigo}.`);
  }
};

function listarPrestamos(oficina, salida) {
    const prestamos = oficina.listarPrestamos();
    let tableHTML = `<table>
      <tr>
        <th>Cliente</th>
        <th>Código</th>
        <th>Préstamo</th>
        <th>Meses</th>
        <th>Monto a Pagar</th>
      </tr>`;
  
    prestamos.forEach(prestamo => {
        const montoPagar = prestamo.calcularMontoPagar(oficina.porcComisionMensual);
        tableHTML += `<tr>
          <td>${prestamo.cliente}</td>
          <td>${prestamo.codigo}</td>
          <td>${prestamo.prestamo}</td>
          <td>${prestamo.meses}</td>
          <td>${montoPagar.toFixed(2)}</td>
        </tr>`;
    });
  
    tableHTML += `</table>`;
    salida.innerHTML = tableHTML;
}

function mostrarMontoFinal(oficina, salida) {
  salida.innerHTML = `<br>Monto final disponible: ${oficina.mtoFinalDisp()}`;
};

function mostrarClientesDosMeses(oficina, salida) {
    const clientes = oficina.clientesDosMeses();
    if (clientes.length === 0) {
        salida.innerHTML = `<br>No hay clientes que hayan solicitado préstamos por 2 meses.`;
        return;
    }

    let tableHTML = `<table>
    <tr>
        <th>Cliente</th>
        <th>Código</th>
        <th>Préstamo</th>
        <th>Meses</th>
        <th>Monto a Pagar</th>
    </tr>`;

    oficina.prestamos.forEach(prestamo => {
    if (prestamo.meses === 2) {
        const montoPagar = prestamo.calcularMontoPagar(oficina.porcComisionMensual);
        tableHTML += `<tr>
            <td>${prestamo.cliente}</td>
            <td>${prestamo.codigo}</td>
            <td>${prestamo.prestamo}</td>
            <td>${prestamo.meses}</td>
            <td>${montoPagar.toFixed(2)}</td>
        </tr>`;
    }
});
tableHTML += `</table>`;
salida.innerHTML = tableHTML;
}

function mostrarClientesPrestamoMinimo(oficina, salida) {
  const clientes = oficina.clientesPrestamoMinimo();
  let tableHTML = `<table>
    <tr>
      <th>Cliente</th>
      <th>Código</th>
      <th>Préstamo</th>
      <th>Meses</th>
    </tr>`;

    clientes.forEach(prestamo => {
    tableHTML += `<tr>
      <td>${prestamo.cliente}</td>
      <td>${prestamo.codigo}</td>
      <td>${prestamo.prestamo}</td>
      <td>${prestamo.meses}</td>
    </tr>`;
  });

  tableHTML += `</table>`;
  salida.innerHTML = tableHTML;
};