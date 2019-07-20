import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'
import {RadialChart, Hint, LabelSeries} from 'react-vis';
import TableList from './TableList'
import TimeRangeSpendingComponent from './TimeRangeSpendingComponent'
//import DatePicker from 'react-datepicker';
import {groupDataByCategory} from '../Helpes/helper'
import { SSL_OP_NO_QUERY_MTU } from 'constants';
import ToggleSwitchDate from './ToggleSwitchDate';
import * as Constants from '../Helpes/Constants'

export default class SpendingPieChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: false,
            groupedData : [{theta:1, label:"empty"}],
            dataToShow : [{theta:1, label:"empty"}],
            currentLabel : "",
            transactions : [],
            totalExpenses: 0,
            dateGroupingChoice: Constants.Date_Grouping_Choice,
          };

        this.groupData = this.groupData.bind(this);
        this.onPieHover = this.onPieHover.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps != this.props)
        {
            this.groupData();
        }
    }

    onPieHover(v){
        this.setState({value: v});
    }

    onClick(v){
        let label = v.label;
        let res = this.state.groupedData;

        const data = this.state.itemsByCat;
        for(var item in data)
        {
            if(item == label)
            {
                res = data[item];
                break;
            }
        }

        this.setState({transactions:res, currentLabel:label});
    }

    groupData(){
        const {transactions} = this.props;
        var totalExpenses = 0.0;
        let [expensesByCat, itemsByCat] = groupDataByCategory(transactions);
        var finalResult = [];

        for (var item in expensesByCat)
        {
            finalResult.push({theta: expensesByCat[item], label: item});
            totalExpenses += expensesByCat[item];
        }

        this.setState({dataToShow:finalResult, groupedData:expensesByCat, totalExpenses:totalExpenses, transactions:transactions, itemsByCat: itemsByCat});
    }

    render(){
        return (
                <div className="container">

                     <div className="row">
                        <div className="col">
                            <RadialChart
                                className={'SpendingPieChar'}
                                innerRadius={100}
                                radius={140}
                                getAngle={d => d.theta}
                                data={this.state.dataToShow}
                                onValueMouseOver={v => this.onPieHover(v)}
                                onSeriesMouseOut={v => this.setState({value: false})}
                                onValueClick={v=> this.onClick(v)}
                                width={300}
                                height={300}
                                padAngle={0.04}
                                >
                                {this.state.value != false &&
                                <Hint value={this.state.value} format={function(point){return [{value:point.theta.toFixed(2), title:point.label}]}} />}
                                <LabelSeries data={[{x:0,y:0, label:this.state.totalExpenses.toFixed(2)}]}/>
                            </RadialChart>
                        </div>
                        <div className="col">
                            <ToggleSwitchDate onDateOptionChange={(option)=> this.setState({dateGroupingChoice:option})}/>
                            <TimeRangeSpendingComponent transactions={this.state.transactions} dateGroupingChoice={this.state.dateGroupingChoice}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <TableList trans={this.state.transactions} label={this.state.currentLabel}></TableList>
                        </div>
                    </div>
                </div>
                )
    }
}
