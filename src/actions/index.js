export const ADD_INGREDIENT = 'add_ingredient',
  EDIT_INGREDIENT = 'edit_ingredient',
  DELETE_INGREDIENT = 'delete_ingredient',
  FETCH_INGREDIENTS = 'fetch_ingredients',
  FETCH_RECIPES = 'fetch_recipes',
  EDIT_RECIPE = 'edit_recipe',
  DELETE_RECIPE = 'delete_recipe',
  ADD_RECIPE = 'add_recipe';

export const addIngredient = (ingredient, callback) => {
    callback();
    return {
      type: ADD_INGREDIENT,
      payload: ingredient
    };
  },
  editIngredient = (id, ingredient, callback) => {
    callback();
    return {
      type: EDIT_INGREDIENT,
      payload: { id, ingredient }
    };
  },
  deleteIngredient = (id, callback) => {
    callback();
    return {
      type: DELETE_INGREDIENT,
      payload: id
    };
  },
  fetchIngredients = () => {
    return {
      type: FETCH_INGREDIENTS,
      payload: {}
    };
  },
  fetchRecipes = () => {
    return {
      type: FETCH_RECIPES,
      payload: {}
    };
  },
  editRecipe = (id, recipe, callback) => {
    callback();
    return {
      type: EDIT_RECIPE,
      payload: { id, recipe }
    };
  },
  deleteRecipe = (id, callback) => {
    callback();
    return {
      type: DELETE_RECIPE,
      payload: id
    };
  },
  addRecipe = (recipe, callback) => {
    callback();
    return {
      type: ADD_RECIPE,
      payload: recipe
    };
  };
