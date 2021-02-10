import Modal from './Modal';

export default class GeoAddModal extends Modal {
  constructor(type = 'geoModal') {
    super(type);
    this.errorBox = document.querySelector('.error-box');
  }

  createMarkup() {

     return `
      <div class="modal modal-wrapper hidden"  data-type="geoModal">
        <form class="form-modal geo-form-modal" data-type="geoModal" novalidate>
          <div class="form-title">Что-то пошло не так!</div>
          <p class="message-content">
            К сожалению нам не удалось определить ваше местоположение.
            Пожалуйста, дайте разрешение на использование геолокации,
             либо введите координаты вручную (числа c разделителем "." или ",").
          </p>

          <div class="modal-coords-row modal-row">
            <label>X:  <input type="text" class="lat_input" name="latitude_field"></label>
            <label>Y:  <input type="text" class="long_input" name="longitude_field"></label>
          </div> 

          <div class='error-box hidden'></div>
          
          <div class="modal-btn-row modal-row">
            <button class="modal-btn ok-btn">Apply</button>
            <button class="modal-btn cancel-btn">Cancel</button>            
          </div>      
        </form>
      </div>
    `;
  }

  getCoordinates() {
    const x = this.wrapper.querySelector('.lat_input').value.trim().replace(',', '.');
    const y = this.wrapper.querySelector('.long_input').value.trim().replace(',', '.');

    return { latitude: +x, longitude: +y };
  }

  showError(message) {
    console.log(message)
    const errorBox = document.querySelector('.error-box');
    errorBox.textContent = message;
    errorBox.classList.remove('hidden');

    setTimeout(() => errorBox.classList.add('hidden'), 3000);
  }
}
