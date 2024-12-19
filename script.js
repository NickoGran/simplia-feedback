// Función para obtener el parámetro `qr` de la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Obtener el valor del parámetro `qr`
const qrCode = getQueryParam('qr');

if (qrCode) {
  console.log('Código QR recibido:', qrCode); // Depuración
  const appsScriptUrl = "https://script.google.com/macros/s/AKfycbzT34Pttb7vVyT46sMSCHPHYG9PRwk5GGEhbiS4HG8rqk6AFU2l4nvAGZJLU06kGA8VgQ/exec";

  // Llamar al Apps Script con el parámetro `qr`
  fetch(`${appsScriptUrl}?qr=${encodeURIComponent(qrCode)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al conectar con Apps Script: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos recibidos del Apps Script:', data); // Depuración
      document.getElementById('codigo').textContent = qrCode;
      document.getElementById('cliente').textContent = data.cliente || "Cliente no encontrado";
      document.getElementById('sector').textContent = data.sector || "Sector no encontrado";
      document.getElementById('descripcion').textContent = data.descripcion || "Descripción no encontrada";
    })
    .catch(error => {
      console.error('Error al conectar con Apps Script:', error);
      document.getElementById('codigo').textContent = "Error al cargar los datos";
      document.getElementById('cliente').textContent = "Error";
      document.getElementById('sector').textContent = "Error";
      document.getElementById('descripcion').textContent = "Error";
    });
} else {
  console.error('Parámetro QR no encontrado en la URL.');
  document.getElementById('codigo').textContent = "No se proporcionó un código QR";
  document.getElementById('cliente').textContent = "N/A";
  document.getElementById('sector').textContent = "N/A";
  document.getElementById('descripcion').textContent = "N/A";
}
