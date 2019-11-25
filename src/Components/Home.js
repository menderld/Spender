import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import SpendingPieChart from './SpendingPieChart'
import {store} from '../config'

export default class Home extends React.Component {
    constructor(props){
        super(props);

        this._isMounted= true
        this.state = {
            trans : store.getState().trans,
            on : false,
            isOpen: false,
            priceConfig: store.getState().priceConfig
        }

        store.subscribe(()=> {
            if(this._isMounted && (this.state.trans != store.getState().trans || this.state.priceConfig != store.getState().priceConfig)){
                this.setState({trans: store.getState().trans, priceConfig:store.getState().priceConfig})
            }
        })
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({trans: store.getState().trans, priceConfig:store.getState().priceConfig})
    }

    componentWillUnmount(){
        this._isMounted= false
      }

    render(){
        return (
                <SpendingPieChart transactions={this.state.trans} priceConfig={this.state.priceConfig}/>
            );
    }
}


