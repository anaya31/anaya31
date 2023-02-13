import * as model from './modal.js';
import { modalclosesec } from './config.js';
import recipeview from './views/recipeview.js';
import resultview from './views/resultview.js';
import searchview from './views/searchview.js';
import paginationview from './views/paginationview.js';
import bookmarkview from './views/bookmarkview.js';
import addrecipeview from './views/addrecipeview.js';
//console.log(icons);
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlrecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    //  console.log(id);
    if (!id) return;
    recipeview.renderspinner();
    resultview.update(model.getsearchresultpage());
    bookmarkview.update(model.state.bookmarks);
    await model.loadrecipe(id);

    recipeview.render(model.state.recipe);
  } catch (err) {
    recipeview.rendererror();
  }
};

const controlsearchresult = async function () {
  try {
    resultview.renderspinner();
    const query = searchview.getquery();
    if (!query) return;
    await model.loadsearchresult(query);
    // console.log(model.state.search.result);
    //resultview.render(model.state.search.result);
    resultview.render(model.getsearchresultpage());
    paginationview.render(model.state.search);
    //console.log(model.getsearchresultpage);
  } catch (err) {
    console.log(err);
  }
};
const controlpagination = function (gotopage) {
  resultview.render(model.getsearchresultpage(gotopage));
  paginationview.render(model.state.search);
};

const controlservings = function (newservings) {
  model.updateservings(newservings);
  recipeview.update(model.state.recipe);
};

const controladdbookmark = function () {
  if (!model.state.recipe.bookmarked) model.addbookmark(model.state.recipe);
  else model.deletebookmark(model.state.recipe.id);

  recipeview.update(model.state.recipe);
  bookmarkview.render(model.state.bookmarks);
};

const controlbookmarks = function () {
  bookmarkview.render(model.state.bookmarks);
};

const controladdrecipe = async function (newrecipe) {
  try {
    addrecipeview.renderspinner();
    await model.uploadrecipe(newrecipe);
    console.log(model.state.recipe);
    recipeview.render(model.state.recipe);
    addrecipeview.rendersuccess();
    bookmarkview.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addrecipeview.togglewindow();
    }, modalclosesec * 1000);
  } catch (err) {
    //console.error(err);
    addrecipeview.rendererror(err.message);
  }
};
//['haschange', 'load'].forEach(ev => window.addEventListener(ev, controlrecipe));

const init = function () {
  bookmarkview.addhandlerrender(controlbookmarks);
  recipeview.addhandler(controlrecipe);
  searchview.addhandlersearch(controlsearchresult);
  paginationview.addhandlerclick(controlpagination);
  recipeview.addhandlerupdateservings(controlservings);
  recipeview.addhandleraddbookmark(controladdbookmark);
  addrecipeview.addhandlerupload(controladdrecipe);
};
init();
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
