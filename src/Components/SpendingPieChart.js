import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'
import {RadialChart, Hint, LabelSeries, makeVisFlexible} from 'react-vis';
import TableList from './TableList'
import {groupDataByCategory} from '../Helpers/helper'
import {replaceConfig, addToHistory, setTrans, popHistory} from '../actions/actions'
import * as Constants from '../Helpers/Constants'
import * as comandante from '../config';
import {Button} from 'react-bootstrap';



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
        this.goBack = this.goBack.bind(this);
        this._selectElementFromLabel = this._selectElementFromLabel.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps != this.props)
        {
            this.groupData();
        }
    }
    componentDidMount() {
        this.groupData();
    }

    onPieHover(v){
        this.setState({value: v});
        this._selectElementFromLabel(v.label)
    }

    _selectElementFromLabel(label){
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

    onClick(v){
        let newKey = comandante.getCurrentConfig().getKey() + "|" + v.label;
        let factory = comandante.getFactory();
        let mapping = factory.getOrCreateMapping(newKey);

        //update config and transactions
        comandante.store.dispatch(replaceConfig(newKey, mapping));
        comandante.store.dispatch(addToHistory(newKey, this.state.itemsByCat[v.label]));
    }

    groupData(){
        const {transactions, priceConfig} = this.props;

        if(transactions === undefined || transactions.length == 0){
            return
        }
        var totalExpenses = 0.0;
        let [expensesByCat, itemsByCat] = groupDataByCategory(transactions, priceConfig);
        var finalResult = [];

        for (var item in expensesByCat)
        {
            finalResult.push({theta: expensesByCat[item], label: item});
            totalExpenses += expensesByCat[item];
        }

        this.setState({dataToShow:finalResult, groupedData:expensesByCat, totalExpenses:totalExpenses, transactions:transactions, itemsByCat: itemsByCat});
    }

    goBack(){
        comandante.store.dispatch(popHistory())
    }

    render(){
        return (
                <div>
                     <div className="row align-items-start">
                        <div className="col-4">
                            <Button variant="secondary" onClick={()=>this.goBack()}>
                                Go Back
                            </Button>
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
                                onClick={()=>console.log(123)}
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
