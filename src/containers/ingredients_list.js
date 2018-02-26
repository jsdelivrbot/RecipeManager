import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Redux, { bindActionCreators } from 'redux';

import MenuBar from '../components/menu_bar';
import { fetchIngredients } from '../actions';

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
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

export class IngredientsListRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
  }

  componentWillMount() {
      this.props.fetchIngredients();
  }

  goToIngredient(id) {
    this.props.history.push('/skladnik/' + id);
  }

  searchIngredient(e) {
    this.state.term = e.target.value;
    this.state.ingredients = this.props.ingredients.filter((item, i) => {
      let a = true;
      item.name.search(new RegExp(e.target.value, 'i')) == -1
        ? (a = false)
        : (a = true);
      return a;
    });
    this.setState(this.state);
  }

  renderIngredients() {
    return this.props.ingredients && Object.keys(this.props.ingredients).map((key, i) => {
      const ingredient = this.props.ingredients[key];
      return (
        <ListItem
          key={i}
          leftAvatar={<Avatar icon={<FileFolder />} />}
          // rightIcon={<ActionInfo />}
          primaryText={ingredient.name}
          secondaryText={`${ingredient.price} / ${ingredient.unit}`}
          onClick={e => this.goToIngredient(i)}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <MenuBar title="Lista składników" />
        <button onClick={()=>{
          this.props.fetchIngredients()
          this.setState(this.state)
        }}/>
        <TextField
          hintText="wyszukaj składnik"
          underlineShow={true}
          value={this.state.term}
          onChange={e => this.searchIngredient(e)}
        />
        <List>{this.renderIngredients()}</List>
        <Divider inset={true} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ingredients: state.ingredients
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchIngredients }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsListRaw);
