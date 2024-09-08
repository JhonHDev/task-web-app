function formatDateToLongFormat(dateString: string): string {
  // Crear un objeto Date a partir de la cadena de fecha
  const date = new Date(dateString);

  // Array con los nombres de los meses
  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  // Extraer el día, mes y año
  const day = date.getDate();
  const month = months[date.getMonth()]; // Obtener el nombre del mes
  const year = date.getFullYear();

  // Formatear y retornar la fecha en formato '21 de agosto de 2024'
  return `${day} de ${month} de ${year}`;
}

export default formatDateToLongFormat;
