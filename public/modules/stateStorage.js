'use strict';

class StageStorage {
    constructor() {
        this.state = {}
    }

    setSectionState(section, key, value) {
        this.state[section] = this.state[section] || {};
        this.state[section][key] = value;
    }

    getSectionState(section, key) {
        return this.state[section] ? this.state[section][key] : undefined;
    }
}

export default StageStorage;
