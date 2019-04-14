import React from "react"

export default class TableList extends React.Component{
    constructor(props){
        super(props);

        this.state= {transactions:[]}

        this.setValues = this.setState.bind(this);
    }

    setValues(transactions){
        this.setState({transaction:transactions});
    }

    render(){
        const trans = this.state.transactions;
        return <div>
            <table className=".table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                {
                    trans.forEach(function(element){
                        <tr>
                            <td>element.Description</td>
                            <td>element.Price</td>
                            <td>element.TransDate</td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    }
}