import { async } from 'regenerator-runtime';
import { API, res_per_page, key } from './config.js';
//import { getjson, sendjson } from './helpers.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    resultperpage: res_per_page,
    page: 1,
  },
  bookmarks: [],
};

const createrecipeobject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceurl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadrecipe = async function (id) {
  try {
    const data = await AJAX(
      //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40'
      `${API}/${id}?key=${key}`
    );
    state.recipe = createrecipeobject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    console.log(state.recipe);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const loadsearchresult = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(
      //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40'
      `${API}?search=${query}&key=${key}`
    );
    console.log(data);
    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.log(`${err}`);
    throw err;
  }
};

export const getsearchresultpage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultperpage;
  const end = page * state.search.resultperpage;
  return state.search.result.slice(start, end);
};
//loadsearchresult('pizza');
export const updateservings = function (newservings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newservings) / state.recipe.servings;
  });
  state.recipe.servings = newservings;
};

const persistbookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addbookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistbookmark();
};

export const deletebookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistbookmark();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
console.log(state.bookmarks);

const clearbookmarks = function () {
  localStorage.clear('bookmarks');
};

export const uploadrecipe = async function (newrecipe) {
  try {
    const ingredients = Object.entries(newrecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingarr = ing[1].split(',').map(el => el.trim());
        if (ingarr.length !== 3)
          throw new Error(
            'Wrong ingridient format!Please use correct format : '
          );
        const [quantity, unit, description] = ingarr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newrecipe.title,
      source_url: newrecipe.sourceUrl,
      image_url: newrecipe.image,
      publisher: newrecipe.publisher,
      cooking_time: +newrecipe.cookingTime,
      servings: +newrecipe.servings,
      ingredients,
    };
    const data = await AJAX(`${API}?key=${key}`, recipe);
    state.recipe = createrecipeobject(data);
    addbookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
