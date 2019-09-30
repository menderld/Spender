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
    this.setState({trans: transactions})
  }

  render() {
    return (
      <div>
        <FileUpload onDataCompleted={this.onDataCompleted}/>
        <SpendingPieChart transactions={this.state.trans} />
      </div>
    );
  }
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
