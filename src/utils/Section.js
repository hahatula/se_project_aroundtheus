export default class Section {
    constructor( {items, renderer}, targetNodeSelector) {
        this._items = items; //should be array
        this._renderer = renderer; //function
        this._targetNode = document.querySelector(targetNodeSelector);
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item, this._targetNode);
        });
    }

    addItem(item) {
        this._renderer(item, this._targetNode);
    }
}