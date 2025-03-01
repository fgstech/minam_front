// utils/generateTimeOptions.js

/**
 * Genera una lista de opciones de horarios en intervalos definidos
 * entre la hora de inicio y la hora de término en formato de 24 horas.
 * @param {string} startHour - Hora de inicio en formato 'HH:mm'.
 * @param {string} endHour - Hora de término en formato 'HH:mm'.
 * @param {number} interval - Intervalo en minutos para las opciones (por defecto 60 minutos).
 * @returns {Array} - Arreglo de objetos con las propiedades 'value' y 'label' en formato de 24 horas.
 */
function generateTimeOptions(startHour, endHour, interval = 60) {
  const options = [];
  let [startHours, startMinutes] = startHour.split(':').map(Number);
  const [endHours, endMinutes] = endHour.split(':').map(Number);

  // Formatea las horas y minutos en formato de 24 horas
  const formatTime = (hours, minutes) => {
    const displayHours = hours.toString().padStart(2, '0');
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes}`;
  };

  // Genera las opciones dentro del rango de tiempo especificado
  while (startHours < endHours || (startHours === endHours && startMinutes <= endMinutes)) {
    const value = formatTime(startHours, startMinutes); // Ambas propiedades usan el formato de 24 horas
    const label = value; // Utiliza el mismo formato para value y label

    options.push({ value, label });

    // Incrementar la hora según el intervalo
    startMinutes += interval;
    if (startMinutes >= 60) {
      startHours += Math.floor(startMinutes / 60);
      startMinutes = startMinutes % 60;
    }
  }

  return options;
}

export default generateTimeOptions;