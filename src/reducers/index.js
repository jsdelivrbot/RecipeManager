import { combineReducers } from 'redux';
import IngredientsReducer from './ingredients_reducer';
import RecipesReducer from './recipes_reducer';
// import TasksReducer from './tasks_reducer';

const rootReducer = combineReducers({
  ingredients: IngredientsReducer,
  recipes: RecipesReducer
  // tasks: TasksReducer
});

export default rootReducer;
