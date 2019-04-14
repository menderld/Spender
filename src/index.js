// import '../../bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react'
import ReactDOM from 'react-dom'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, RadialChart, Hint, LabelSeries} from 'react-vis';
import FileUpload from './Components/FileUpload';
import TableList from './Components/TableList';

const category =
{
    "gas": ["shell oil", "costco gas", "arco"],
    "food": ["costco", "qfc", "safeway", "cafe", "bai tong", "mod pizza",  "gelato", "taco bell", "pho hoa", "senor taco", "torero", "burguer king",
            "einstein bro bagels", "homegrown", "gyro to go", "chick-fil", "bistro", "starbucks", "jak's grill", "tanoor lebanese", "coffee", "garlic crush",
            "cheesecake", "el toreador", "matador redmond", "tavern hall", "tipsy cow burger", "lola restaurant", "panera bread", "outback", "wholefds",
            "le panier", "oto sushi", "7-eleven", "katsu burger", "malt &amp; vine", "ristorante italian", "dough zone", "boba t", "pinkberry",
            "lincoln south food", "tutta bella", "chipotle", "coquette bake shop", "tat's delicatessen"],
    "clothes": [],

    "amazon": ["amazon"],
    "rebtel": ["rebtel"],
    "house": ["wave", "puget sound energy"],
    "riding": ["uber", "lyft"],
    "travel": ["american air", "aa inflight visa face", "652 flight terminal", "denver airport"],
    "montly premiums": ["youtube premiu", "youtubepremiu", "hulu", "netflix"],
    "stores": ["home depot", "wal-mart", "dollartree", "target"],
    "tmobile": ["tmobile"],
    "clothes": ["old navy", "ross", "aldo us", "macys", "dickssporting", "express#0153", "goodwill", "payless shoes", "forever 21",
                "dsw bear creek village"],
    "sports": ["24 hour fitness"],
    "ikea": ["ikea"],
    "taxes": ["intuit *turbotax", "mailbox shipping center"],
    "laura certifications": ["bellevue college cont ed", "911 drivng sch. lake wash", "wa dol lic &amp; reg 56215"],
    "fun": ["space needle", "d2 at benaroya", "regal cinemas bella boteg", "wsferries-colman dock", "groupon", "seattle great wheel"],
    "parking": ["u-park system 041"],
    "medical":["living well health cent", "bartell drug "]
}

function getCategory(item)
{
    item = item.toLowerCase();
    if(item.includes("payment thank you"))
    {
        return null;
    }

    for(var key in category)
    {
        for(var index in category[key])
        {
            let values = category[key][index];
            if(item.includes(values))
            {
                return {"category": key, "subCategory": values};
            }
        }
    }
    console.log(item);
    return {"category": "other", "subCategory": ""};
}

class SpendingPieChar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: false,
            data : [{theta:1, label:"empty"}],
            totalExpenses: 0
          };

        this.groupData = this.groupData.bind(this);
    }

    groupData(transactions){
        let expenses = {};
        let totalExpenses = 0.0;

        transactions.forEach (function(value){
            if(!value.Name)
            {
                return;
            }

            let res = getCategory(value.Name);
            if(!res)
            {
                return;
            }

            if(res.category in expenses == false)
            {
                expenses[res.category] = 0;
            }
            expenses[res.category] += -1*Number(value.Price);
        });


        let finalResult = [];
        for (var item in expenses)
        {
            expenses[item] = expenses[item];
            finalResult.push({theta: expenses[item], label: item});
            totalExpenses += expenses[item];
        }

        this.setState({data:finalResult, totalExpenses:totalExpenses});
    }

    render(){
        const {value} = this.state;
        return (
                <div>
                    <RadialChart
                        className={'SpendingPieChar'}
                        innerRadius={100}
                        radius={140}
                        getAngle={d => d.theta}
                        data={this.state.data}
                        onValueMouseOver={v => this.setState({value: v})}
                        onSeriesMouseOut={v => this.setState({value: false})}
                        width={300}
                        height={300}
                        padAngle={0.04}
                        >
                        {this.state.value != false &&
                        <Hint value={this.state.value} format={function(point){return [{value:point.theta.toFixed(2), title:point.label}]}} >
                        </Hint>}
                        <LabelSeries data={[{x:0,y:0, label:this.state.totalExpenses.toFixed(2)}]}/>
                    </RadialChart>
                <FileUpload onDataCompleted={this.groupData}/>
                <TableList setValues={value.transactions}></TableList>
                </div>

        )
    }
}

ReactDOM.render(<SpendingPieChar/>, document.getElementById("example"));