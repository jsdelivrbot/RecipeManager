export const ADD_INGREDIENT = 'add_ingredient',
  EDIT_INGREDIENT = 'edit_ingredient',
  DELETE_INGREDIENT = 'delete_ingredient',
  FETCH_INGREDIENTS = 'fetch_ingredients',
  FETCH_RECIPES = 'fetch_recipes',
  EDIT_RECIPE = 'edit_recipe',
  DELETE_RECIPE = 'delete_recipe',
  ADD_RECIPE = 'add_recipe',
  FETCH_TASKS = 'fetch_tasks',
  EDIT_TASK = 'edit_task',
  DELETE_TASK = 'delete_task',
  ADD_TASK = 'add_task';

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
  },
  fetchTasks = () => {
    return {
      type: FETCH_TASKS,
      payload: {}
    };
  },
  editTask = (id, task, callback) => {
    callback();
    return {
      type: EDIT_TASK,
      payload: { id, task }
    };
  },
  deleteTask = (id, callback) => {
    callback();
    return {
      type: DELETE_TASK,
      payload: id
    };
  },
  addTask = (task, callback) => {
    callback();
    return {
      type: ADD_TASK,
      payload: task
    };
  };
