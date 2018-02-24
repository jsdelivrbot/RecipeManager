import { EDIT_INGREDIENT, ADD_INGREDIENT, DELETE_INGREDIENT,FETCH_INGREDIENTS } from '../actions';
import axios from 'axios';
// const ret= axios.get("https://recipemanager-cad40.firebaseio.com/ingredients.json");


export default function(state = [], action) {
  switch (action.type) {
    case EDIT_INGREDIENT:
      console.log('editing ingredients');
      // window.localStorage.setItem('ingredientsList', JSON.stringify(state));
      return state;
    case ADD_INGREDIENT:
      console.log('adding ingredient');
      state.push(action.payload);
      console.log(state);
      // window.localStorage.setItem('ingredientsList', JSON.stringify(state));
      return state;
    case DELETE_INGREDIENT:
      // console.log('deleted ingredient',action.payload);
      const newState = state.filter((v, i) => i != action.payload);
      // window.localStorage.setItem('ingredientsList', JSON.stringify(newState));
      return newState;
    case FETCH_INGREDIENTS:
      // window.localStorage.setItem('ingredientsList', JSON.stringify(action.payload.data));
      return action.payload.data;
    default:
      return state;
  }
}
