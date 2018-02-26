import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Redux, { bindActionCreators } from 'redux';
// import { generateID } from '../helpers'

import MenuBar from '../components/menu_bar';
import { fetchTasks,fetchRecipes,fetchIngredients,addTask } from '../actions';

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
import FlatButton from 'material-ui/FlatButton';

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
  }

  componentWillMount() {
    this.props.fetchTasks();
    this.props.fetchRecipes();
    this.props.fetchIngredients();
  }

  goToTask(id) {
    this.props.history.push('/zadanie/' + id);
  }

  searchTask(e) {
    this.state.term = e.target.value;
    this.state.tasks = this.props.tasks.filter((item, i) => {
      let a = true;
      item.name.search(new RegExp(e.target.value, 'i')) == -1
        ? (a = false)
        : (a = true);
      return a;
    });
    this.setState(this.state);
  }
  addTask(){
    this.props.addTask(
      {name: 'nowe zadanie(list)',amount: '100',unit: 'kg', ingredients: {},recipes:{},date:new Date() },
      () => this.props.history.push('/')
    );
  }

  renderTasks() {
    console.log(this.state);
    return Object.entries(this.props.tasks).map((task, i) => {
      return (
        <ListItem
          key={i}
          leftAvatar={<Avatar icon={<FileFolder />} />}
          primaryText={task[1].name}
          onClick={e => this.goToTask(i)}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <MenuBar title="Lista zadań" />
        <TextField
          hintText="wyszukaj zadanie"
          underlineShow={true}
          value={this.state.term}
          onChange={e => this.searchTask(e)}
        />
        <List>{this.renderTasks()}</List>
        <Divider inset={true} />
        <FlatButton label="Dodaj zadanie" fullWidth={true} onClick={()=>this.addTask()}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    ingredients: state.ingredients,
    recipes: state.recipes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTasks,fetchRecipes,fetchIngredients,addTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
