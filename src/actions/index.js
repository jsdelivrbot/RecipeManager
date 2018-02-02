export const ADD_INGREDIENT = 'add_ingredient';
export const EDIT_INGREDIENT = 'edit_ingredient';
export const DELETE_INGREDIENT = 'delete_ingredient';
export const FETCH_INGREDIENTS = 'fetch_ingredients';
// export const EDIT_INGREDIENTS = 'edit_procedures';

export function addIngredient(ingredient, callback) {
  callback();
  return {
    type: ADD_INGREDIENT,
    payload: ingredient
  };
}

export function editIngredient(id, ingredient, callback) {
  callback();
  return {
    type: EDIT_INGREDIENT,
    payload: { id, ingredient }
  };
}

export function deleteIngredient(id, callback) {
  callback();
  return {
    type: DELETE_INGREDIENT,
    payload: id
  };
}

export function fetchIngredients() {
  return {
    type: FETCH_INGREDIENTS,
    payload: {}
  };
}
// export function editProcedures(procedures){
//   return {
//     type : EDIT_PROCEDURES,
//     payload: procedures
//   };
// }
