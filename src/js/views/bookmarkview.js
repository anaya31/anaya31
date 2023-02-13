import icons from '../../img/icons.svg';
import view from './view.js';
import previewview from './previewview.js';
class bookmarkview extends view {
  _parentelement = document.querySelector('.bookmarks__list');
  _errormessage = 'No bookmarks yet.Find a nice recipe and bookmark it;)';
  _message = '';

  addhandlerrender(handler) {
    window.addEventListener('load', handler);
  }
  _generatemarkup() {
    return this._data
      .map(bookmark => previewview.render(bookmark, false))
      .join(' ');
  }
}
export default new bookmarkview();
