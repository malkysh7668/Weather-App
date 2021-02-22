import { createStore } from 'redux'
import { produce } from 'immer'
import { combineReducers } from 'redux';
import UserReducer from '../Store/User';



const reducer = combineReducers({

    UserReducer
});



const store = createStore(reducer)
window.store = store;
export default store;