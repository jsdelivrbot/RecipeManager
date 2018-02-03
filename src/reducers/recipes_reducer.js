import { EDIT_RECIPE, ADD_RECIPE, DELETE_RECIPE } from '../actions';
var ret;
if (window.localStorage.getItem('recipesList')) {
  ret = JSON.parse(window.localStorage.getItem('recipesList'));
} else {
  ret = [
    {
      name: 'Zupa krem z pomidorow',
      amount: 6,
      unit: 'kg',
      ingredients: [
        { name: 'Kasza gryczana', price: '12', unit: 'g', id: '1517611139551' }
      ]
    }
  ];
}

export default function(state = ret, action) {
  switch (action.type) {
    case EDIT_RECIPE:
      console.log('editing recipes');
      window.localStorage.setItem('recipesList', JSON.stringify(state));
      return state;
    case ADD_RECIPE:
      console.log('adding recipe');
      state.push(action.payload);
      window.localStorage.setItem('recipesList', JSON.stringify(state));
      return state;
    case DELETE_RECIPE:
      console.log('deleted recipe');
      const newState = state.filter((v, i) => i != action.payload);
      window.localStorage.setItem('recipesList', JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
}
