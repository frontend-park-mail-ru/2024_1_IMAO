'use strict';

const ObservableMixin = {
  /**
   * On observable method.
   * @param {*} event
   * @param {*} callback
   */
  on(event, callback) {
    if (this.listeners[event] === undefined) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  },

  /**
   * Emit observable method.
   * @param {*} event
   * @param {*} data
   */
  emit(event, data) {
    for (const listener of this.listeners[event]) {
      listener(data);
    }
  },
};

export default ObservableMixin;
