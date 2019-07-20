import React from "react";
import ReactDOM from "react-dom";
import SpendingPieChart from './Components/SpendingPieChart'
import FileUpload from './Components/FileUpload'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      trans : []
    }

    this.onDataCompleted = this.onDataCompleted.bind(this);
  }

  onDataCompleted(transactions){
    console.log(transactions);
    this.setState({trans: transactions})
  }

  render() {
    return (
      <div>
        <SpendingPieChart transactions={this.state.trans} />
        <FileUpload onDataCompleted={this.onDataCompleted}/>
      </div>
    );
  }
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
