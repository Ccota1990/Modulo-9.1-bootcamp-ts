// Tipos e Interfaces
type TipoIva = "general" | "reducido" | "superreducidoA" | "superreducidoB" | "superreducidoC" | "sinIva";

interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

interface ResultadoLineaTicket {
  nombre: string;
  cantidad: number;
  precioSinIva: number;
  tipoIva: TipoIva;
  precioConIva: number;
}

interface ResultadoTotalTicket {
  totalSinIva: number;
  totalConIva: number;
  totalIva: number;
}

interface TotalPorTipoIva {
  tipoIva: TipoIva;
  cuantia: number;
}

interface TicketFinal {
  lineas: ResultadoLineaTicket[];
  total: ResultadoTotalTicket;
  desgloseIva: TotalPorTipoIva[];
}

// Datos
const productos: LineaTicket[] = [
  {
    producto: { nombre: "Legumbres", precio: 2, tipoIva: "general" },
    cantidad: 2
  },
  {
    producto: { nombre: "Perfume", precio: 20, tipoIva: "general" },
    cantidad: 3
  },
  {
    producto: { nombre: "Leche", precio: 1, tipoIva: "superreducidoC" },
    cantidad: 6
  },
  {
    producto: { nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA" },
    cantidad: 1
  }
];

// Añadimos los valores del Iva de la tabla
const tasaIva = {
  general: 21,
  reducido: 10,
  superreducidoA: 5,
  superreducidoB: 4,
  superreducidoC: 0,
  sinIva: 0
};

const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  const resultado = lineasTicket.reduce<TicketFinal>((final, item) => {
    const { nombre, precio, tipoIva } = item.producto;
    const cantidad = item.cantidad;
    const precioSinIva = precio;
    const iva = precio * tasaIva[tipoIva] / 100;
    const precioConIva = precio + iva;

    final.lineas.push({
      nombre,
      cantidad,
      precioSinIva,
      tipoIva,
      precioConIva: parseFloat((precioConIva * cantidad).toFixed(2))
    });

    final.total.totalSinIva = precioSinIva * cantidad;
    final.total.totalConIva = precioConIva * cantidad;
    final.total.totalIva = iva * cantidad;

    const ivaIndex = final.desgloseIva.findIndex(d => d.tipoIva === tipoIva);
    if (ivaIndex !== -1) {
      final.desgloseIva[ivaIndex].cuantia += iva * cantidad;
    } else {
      final.desgloseIva.push({ tipoIva, cuantia: iva * cantidad });
    }

    return final;
  }, {
    lineas: [],
    total: { totalSinIva: 0, totalConIva: 0, totalIva: 0 },
    desgloseIva: []
  });

  // Redondeamos el iva a 2
  resultado.desgloseIva.forEach(iva => iva.cuantia = parseFloat(iva.cuantia.toFixed(2)));

  return resultado;
};

