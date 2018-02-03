import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RecipesList from './containers/recipes_list';
import RecipeDetail from './components/recipe_detail';
import RecipeNew from './components/recipe_new';
import TasksList from './containers/tasks_list';
import TaskDetail from './components/task_detail';
import TaskNew from './components/task_new';
import IngredientDetail from './components/ingredient_detail';
import IngredientNew from './components/ingredient_new';
import IngredientsList from './containers/ingredients_list';
import Index from './containers/index';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/skladnik/nowy" component={IngredientNew} />
          <Route path="/skladnik/:id" component={IngredientDetail} />
          <Route path="/skladniki" component={IngredientsList} />
          <Route path="/przepis/nowy" component={RecipeNew} />
          <Route path="/przepis/:id" component={RecipeDetail} />
          <Route path="/przepisy" component={RecipesList} />
          <Route path="/zadanie/nowy" component={TaskDetail} />
          <Route path="/zadanie/:id" component={TaskDetail} />
          <Route path="/zadania" component={TasksList} />
          <Route path="/" component={Index} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('.container')
);
