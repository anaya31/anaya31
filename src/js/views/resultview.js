import icons from '../../img/icons.svg';
import view from './view.js';
import previewview from './previewview.js';
class resultview extends view {
  _parentelement = document.querySelector('.results');
  _errormessage = 'No recipes found for your query';
  _message = '';
  _generatemarkup() {
    console.log(this._data);
    return this._data
      .map(result => previewview.render(result, false))
      .join(' ');
  }
}
export default new resultview();
