'use strict';

/**
 * Class represents a state storage.
 */
class StageStorage {
  /**
   * constructor for a state storage.
   */
  constructor() {
    this.state = {};
  }

  /**
   * Sets a state section.
   * @param {*} section
   * @param {*} key
   * @param {*} value
   */
  setSectionState(section, key, value) {
    this.state[section] = this.state[section] || {};
    this.state[section][key] = value;
  }

  /**
   * Gets a state section.
   * @param {*} section
   * @param {*} key
   * @return {string}
   */
  getSectionState(section, key) {
    return this.state[section] ? this.state[section][key] : undefined;
  }
}

export default StageStorage;
