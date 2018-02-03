import { EDIT_TASK, ADD_TASK, DELETE_TASK } from '../actions';
var ret;
if (window.localStorage.getItem('tasksList')) {
  ret = JSON.parse(window.localStorage.getItem('tasksList'));
} else {
  ret = [
    {
      name: 'katering jakistam',
      date: new Date(),
      recipes: [{ id: '1517626410068', amount: 20 }]
    }
  ];
}

export default function(state = ret, action) {
  switch (action.type) {
    case EDIT_TASK:
      console.log('editing tasks');
      window.localStorage.setItem('tasksList', JSON.stringify(state));
      return state;
    case ADD_TASK:
      console.log('adding task');
      state.push(action.payload);
      window.localStorage.setItem('tasksList', JSON.stringify(state));
      return state;
    case DELETE_TASK:
      console.log('deleted task');
      const newState = state.filter((v, i) => i != action.payload);
      window.localStorage.setItem('tasksList', JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
}
