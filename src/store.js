import { observable, action } from 'mobx';

class Store {
    @observable items = [];

    constructor(initialState) {
      this.items = initialState &&
        initialState &&
        initialState.items ? initialState.items : [];
    }

    @action
    addItem(item) {
      this.items.push(item);
    }

    toJson() {
      return {
        items: this.items
      };
    }
}

const s = new Store(typeof window === 'object' ? window.INITIAL_STATE : {});

if (window && window.INITIAL_STATE) {
  delete window.INITIAL_STATE;
}

export default s;
