import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Redux, { bindActionCreators } from 'redux';

import MenuBar from '../components/menu_bar';
import { fetchTasks } from '../actions';

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
      tasks: this.props.tasks
    };
  }

  componentWillMount() {
    console.log(this.props);
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

  renderTasks() {
    console.log(this.state);
    return this.state.tasks.map((task, i) => {
      return (
        <ListItem
          key={i}
          leftAvatar={<Avatar icon={<FileFolder />} />}
          primaryText={task.name}
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
        <Link to="/zadanie/nowy">
          <FlatButton label="Dodaj zadanie" fullWidth={true} />
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTasks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
