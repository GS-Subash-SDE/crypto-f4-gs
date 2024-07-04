import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";


const coinsReducer = (state = { coins: [] }, action)=>{
  switch (action.type) {
    case 'fetch-data':
      {
console.log('payload: ',action.payload);
        return { ...state, coins: action.payload };
      }
      case 'sortPrice':
      return { ...state, coins: action.payload };
      
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  crypto: coinsReducer
});

const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;