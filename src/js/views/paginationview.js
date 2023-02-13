import icons from '../../img/icons.svg';
import view from './view.js';
class paginationview extends view {
  _parentelement = document.querySelector('.pagination');

  addhandlerclick(handler) {
    this._parentelement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotopage = +btn.dataset.goto;
      handler(gotopage);
    });
  }

  _generatemarkup() {
    const curpage = this._data.page;
    const numpages = Math.ceil(
      this._data.result.length / this._data.resultperpage
    );
    console.log(numpages);
    if (curpage === 1 && numpages > 1) {
      return `<button data-goto='${
        curpage + 1
      }' class="btn--inline pagination__btn--next">
        <span>Page ${curpage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> `;
    }
    if (curpage === numpages && numpages > 1) {
      return `<button data-goto='${
        curpage - 1
      }'  class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curpage - 1}</span>
      </button>`;
    }
    if (curpage < numpages) {
      return `<button data-goto='${
        curpage + 1
      }'  class="btn--inline pagination__btn--next">
        <span>Page ${curpage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> 
      <button data-goto='${
        curpage - 1
      }'  class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curpage - 1}</span>
      </button>`;
    }
    return '';
  }
}

export default new paginationview();
