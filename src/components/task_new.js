import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Redux, { bindActionCreators } from 'redux'

import MenuBar from './menu_bar'
import { addTask } from '../actions'
import { units } from '../constants'
import { generateID } from '../helpers'

import DatePicker from 'material-ui/DatePicker'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class TaskNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'nowe zadanie (task new)',
      amount: '100',
      unit: 'kg'
    }
  }

  onSubmit() {
    const f1 = () => {
      this.props.addTask(
        [{ ...this.state, id: generateID(), ingredients: [] }],
        () => {
          this.props.history.push('/przepisy')
        }
      )
    }
    const f2 = () => {
      alert('proszę wypełnić wszystie pola')
    }
    this.state.name == '' || this.state.price == '' ? f2() : f1()
  }

  render() {
    return (
      <div>
        <MenuBar title="Nowy przepis" />
        <Paper zDepth={2} style={{ padding: 10 }}>
          <TextField
            hintText="nazwa"
            underlineShow={false}
            onChange={e => {
              this.state.name = e.target.value
            }}
          />
          <Divider />
          <TextField
            hintText="ilość"
            underlineShow={false}
            onChange={e => {
              this.state.amount = e.target.value
            }}
          />
          <Divider />
          <SelectField
            floatingLabelText="Jednostka"
            value={this.state.unit}
            onChange={(e, i, v) => {
              this.setState({
                ...this.state,
                unit: v
              })
            }}
            autoWidth={true}
          >
            {units.map(unit => (
              <MenuItem value={unit} primaryText={unit} key={unit} />
            ))}
          </SelectField>
          <FlatButton
            label="Dodaj"
            fullWidth={true}
            onClick={() => {
              this.onSubmit()
            }}
          />
        </Paper>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    procedures: state.procedures
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTask: addTask }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskNew)
