// Obtener el parámetro `qr` de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  const qrCode = getQueryParam('qr');
  const appsScriptUrl = "https://script.google.com/macros/s/TU_ID_DEL_SCRIPT/exec";
  
  if (qrCode) {
    // Llamar al Apps Script con el parámetro `qr`
    fetch(`${appsScriptUrl}?qr=${encodeURIComponent(qrCode)}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('codigo').textContent = qrCode;
        document.getElementById('cliente').textContent = data.cliente;
        document.getElementById('sector').textContent = data.sector;
        document.getElementById('descripcion').textContent = data.descripcion;
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('codigo').textContent = "Error al cargar los datos";
      });
  } else {
    document.getElementById('codigo').textContent = "No se proporcionó un código QR";
  }
  