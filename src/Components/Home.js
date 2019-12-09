import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import SpendingPieChart from './SpendingPieChart'
import * as comandante from '../config'

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this._isMounted= true
        this.state = {
            trans : comandante.getTransactions(),
            on : false,
            isOpen: false,
            priceConfig: comandante.getCurrentConfig().getMapping()
        }

        comandante.store.subscribe(()=> {
            if(this._isMounted && (this.state.trans != comandante.getTransactions()
                                  || this.state.priceConfig != comandante.getCurrentConfig().getMapping())){
                console.log(comandante.store.getState())
                this.setState({trans:comandante.getTransactions(), priceConfig:comandante.getCurrentConfig().getMapping()})
            }
        })
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({trans: comandante.getTransactions(), priceConfig:comandante.getCurrentConfig().getMapping()})
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


