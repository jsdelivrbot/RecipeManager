import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Redux, { bindActionCreators } from 'redux'

import MenuBar from './menu_bar'
import { editIngredient, deleteIngredient } from '../actions'
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

class IngredientDetail extends Component {
  id = this.props.match.params.id

  state = {
    open: false,
    // openProcedury: false,
    // openUsterki: false,
    id: this.id,
    newIngredient: this.props.ingredients[this.id],
    value: null
    // proceduresLeft: this.props.procedures,
    // nowausterka: { name: '', desc: '' }
  }

  componentWillMount() {
    // this.props.ingredients[this.id].procedures.forEach(item => {
    //   this.state.proceduresLeft.splice(item, 1)
    // })
  }

  handleChange = (event, index, value) =>
    this.setState({ ...this.state, value: value })

  onSubmit = () => {
    const f1 = () => {
      this.props.editIngredient(this.id, this.state.newIngredient, () => {
        console.log('saved')
      })
    }
    const f2 = () => {
      alert('proszę wypełnić wszystie pola i podać poprawne daty')
    }
    this.state.newIngredient.name == '' ||
    this.state.newIngredient.location == '' ||
    this.state.newIngredient.date_start > this.state.newIngredient.date_end
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
    this.props.deleteIngredient(this.id, () => {
      this.props.history.push('/')
    })
  }

  // onSubmit2 = () => {
  //   let val = this.state.value
  //   if (val !== null) {
  //     let newIngredient = this.state.newIngredient.procedures.push(
  //       this.state.proceduresLeft[val]
  //     )
  //     let index = this.state.proceduresLeft.indexOf(
  //       this.state.proceduresLeft[val]
  //     )
  //     let proceduresLeft = this.state.proceduresLeft.splice(index, 1)
  //     this.state.value = null
  //     this.setState(this.state)
  //     this.handleClose()
  //   }
  // }

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
        <MenuBar title="Edytuj składnik" />
        <Paper zDepth={2} style={{ padding: 10 }}>
          <TextField
            hintText="nazwa składnika"
            underlineShow={false}
            onChange={e => {
              this.state.newIngredient.name = e.target.value
            }}
            defaultValue={this.state.newIngredient.name}
          />
          <Divider />
          <TextField
            hintText="cena"
            underlineShow={false}
            onChange={e => {
              this.state.newIngredient.price = e.target.value
            }}
            defaultValue={this.state.newIngredient.price}
          />
          <Divider />
          <SelectField
            floatingLabelText="Jednostka"
            value={this.state.newIngredient.unit}
            onChange={(e, i, v) => {
              this.setState({
                ...this.state,
                newIngredient: {
                  ...this.state.newIngredient,
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
          {/* <List>
            <Subheader inset={true}>Procedury</Subheader>
            {this.renderProcedures()}
          </List> */}
          {/* <FlatButton
            label="Dodaj Procedurę"
            fullWidth={true}
            onClick={() =>
              this.setState({ ...this.state, openProcedury: true })
            }
          /> */}
          <Dialog
            title="Uwaga!!!"
            actions={actions(() => {
              this.handleClose2()
            })}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Czy na pewno chcesz usunąć składnik?
          </Dialog>
          <Divider />
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <FlatButton
            label="Zapisz zmiany"
            fullWidth={true}
            onClick={() => {
              this.onSubmit()
            }}
          />
          <FlatButton
            label="Usuń składnik"
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
    ingredients: state.ingredients,
    procedures: state.procedures
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { editIngredient: editIngredient, deleteIngredient: deleteIngredient },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientDetail)
