import { createStore } from "redux";

const initialState = {
    tickets: null,
    currentPage :5,
    findChekbox: '',
    check:''
}

function reducer(state = initialState , action){
switch(action.type){
    case 'searchTickets':{
        return{...state, tickets: action.payload}
    }
    case 'SetCurrentPage':{
        return{...state, currentPage : action.payload}
    }
    case 'findTicket':{
        return{...state , findChekbox: action.payload}
    }
    case 'check':{
        return{...state , check:action.payload}
    }
    default: {
        return state
    }
}
}


const store = createStore(reducer);
export default store;