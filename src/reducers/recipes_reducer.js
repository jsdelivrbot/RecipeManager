import { EDIT_RECIPE, ADD_RECIPE, DELETE_RECIPE,FETCH_RECIPES } from '../actions';

// var ret;


export default function(state = [], action) {
  switch (action.type) {
    case EDIT_RECIPE:
      console.log('editing recipes');
      // window.localStorage.setItem('recipesList', JSON.stringify(state));
      return state;
    case ADD_RECIPE:
      console.log('adding recipe');
      console.log(action.payload);
      // state.push(action.payload);
      // window.localStorage.setItem('recipesList', JSON.stringify(state.ingredients));
      return state;
    case DELETE_RECIPE:
      console.log('deleted recipe');
      // window.localStorage.setItem('recipesList', JSON.stringify(newState));
      return state;
    case FETCH_RECIPES:
      console.log('fetching recipes',action.payload.data);
      // window.localStorage.setItem('recipesList', JSON.stringify(action.payload.data));
      return action.payload.data;
    default:
      return state;
  }
}
