import React from "react"
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {XYPlot, XAxis, YAxis, Hint, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis'
import {partitionByRange} from '../Helpers/helper'
import * as Constants from '../Helpers/Constants'

export default class TimeRangeSpendingComponent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            transactions : [],
            dateGroupingChoice: Constants.Date_Grouping_Choice,
            hoverPoint: null
          };

        this.formatData = this.formatData.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps != this.props)
        {
            if(this.props.transactions){
                this.setState({transactions: this.props.transactions, dateGroupingChoice : this.props.dateGroupingChoice});
            }
        }
    }

    /*
    *@groupedTransactions: [[transactions]]
    *return: [] of json object for render purposes. ex, [{ "y": 100, "x": "Jan" },{ "y": 112, "x": "Feb" }]
    */
    formatData(groupedTransactions){
        let data = [];
        if(groupedTransactions != undefined && groupedTransactions.length > 0)
        {
            groupedTransactions.forEach(function(element, index){
                let number = element.values.reduce((a,b) => a + b.Price, 0)
                data.push({"x": index, "y": Math.round(number), "date": element.date});
            });
        }

        return data;
    }

    render(){
        let data = this.formatData(partitionByRange(this.state.transactions, this.state.dateGroupingChoice));
        let mx = data.reduce((a,b)=> Math.max(a, b["y"]), 0)

        const state = this.state;

        return (
        <XYPlot dontCheckIfEmpty={true} xType="ordinal" width={Math.max(Math.min(data.length*30, 400), 400)}  height={200}
             yDomain={[0, Math.max(mx, 100)]}
              xDomain={[...Array(Math.max(data.length,1)).keys()]}>
            <XAxis />
            <YAxis/>
            <HorizontalGridLines/>
            <VerticalGridLines/>
            <LineSeries data={(data.length == 0) ? null : data} onNearestXY={(p, info) => this.setState({hoverPoint:p})}  getNull={(d) => d.y !== null}/>
            {this.state.hoverPoint !== null &&
                 <Hint value={state} format={function(state){return [{"title": `${state.dateGroupingChoice} ${state.hoverPoint.date}`, "value": state.hoverPoint.y}]}} />}
        </XYPlot>)
    }
}