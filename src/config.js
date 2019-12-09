import { createStore } from 'redux'
import {setTransactions} from './reducers/reducer'

export const store = createStore(setTransactions)

export const getCurrentConfig = function(){
    let state = store.getState();
    let factory = state.factory;
    let lastElement = state.configHistory[state.configHistory.length - 1];
    return factory.getMapping(lastElement);
}

export const getTransactions = function(){
    let state = store.getState()
    return state.transHistory[state.transHistory.length - 1]
}

export const getFactory = function(){
    return store.getState().factory;
}