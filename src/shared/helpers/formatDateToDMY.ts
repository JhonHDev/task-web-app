function formatDateToDMY(dateString: string): string {
  // Crear un objeto Date a partir de la cadena de fecha
  const date = new Date(dateString);

  // Extraer el día, mes y año
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
  const year = date.getFullYear();

  // Formatear y retornar la fecha en formato 'dd/mm/yyyy'
  return `${day}/${month}/${year}`;
}

export default formatDateToDMY;
