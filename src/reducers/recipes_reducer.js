import { EDIT_RECIPE, ADD_RECIPE, DELETE_RECIPE } from '../actions';
var ret;
if (window.localStorage.getItem('recipesList')) {
  ret = JSON.parse(window.localStorage.getItem('recipesList'));
} else {
  ret = [
    {
      id: '122424234234',
      name: 'Zupa krem z pomidorow',
      baseAmount: 6,
      unit: 'kg',
      ingredients: [
        {
          name: 'Kasza jaglana',
          price: 6.91,
          unit: 'kg',
          id: '124241242443',
          amount: 56
        }
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
