import { createStore } from 'redux'
import {setTransactions} from './reducers/test_reducer'

export const store = createStore(setTransactions)
