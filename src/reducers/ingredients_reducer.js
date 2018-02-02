import { EDIT_INGREDIENT, ADD_INGREDIENT, DELETE_INGREDIENT } from '../actions';
import { remove } from 'lodash';
var ret;
if (window.localStorage.getItem('ingredientsList')) {
  ret = JSON.parse(window.localStorage.getItem('ingredientsList'));
} else {
  ret = [
    {
      name: 'Kasza jaglana',
      price: 6.91,
      unit: 'kg'
    },
    { name: 'Cebula', price: 2.11, unit: 'kg' },
    { name: 'Mleko sojowe', price: 7.9, unit: 'l' }
  ];
}

export default function(state = ret, action) {
  switch (action.type) {
    case EDIT_INGREDIENT:
      console.log('editing ingredients');
      window.localStorage.setItem('ingredientsList', JSON.stringify(state));
      return state;
    case ADD_INGREDIENT:
      console.log('adding ingredient');
      state.push(action.payload);
      window.localStorage.setItem('ingredientsList', JSON.stringify(state));
      return state;
    case DELETE_INGREDIENT:
      console.log('deleted ingredient');
      const newState = state.filter((v, i) => i != action.payload);
      window.localStorage.setItem('ingredientsList', JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
}
