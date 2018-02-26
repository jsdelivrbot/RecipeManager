import { EDIT_INGREDIENT, ADD_INGREDIENT, DELETE_INGREDIENT,FETCH_INGREDIENTS } from '../actions';
import axios from 'axios';
import {omit} from 'lodash';
// const ret= axios.get("https://recipemanager-cad40.firebaseio.com/ingredients.json");


export default function(state = {}, action) {
  switch (action.type) {
    case EDIT_INGREDIENT:
      console.log('editing ingredients');
      // window.localStorage.setItem('ingredientsList', JSON.stringify(state));
      return state;
    case ADD_INGREDIENT:
      console.log('adding ingredient');
      // window.localStorage.setItem('ingredientsList', JSON.stringify(state));
      return  state;
    case DELETE_INGREDIENT:
      // console.log('deleted ingredient',action.payload);
      // window.localStorage.setItem('ingredientsList', JSON.stringify(newState));

      return omit(state,[action.payload]);
    case FETCH_INGREDIENTS:
    console.log(action.payload.data);
      // window.localStorage.setItem('ingredientsList', JSON.stringify(action.payload.data));
      return action.payload.data;
    default:
      return state;
  }
}
