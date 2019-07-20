import React from "react"
import {XYPlot, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, BarSeries, XAxis, YAxis} from 'react-vis'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {getCategory} from '../Helpes/helper'

export default class TableList extends React.Component{
    constructor(props){
        super(props);

        this.options = {
            // defaultSortName: 'name',  // default sort column name
            // defaultSortOrder: 'desc'  // default sort order
          };
    }

    render(){
        let trans = this.props.trans;
        let label = this.props.label;

        let rows = [];
        trans.forEach(function(element){

            let cat = getCategory(element.Description);
            if(cat == null){
                return;
            }

            cat = cat.category;

            if(cat == label || label == ""){
                rows.push(
                    {
                        key: rows.length,
                        Description: element.Description,
                        Price: element.Price,
                        Date: element.TransDate
                    });
            }
        });

        return <div>
            <BootstrapTable data={rows} striped hover options={this.options}>
                <TableHeaderColumn isKey dataSort={true} width="300" dataField="Description">Description</TableHeaderColumn>
                <TableHeaderColumn dataField="Price" width="100" dataSort={true}>Price</TableHeaderColumn>
                <TableHeaderColumn dataField="Date" width="200" dataSort={true}>Date</TableHeaderColumn>
            </BootstrapTable>
        </div>
    }
}