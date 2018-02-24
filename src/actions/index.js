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
    const promise= axios.put('https://recipemanager-cad40.firebaseio.com/ingredients.json',ingredient);
    return {
      type: ADD_INGREDIENT,
      payload: promise
    };
  },
  editIngredient = (ingredients, callback) => {
    callback();
    const promise= axios.put('https://recipemanager-cad40.firebaseio.com/ingredients.json',ingredients);
    return {
      type: EDIT_INGREDIENT,
      payload: ingredients
    };
  },
  deleteIngredient = (ingredients, callback) => {
    callback();
    const promise= axios.put('https://recipemanager-cad40.firebaseio.com/ingredients.json',ingredients);
    return {
      type: DELETE_INGREDIENT,
      payload: ingredients
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
    axios.put('https://recipemanager-cad40.firebaseio.com/recipes.json',recipe);
    return {
      type: EDIT_RECIPE,
      payload: recipe
    };
  },
  deleteRecipe = (recipes, callback) => {
    callback();
    axios.put('https://recipemanager-cad40.firebaseio.com/recipes.json',recipes);
    return {
      type: DELETE_RECIPE,
      payload: recipes
    };
  },
  addRecipe = (recipes, callback) => {
    callback();
    const promise= axios.put('https://recipemanager-cad40.firebaseio.com/recipes.json',recipes);
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
    const promise= axios.put('https://recipemanager-cad40.firebaseio.com/tasks.json',task);
    callback();
    return {
      type: EDIT_TASK,
      payload: { id, task }
    };
  },
  deleteTask = (newTasks, callback) => {
    const promise= axios.put('https://recipemanager-cad40.firebaseio.com/tasks.json',newTasks);
    callback();
    return {
      type: DELETE_TASK,
      payload: promise
    };
  },
  addTask = (task, callback) => {
    const promise= axios.put('https://recipemanager-cad40.firebaseio.com/tasks.json',task);
    callback();
    console.log(task);
    return {
      type: ADD_TASK,
      payload: task
    };
  };
