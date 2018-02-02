import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import App from './components/app';
import IngredientDetail from './components/ingredient_detail';
import ProjectNew from './components/ingredient_new';
import IngredientsList from './containers/ingredients_list';
import Index from './containers/index';
// import ProcedureList from './containers/procedure_list';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/skladnik/nowy" component={ProjectNew} />
          <Route path="/skladnik/:id" component={IngredientDetail} />
          <Route path="/skladniki" component={IngredientsList} />
          {/* <Route path="/przepisy" component={RecipesList} /> */}
          <Route path="/" component={Index} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('.container')
);
