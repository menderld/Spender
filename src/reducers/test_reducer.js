export function getSomething() {
  return {
      type: 'GET_SOMETHING',
      payload: {
          something: 'Here is some data',
          trans : []
      },
  }
}

const initialState = {
  filter: "filterito",
  trans: []
}

export function setTransactions(state=initialState, action) {
  if(action.type == "SET_TRANSACTIONS"){
    return {...state, trans:action.trans}
  }
  return {...state}
}