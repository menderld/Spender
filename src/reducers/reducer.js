import MappingFactory from '../Models/MappingFactory'

const initialState = {
  trans: [],
  configHistory: [],
  transHistory: [],
  factory: new MappingFactory(undefined)
}

export function setTransactions(state=initialState, action) {
  if(action.type == "CLEAN_STORE"){
    return initialState
  }

  if(action.type == "CREATE_MAPPING_CONFIG"){
    let factory = new MappingFactory(action.mappingConfig)
    return {...initialState, factory: factory, configHistory: ["root"]}
  }

  if(action.type == "SET_TRANSACTIONS"){
    return {...state, trans:action.trans, transHistory: state.transHistory.concat([action.trans])}
  }

  if(action.type == "REPLACE_CONFIG"){
    let newKey = action.key
    let factory = state.factory;
    factory.setMapping(newKey, action.priceConfig)
    return {...state}
  }

  if(action.type == "ADD_CONFIG"){
    let newKey = action.key;
    let factory = state.factory;

    if(factory.getMapping(newKey) != undefined){
      throw {"error": `key ${newKey} already exists`}
    }

    factory.setMapping(newKey, action.priceConfig)
    return {...state, configHistory: state.configHistory.concat([newKey])}
  }

  if(action.type == "ADD_TO_HISTORY"){
    let lastElement = state.configHistory[state.configHistory.length - 1]
    let newConfigHistory = state.configHistory;
    let newTransHistory = state.transHistory;

    if(lastElement != action.key){
      newConfigHistory.push(action.key);
      newTransHistory.push(action.transactions)
    }

    return {...state, configHistory: newConfigHistory, transHistory: newTransHistory}
  }

  if(action.type == "POP_HISTORY"){
    if(state.configHistory.length <= 1){
      return {...state}
    }
    let newConfigHistory = state.configHistory;
    newConfigHistory.pop()

    let newTransHistory = state.transHistory;
    newTransHistory.pop()

    return {...state, configHistory:newConfigHistory, transHistory: newTransHistory}
  }

  return {...state}
}