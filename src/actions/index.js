import axios from 'axios';
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
    const promise= axios.post('https://recipemanager-cad40.firebaseio.com/ingredients.json',ingredient);
    return {
      type: ADD_INGREDIENT,
      payload: promise
    };
  },
  editIngredient = (id,ingredient, callback) => {
    callback();
    const promise= axios.put(`https://recipemanager-cad40.firebaseio.com/ingredients/${id}.json`,ingredient);
    return {
      type: EDIT_INGREDIENT,
      payload: ingredient
    };
  },
  deleteIngredient = (id, callback) => {
    callback();
    const promise= axios.delete(`https://recipemanager-cad40.firebaseio.com/ingredients/${id}.json`);
    return {
      type: DELETE_INGREDIENT,
      payload: id
    };
  },
  fetchIngredients = () => {
    const request = axios.get("https://recipemanager-cad40.firebaseio.com/ingredients.json");
    return {
      type: FETCH_INGREDIENTS,
      payload: request
    };
  },
  fetchRecipes = () => {
    console.log('fetching recipes');
    const request = axios.get("https://recipemanager-cad40.firebaseio.com/recipes.json");
    return {
      type: FETCH_RECIPES,
      payload: request
    };
  },
  editRecipe = (id, recipe, callback) => {
    callback();
    const promise= axios.put(`https://recipemanager-cad40.firebaseio.com/recipes/${id}.json`,recipe);
    return {
      type: EDIT_RECIPE,
      payload: recipe
    };
  },
  deleteRecipe = (id, callback) => {
    callback();
    console.log(id);
    const promise= axios.delete(`https://recipemanager-cad40.firebaseio.com/recipes/${id}.json`);
    return {
      type: DELETE_RECIPE,
      payload: promise
    };
  },
  addRecipe = (recipe, callback) => {
    callback();
    const promise= axios.post('https://recipemanager-cad40.firebaseio.com/recipes.json',recipe);
    return {
      type: ADD_RECIPE,
      payload: promise
    };
  },
  fetchTasks = () => {
    const request = axios.get("https://recipemanager-cad40.firebaseio.com/tasks.json");
    return {
      type: FETCH_TASKS,
      payload: request
    };
  },
  editTask = (id, task, callback) => {
    console.log('editing task',id,task);
    const promise= axios.put(`https://recipemanager-cad40.firebaseio.com/tasks/${id}.json`,task);
    callback();
    return {
      type: EDIT_TASK,
      payload: { id, task }
    };
  },
  deleteTask = (id, callback) => {
    const promise= axios.delete(`https://recipemanager-cad40.firebaseio.com/tasks/${id}.json`);
    callback();
    return {
      type: DELETE_TASK,
      payload: promise
    };
  },
  addTask = (task, callback) => {
    const promise= axios.post('https://recipemanager-cad40.firebaseio.com/tasks.json',task);
    callback();
    console.log(task);
    return {
      type: ADD_TASK,
      payload: task
    };
  };
