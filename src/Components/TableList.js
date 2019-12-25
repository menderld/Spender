import React from "react"
import {XYPlot, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, BarSeries, XAxis, YAxis} from 'react-vis'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {getCategoryHierarchy} from '../Helpers/helper'
import * as Constants from '../Helpers/Constants'

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
        let rows = [];
        let i = 0;
        trans.forEach(function(element){
            rows.push(
                {
                    key: i,
                    Description: element.Description,
                    Price: element.Price,
                    Date: element.TransDate
                });
                i += 1
        });

        return <div>
            <BootstrapTable data={rows} striped hover options={this.options} keyField='key'>
                <TableHeaderColumn dataSort={true} width="300" dataField="Description">Description</TableHeaderColumn>
                <TableHeaderColumn dataField="Price" width="100" dataSort={true}>Price</TableHeaderColumn>
                <TableHeaderColumn dataField="Date" width="200" dataSort={true}>Date</TableHeaderColumn>
            </BootstrapTable>
        </div>
    }
}