'use strict';

/**
 * Implement Phone frame logic.
 * @param {HTMLInputElement} phoneForm
 */
export default function addDynamicPhoneForm(phoneForm) {
  // const input = this.#element.querySelector('[type="tel"]');
  const input = phoneForm;
  let keyCode;

  /**
   * Matches input on mask.
   * @param {Event} event
   */
  function mask(event) {
    event.keyCode && (keyCode = event.keyCode);
    // eslint-disable-next-line no-invalid-this
    const pos = this.selectionStart;
    // if (pos < 3) event.preventDefault();
    const matrix = '+7 (___) ___-__-__';
    let i = 0;
    const def = matrix.replace(/\D/g, '');
    // eslint-disable-next-line no-invalid-this
    const val = this.value.replace(/\D/g, '');
    let newValue = matrix.replace(/[_\d]/g, function(a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
    i = newValue.indexOf('_');
    if (i != -1) {
      i < 5 && (i = 3);
      newValue = newValue.slice(0, i);
    }

    let reg = matrix
    // eslint-disable-next-line no-invalid-this
        .substr(0, this.value.length)
        .replace(/_+/g, function(a) {
          return '\\d{1,' + a.length + '}';
        })
        .replace(/[+()]/g, '\\$&');
    reg = new RegExp('^' + reg + '$');
    if (
      // eslint-disable-next-line no-invalid-this
      !reg.test(this.value) ||
      // eslint-disable-next-line no-invalid-this
      this.value.length < 5 ||
      (keyCode > 47 && keyCode < 58)
    ) {
      // eslint-disable-next-line no-invalid-this
      this.value = newValue;
    }
    // eslint-disable-next-line no-invalid-this
    if (event.type == 'blur' && this.value.length < 5) this.value = '';
  }

  input.addEventListener('input', mask, false);
  input.addEventListener('focus', mask, false);
  input.addEventListener('blur', mask, false);
  input.addEventListener('keydown', mask, false);
  input.addEventListener('mouseup', (event) => {
    event.preventDefault();
    if (input.value.length < 4) {
      input.setSelectionRange(4, 4);
    } else {
      input.setSelectionRange(input.value.length, input.value.length);
    }
  });
}
