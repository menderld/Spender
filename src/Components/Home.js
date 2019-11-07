import React from "react";
import SpendingPieChart from './SpendingPieChart'
import FileUpload from './FileUpload'
// import { browserHistory } from 'react-router';


export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            trans : []
        }

        this.onDataCompleted = this.onDataCompleted.bind(this);
    }

    onDataCompleted(transactions){
        this.setState({trans: transactions});
    }

    // componentDidMount() {
    //     browserHistory.push('/');
    //   }

    render(){
        return (
            <div>
                <div style={{"float": "left", "marginLeft": "13%", "marginTop": "2%"}}>
                <FileUpload onDataCompleted={this.onDataCompleted} />
                </div>
                <div>
                <SpendingPieChart transactions={this.state.trans} />
                </div>
            </div>
            );
    }

}
