'use strict';

/* eslint-disable no-invalid-this */

const MIN_LENGTH = 5;
const REGION_CODE_POS = 3;
const NUM_START_POS = 4;
const KEY_CODE = {
  START: 47,
  END: 58,
};

/**
 * Implement Phone frame logic.
 * @param {HTMLInputElement} phoneForm
 */
export default function addDynamicPhoneForm(phoneForm) {
  const input = phoneForm;
  let keyCode;

  /**
   * Matches input on mask.
   * @param {Event} event
   */
  function mask(event) {
    event.keyCode && (keyCode = event.keyCode);
    const pos = this.selectionStart;
    const matrix = '+7 (___) ___-__-__';
    let i = 0;
    const def = matrix.replace(/\D/g, '');
    const val = this.value.replace(/\D/g, '');
    let newValue = matrix.replace(/[_\d]/g, function(a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
    i = newValue.indexOf('_');
    if (i != -1) {
      i < MIN_LENGTH && (i = REGION_CODE_POS);
      newValue = newValue.slice(0, i);
    }

    let reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function(a) {
          return '\\d{1,' + a.length + '}';
        })
        .replace(/[+()]/g, '\\$&');
    reg = new RegExp('^' + reg + '$');
    if (
      !reg.test(this.value) ||
      this.value.length < MIN_LENGTH ||
      (keyCode > KEY_CODE.START && keyCode < KEY_CODE.END)
    ) {
      this.value = newValue;
    }
    if (event.type == 'blur' && this.value.length < MIN_LENGTH) {
      this.value = '';
    }
  }

  input.addEventListener('input', mask, false);
  input.addEventListener('focus', mask, false);
  input.addEventListener('blur', mask, false);
  input.addEventListener('keydown', mask, false);
  input.addEventListener('mouseup', (event) => {
    event.preventDefault();
    if (input.value.length < NUM_START_POS) {
      input.setSelectionRange(NUM_START_POS, NUM_START_POS);
    } else {
      input.setSelectionRange(input.value.length, input.value.length);
    }
  });
}
