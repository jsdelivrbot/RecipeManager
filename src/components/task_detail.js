import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Redux, { bindActionCreators } from 'redux'
import { pullAllBy, intersectionBy, cloneDeep } from 'lodash'

import MenuBar from './menu_bar'
import { RecipesListRaw } from '../containers/recipes_list'

import { editTask, deleteTask, addTask } from '../actions'
import { units, getNewTask } from '../constants'
import { parseRelations, generateIngredientsToPrepare } from '../helpers'

// import ImagesUploader from 'react-images-uploader';
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css';

import DatePicker from 'material-ui/DatePicker'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import ActionAssignment from 'material-ui/svg-icons/action/assignment'
import { blue500, yellow600, red500 } from 'material-ui/styles/colors'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

class TaskDetail extends Component {
  constructor(props) {
    super(props)
    this.id = props.match.params.id
    if (this.id === undefined) {
      this.props.addTask(getNewTask(), () => {})
      this.props.history.push('/zadania/')
    }
    this.newTask = this.props.tasks[this.id]
    this.state = {
      open: false,
      id: this.id,
      newTask: this.newTask,
      value: null,
      selectedRecipe: null
    }
  }

  handleChange(event, index, value) {
    this.setState({ ...this.state, value: value })
  }

  onSubmit = () => {
    const f1 = () => {
      this.props.editTask(this.id, this.state.newTask, () => {
        console.log('saved')
      })
    }
    const f2 = () => {
      alert('proszę wypełnić wszystie pola i podać poprawne daty')
    }
    this.state.newTask.name == '' ||
    this.state.newTask.location == '' ||
    this.state.newTask.date_start > this.state.newTask.date_end
      ? f2()
      : f1()
  }

  handleClose = () => {
    this.setState({
      ...this.state,
      open: false
    })
  }

  handleClose2 = () => {
    this.setState({ ...this.state, open: false })
    console.log(this.state)
    this.props.deleteTask(this.id, () => {
      this.props.history.push('/zadania')
    })
  }
  addRecipe = () => {
    const tmp = pullAllBy(
      cloneDeep(this.props.recipes),
      [...this.state.newTask.recipes],
      'name'
    )
    if (tmp.length > 0) {
      this.state.newTask.recipes.push(tmp[0])
      this.setState(this.state)
    }
  }
  removeRecipe = () => {
    this.state.newTask.recipes = this.state.newTask.recipes.filter((v, i) => {
      return i != this.state.selectedRecipe
    })
    this.setState(this.state)
  }
  renderRecipes() {
    return this.state.newTask.recipes.map((row, index) => (
      <TableRow key={index}>
        <TableRowColumn>
          <SelectField
            floatingLabelText="Danie"
            value={this.state.newTask.recipes[index].name}
            defaultValue={this.state.newTask.recipes[index].name}
            onChange={(e, i, v) => {
              const localAmount = this.state.newTask.recipes[index].amount
              this.state.newTask.recipes[index] = cloneDeep(
                this.props.recipes[i]
              )
              this.state.newTask.recipes[index].amount = localAmount
              this.setState(this.state)
            }}
            autoWidth={true}
          >
            {this.props.recipes.map(ing => (
              <MenuItem value={ing.name} primaryText={ing.name} key={ing.id} />
            ))}
          </SelectField>
        </TableRowColumn>
        <TableRowColumn>
          <TextField
            id={row.id}
            underlineShow={false}
            style={{ width: '90%' }}
            onChange={e => {
              row.amount = e.target.value
              this.setState(this.state)
            }}
            defaultValue={row.amount}
          />
        </TableRowColumn>
        <TableRowColumn>{row.unit}</TableRowColumn>
      </TableRow>
    ))
  }

  renderToDoList() {
    const toDoList = generateIngredientsToPrepare(this.state.newTask)
    return Object.keys(toDoList).map(key => (
      <TableRow key={key} selectable={false}>
        <TableRowColumn>{toDoList[key].name}</TableRowColumn>
        <TableRowColumn>{toDoList[key].amount}</TableRowColumn>
        <TableRowColumn>{toDoList[key].unit}</TableRowColumn>
      </TableRow>
    ))
  }

  render() {
    const actions = callback => {
      return [
        <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={callback}
        />
      ]
    }

    return this.id ? (
      <div>
        <MenuBar title="Edytuj zadanie" />
        <Paper zDepth={2} style={{ padding: 10 }}>
          <TextField
            hintText="Zadanie"
            underlineShow={false}
            onChange={e => {
              this.state.newTask.name = e.target.value
            }}
            defaultValue={this.state.newTask.name}
          />
          <Divider />
          <TextField
            underlineShow={false}
            floatingLabelText="Data"
            defaultValue={this.state.newTask.date}
          />
          <Divider style={{ marginTop: 20 }} />
          <Table onCellClick={x => (this.state.selectedRecipe = x)}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow
                style={{
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  background: 'blue',
                  width: '100%'
                }}
              >
                <TableHeaderColumn
                  colSpan="3"
                  tooltip="Lista Przepisów"
                  style={{
                    textAlign: 'center',
                    fontSize: '20px'
                  }}
                >
                  Lista dań
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="nazwa">Nazwa</TableHeaderColumn>
                <TableHeaderColumn tooltip="ilość">Ilość</TableHeaderColumn>
                <TableHeaderColumn tooltip="jednostka">
                  Jednostka
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.renderRecipes()}
              <TableRow
                style={{
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  background: 'blue',
                  width: '100%'
                }}
              >
                <TableHeaderColumn
                  colSpan="3"
                  tooltip="Lista Przepisów"
                  style={{
                    textAlign: 'center',
                    fontSize: '20px'
                  }}
                >
                  Do zrobienia
                </TableHeaderColumn>
              </TableRow>
              {this.renderToDoList()}
            </TableBody>
          </Table>{' '}
          <Dialog
            title="Uwaga!!!"
            actions={actions(() => {
              this.handleClose2()
            })}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Czy na pewno chcesz usunąć zadanie?
          </Dialog>
          <Divider />
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <FlatButton
            label="Dodaj danie"
            fullWidth={true}
            onClick={this.addRecipe}
          />
          <FlatButton
            label="Usuń danie"
            fullWidth={true}
            onClick={this.removeRecipe}
          />
          <FlatButton
            label="Zapisz zmiany"
            fullWidth={true}
            onClick={() => {
              this.onSubmit()
            }}
          />
          <FlatButton
            label="Usuń zadanie"
            fullWidth={true}
            onClick={() => this.setState({ ...this.state, open: true })}
          />
        </Paper>
      </div>
    ) : (
      <div>Loading...{this.props.history.push('/zadania/')}</div>
    )
  }
}

function mapStateToProps(state) {
  const tmp = cloneDeep(state.tasks).map(task => {
    console.log('log', task.recipes, cloneDeep(state.recipes))
    return {
      ...task,
      recipes: parseRelations(task.recipes, cloneDeep(state.recipes))
    }
  })
  return {
    tasks: tmp,
    recipes: state.recipes,
    ingredients: state.ingredients
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editTask, deleteTask, addTask }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail)
