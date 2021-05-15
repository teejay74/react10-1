import {CHANGE_SERVICE_FIELD, CLEAR_SERVICE, EDIT_SERVICE} from '../actions/actionTypes'

const initialState = {
  name: '',
  price: '',
};

export default function serviceAddReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SERVICE_FIELD:
      const {name, value} = action.payload;
      return {...state, [name]: value};
    case EDIT_SERVICE:
      const {n, price} = action.payload;
      return {name: n, price: price};
    case CLEAR_SERVICE:
      return {name: '', price: ''};
    default:
      return state;
  }
}