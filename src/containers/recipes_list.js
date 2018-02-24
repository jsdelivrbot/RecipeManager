import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Redux, { bindActionCreators } from 'redux';
import axios from 'axios';
import MenuBar from '../components/menu_bar';
import { fetchRecipes } from '../actions';

import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500, yellow600 } from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import TextField from 'material-ui/TextField';

class RecipesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
  }

  componentWillMount() {
    this.props.fetchRecipes();
  }

  goToRecipe(id) {
    this.props.history.push('/przepis/' + id);
  }

  searchRecipe(e) {
    this.state.term = e.target.value;
    this.state.recipes = this.props.recipes.filter((item, i) => {
      let a = true;
      item.name.search(new RegExp(e.target.value, 'i')) == -1
        ? (a = false)
        : (a = true);
      return a;
    });
    this.setState(this.state);
  }

  renderRecipes() {
    return this.props.recipes.map((recipe, i) => {
      return (
        <ListItem
          key={i}
          leftAvatar={<Avatar icon={<FileFolder />} />}
          // rightIcon={<ActionInfo />}
          primaryText={recipe.name}
          // secondaryText={`${recipe.price} / ${recipe.unit}`}
          onClick={e => this.goToRecipe(i)}
        />
      );
    });
  }


  render() {
    return (
      <div>
        <MenuBar title="Lista przepisów" />
        <TextField
          hintText="wyszukaj przepis"
          underlineShow={true}
          value={this.state.term}
          onChange={e => this.searchRecipe(e)}
        />
        <List>{this.renderRecipes()}</List>
        <Divider inset={true} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRecipes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);
