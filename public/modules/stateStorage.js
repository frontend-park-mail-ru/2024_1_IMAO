'use strict';

/**
 *
 */
class StageStorage {
  /**
   *
   */
  constructor() {
    this.state = {};
  }
  /**
   *
   * @param {*} section
   * @param {*} key
   * @param {*} value
   */
  setSectionState(section, key, value) {
    this.state[section] = this.state[section] || {};
    this.state[section][key] = value;
  }

  /**
   *
   * @param {*} section
   * @param {*} key
   * @return {string}
   */
  getSectionState(section, key) {
    return this.state[section] ? this.state[section][key] : undefined;
  }
}

export default StageStorage;
