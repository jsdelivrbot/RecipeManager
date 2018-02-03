import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Redux, { bindActionCreators } from 'redux'
import { pullAllBy } from 'lodash'

import MenuBar from './menu_bar'
import { IngredientsListRaw } from '../containers/ingredients_list'

import { editRecipe, deleteRecipe } from '../actions'
import { units } from '../constants'

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

class RecipeDetail extends Component {
  constructor(props) {
    super(props)
    this.id = props.match.params.id
    this.state = {
      open: false,
      id: this.id,
      newRecipe: this.props.recipes[this.id],
      value: null,
      selectedIngredient: null
    }
  }

  componentWillMount() {
    // this.props.recipes[this.id].procedures.forEach(item => {
    //   this.state.proceduresLeft.splice(item, 1)
    // })
  }

  handleChange(event, index, value) {
    this.setState({ ...this.state, value: value })
  }

  onSubmit = () => {
    const f1 = () => {
      this.props.editRecipe(this.id, this.state.newRecipe, () => {
        console.log('saved')
      })
    }
    const f2 = () => {
      alert('proszę wypełnić wszystie pola i podać poprawne daty')
    }
    this.state.newRecipe.name == '' ||
    this.state.newRecipe.location == '' ||
    this.state.newRecipe.date_start > this.state.newRecipe.date_end
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
    this.props.deleteRecipe(this.id, () => {
      this.props.history.push('/')
    })
  }
  addIngredient = () => {
    const tmp = pullAllBy(
      [...this.props.ingredients],
      [...this.state.newRecipe.ingredients],
      'name'
    )
    if (tmp.length > 0) {
      this.state.newRecipe.ingredients.push(tmp[0])
      this.setState(this.state)
    }
  }
  removeIngredient = () => {
    this.state.newRecipe.ingredients = this.state.newRecipe.ingredients.filter(
      (v, i) => {
        return i != this.state.selectedIngredient
      }
    )
    this.setState(this.state)
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

    return (
      <div>
        <MenuBar title="Edytuj przepis" />
        <Paper zDepth={2} style={{ padding: 10 }}>
          <TextField
            hintText="Przepis"
            underlineShow={false}
            onChange={e => {
              this.state.newRecipe.name = e.target.value
            }}
            defaultValue={this.state.newRecipe.name}
          />
          <Divider />
          <TextField
            hintText="ilość"
            underlineShow={false}
            onChange={e => {
              this.state.newRecipe.amount = e.target.value
            }}
            defaultValue={this.state.newRecipe.amount}
          />
          <Divider />
          <SelectField
            floatingLabelText="Jednostka"
            value={this.state.newRecipe.unit}
            onChange={(e, i, v) => {
              this.setState({
                ...this.state,
                newRecipe: {
                  ...this.state.newRecipe,
                  unit: v
                }
              })
            }}
            autoWidth={true}
          >
            {units.map(unit => (
              <MenuItem value={unit} primaryText={unit} key={unit} />
            ))}
          </SelectField>
          <Divider style={{ marginTop: 20 }} />
          <Table onCellClick={x => (this.state.selectedIngredient = x)}>
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
                  tooltip="Lista Składników"
                  style={{
                    textAlign: 'center',
                    fontSize: '20px'
                  }}
                >
                  Lista składniókw
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
              {this.state.newRecipe.ingredients.map((row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>
                    <SelectField
                      floatingLabelText="Składnik"
                      value={this.state.newRecipe.ingredients[index].name}
                      defaultValue={
                        this.state.newRecipe.ingredients[index].name
                      }
                      onChange={(e, i, v) => {
                        this.state.newRecipe.ingredients[index].name = v
                        this.state.newRecipe.ingredients[
                          index
                        ].unit = this.props.ingredients[i].unit

                        this.setState(this.state)
                      }}
                      autoWidth={true}
                    >
                      {this.props.ingredients.map(ing => (
                        <MenuItem
                          value={ing.name}
                          primaryText={ing.name}
                          key={ing.id}
                          onChange={() => console.log('1')}
                        />
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
                      }}
                      defaultValue={row.amount}
                    />
                  </TableRowColumn>
                  <TableRowColumn>{row.unit}</TableRowColumn>
                </TableRow>
              ))}
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
            Czy na pewno chcesz usunąć przepis?
          </Dialog>
          <Divider />
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <FlatButton
            label="Dodaj składnik"
            fullWidth={true}
            onClick={this.addIngredient}
          />
          <FlatButton
            label="Usuń składnik"
            fullWidth={true}
            onClick={this.removeIngredient}
          />
          <FlatButton
            label="Zapisz zmiany"
            fullWidth={true}
            onClick={() => {
              this.onSubmit()
            }}
          />
          <FlatButton
            label="Usuń przepis"
            fullWidth={true}
            onClick={() => this.setState({ ...this.state, open: true })}
          />
        </Paper>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
    ingredients: state.ingredients
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editRecipe, deleteRecipe }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail)
