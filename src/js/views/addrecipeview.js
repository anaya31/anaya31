import icons from '../../img/icons.svg';
import view from './view.js';
class addrecipeview extends view {
  _parentelement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addhandlershowwindow();
    this._addhandlerhidewindow();
  }

  togglewindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addhandlershowwindow() {
    this._btnOpen.addEventListener('click', this.togglewindow.bind(this));
  }

  _addhandlerhidewindow() {
    this._btnClose.addEventListener('click', this.togglewindow.bind(this));
    this._overlay.addEventListener('click', this.togglewindow.bind(this));
  }

  addhandlerupload(handler) {
    this._parentelement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataarr = [...new FormData(this)];
      const data = Object.fromEntries(dataarr);
      handler(data);
    });
  }

  _generatemarkup() {}
}
export default new addrecipeview();
