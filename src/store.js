import { createStore } from "redux";

const initialState = {
    tickets: [],
    searchId : ''
}

function reducer(state = initialState , action){
switch(action.type){
    case 'searchTickets':{
        return{...state, tickets: action.payload}
    }
    case 'searchId':{
        return{...state , searchId: action.payload}
    }
    default: {
        return state
    }
}
}


const store = createStore(reducer);
export default store;