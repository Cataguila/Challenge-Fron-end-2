function agregarProducto(nombre, precio, imagen) {
  const productosSection = document.getElementById('productos');
  const newCard = document.createElement('div');
  newCard.className = 'card';

  const img = document.createElement('img');
  img.src = imagen || ''; // Si no se proporciona una imagen, establecer src como cadena vacía
  img.className = 'product-image'; // Añadir clase para estilizar la imagen

  const infoContainer = document.createElement('div');
  infoContainer.className = 'card-container--info';

  const nombreP = document.createElement('p');
  nombreP.textContent = `Nombre: ${nombre}`;

  const valueContainer = document.createElement('div');
  valueContainer.className = 'card-container--value';

  const precioP = document.createElement('p');
  precioP.textContent = `$ ${precio}`;

  const trashButton = document.createElement('button');
  trashButton.className = 'delete-btn';
  trashButton.innerHTML = "<i class='bx bxs-trash'></i>";

  valueContainer.appendChild(precioP);
  valueContainer.appendChild(trashButton);

  infoContainer.appendChild(nombreP);
  infoContainer.appendChild(valueContainer);

  newCard.appendChild(img);
  newCard.appendChild(infoContainer);

  productosSection.appendChild(newCard);

  // Añadir evento de eliminación al nuevo botón
  trashButton.addEventListener('click', function() {
      newCard.remove();
      // Mostrar el mensaje "No hay productos" si no quedan productos después de eliminar
      if (productosSection.querySelectorAll('.card').length === 0) {
          document.getElementById('noProductsMessage').style.display = 'block';
      }
  });

  // Ocultar el mensaje "No hay productos" al agregar un producto
  document.getElementById('noProductsMessage').style.display = 'none';
}

const form = document.querySelector('#formulario form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const fileInput = document.getElementById('file');
const submitButton = document.querySelector('.container__buttons button:first-of-type');
const resetButton = document.querySelector('.container__buttons button:last-of-type');
const errorMessages = document.getElementById('errorMessages');

// Función para mostrar mensajes de error
function displayErrorMessage(message) {
  errorMessages.innerHTML = `<p>${message}</p>`;
  errorMessages.style.display = 'block';
}

// Función para ocultar mensajes de error
function hideErrorMessages() {
  errorMessages.innerHTML = '';
  errorMessages.style.display = 'none';
}

// Función para validar los campos y habilitar/deshabilitar el botón de envío
function validateForm() {
  const nombre = nameInput.value.trim();
  const precio = priceInput.value.trim();
  const imagen = fileInput.files.length ? URL.createObjectURL(fileInput.files[0]) : '';

  if (nombre === '' || precio === '' || !imagen) {
      displayErrorMessage('Todos los campos son obligatorios');
      submitButton.disabled = true;
  } else if (!/^\d+(\.\d{1,2})?$/.test(precio)) { // Validar el formato del precio
      displayErrorMessage('El precio debe ser un número válido (puede tener hasta dos decimales)');
      submitButton.disabled = true;
  } else {
      hideErrorMessages();
      submitButton.disabled = false;
  }
}

priceInput.addEventListener('input', function (event) {
  const value = event.target.value;
  if (!/^\d*\.?\d*$/.test(value)) {
      event.target.value = value.slice(0, -1);
  }
  validateForm();
});

form.addEventListener('input', validateForm);

submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  const nombre = nameInput.value.trim();
  const precio = priceInput.value.trim();
  const imagen = URL.createObjectURL(fileInput.files[0]);

  agregarProducto(nombre, precio, imagen);

  form.reset();
  validateForm();
  
});

resetButton.addEventListener('click', function (event) {
  event.preventDefault();
  form.reset();
  validateForm();
});

validateForm();

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const colorButtons = document.querySelectorAll('.color-buttons button');

  colorButtons.forEach(button => {
      button.addEventListener('click', () => {
          const color = button.getAttribute('data-color');
          header.style.backgroundColor = color;
      });
  });
});
