import { observable, action } from 'mobx';

export default class Store {
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
