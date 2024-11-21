export default class Cl_prestamo {
    constructor(cliente, codigo, prestamo, meses) {
      this.cliente = cliente;
      this.codigo = codigo;
      this.prestamo = prestamo;
      this.meses = meses;
      this.prestamo = parseFloat(prestamo);
      this.meses = parseInt(meses);
  }

  calcularPorcentaje(porcComisionMensual) {
      return (porcComisionMensual / 100) * this.meses * this.prestamo;
  }

  calcularMontoPagar(porcComisionMensual) {
      return this.prestamo + this.calcularPorcentaje(porcComisionMensual);
  }
}