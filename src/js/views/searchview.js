class searchview {
  _parentel = document.querySelector('.search');
  getquery() {
    const query = this._parentel.querySelector('.search__field').value;
    this._clearinput();
    return query;
  }
  _clearinput() {
    this._parentel.querySelector('.search__field').value = '';
  }
  addhandlersearch(handler) {
    this._parentel.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchview();
