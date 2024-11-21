export default class Cl_oficina {
    constructor(montoCaja, porcComisionMensual) {
      this.montoCaja = montoCaja;
      this.porcComisionMensual = porcComisionMensual;
      this.prestamos = [];
    }
  
    agregarPrestamo(prestamo) {
      this.prestamos.push(prestamo);
    }
  
    eliminarPrestamo(codigo) {
      const index = this.prestamos.findIndex(prestamo => prestamo.codigo === codigo);
      if (index !== -1) {
        this.prestamos.splice(index, 1);
        return true;
      }
      return false;
    }
  
    modificarPrestamo(codigo, nuevosDatos) {
      const prestamo = this.prestamos.find(prestamo => prestamo.codigo === codigo);
      if (prestamo) {
        prestamo.cliente = nuevosDatos.cliente || prestamo.cliente;
        prestamo.prestamo = nuevosDatos.prestamo || prestamo.prestamo;
        prestamo.meses = nuevosDatos.meses || prestamo.meses;
        return true;
      }
      return false;
    }
  
    listarPrestamos() {
      return this.prestamos;
    }
  
    mtoFinalDisp() {
        let totalPrestamos = 0;
        for (let prestamo of this.prestamos) {
            totalPrestamos += parseFloat(prestamo.prestamo); 
        }
        return this.montoCaja - totalPrestamos;
    }
  
    clientesDosMeses() {
      let clientes = [];
      for (let prestamo of this.prestamos) {
        if (prestamo.meses === 2) {
          clientes.push(prestamo.cliente);
        }
      }
      return clientes;
    }
  
    prestamoMinimo() {
      let minPrestamo = 99999999;
      for (let prestamo of this.prestamos) {
        if (prestamo.prestamo < minPrestamo) {
          minPrestamo = prestamo.prestamo;
        }
      }
      return minPrestamo;
    }
  
    clientesPrestamoMinimo() {
        const minPrestamo = this.prestamoMinimo();
        return this.prestamos.filter(prestamo => prestamo.prestamo === minPrestamo);
    }
}
