import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'
import {RadialChart, Hint, LabelSeries, makeVisFlexible} from 'react-vis';
import TableList from './TableList'
import TimeRangeSpendingComponent from './TimeRangeSpendingComponent'
import {groupDataByCategory, ListedCategories} from '../Helpers/helper'
import ToggleSwitchDate from './ToggleSwitchDate';
import * as Constants from '../Helpers/Constants'

const FlexRadialChart=makeVisFlexible(RadialChart)

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
        let [expensesByCat, itemsByCat] = groupDataByCategory(transactions, ListedCategories);
        var finalResult = [];

        for (var item in expensesByCat)
        {
            finalResult.push({theta: expensesByCat[item], label: item});
            totalExpenses += expensesByCat[item];
        }

        this.setState({dataToShow:finalResult, groupedData:expensesByCat, totalExpenses:totalExpenses, transactions:transactions, itemsByCat: itemsByCat});
    }

    render(){
        //console.log(this.state.dataToShow)
        return (
                <div className="container">
                     <div className="row align-items-start">
                        <div className="col-4">
                        </div>
                        <div className="col-4" >
                            <FlexRadialChart
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
                            </FlexRadialChart>
                        </div>
                        <div className="col-4">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <TableList trans={this.state.transactions} label={this.state.currentLabel}></TableList>
                        </div>
                    </div>
                </div>
                )
    }
}
