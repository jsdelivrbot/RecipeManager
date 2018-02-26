import { EDIT_TASK, ADD_TASK, DELETE_TASK,FETCH_TASKS } from '../actions';
import { cloneDeep } from 'lodash';

export default function(state = [], action) {
  switch (action.type) {
    case EDIT_TASK:
      console.log('editing tasks');
      let dupa = cloneDeep(state);
      state[action.payload.id] = action.payload.task;
      // window.localStorage.setItem('tasksList', JSON.stringify(state));
      return state;
    case ADD_TASK:
      console.log('adding task');
      // state.push(action.payload);
      // window.localStorage.setItem('tasksList', JSON.stringify(state));
      return action.payload;
    case DELETE_TASK:
      console.log('deleted task',state,action.payload);
      // window.localStorage.setItem('tasksList', JSON.stringify(newState));
      return state;
    case FETCH_TASKS:
      console.log('fetching tasks');
      // window.localStorage.setItem('tasksList', JSON.stringify(action.payload.data));
      return action.payload.data || [];
    default:
      return state;
  }
}
