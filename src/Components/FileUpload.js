import React from 'react'
import ReactDOM from 'react-dom'
import Transaction from '../Models/Transaction'
var xlsx = require('xlsx');

export default class FileUpload extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            imageURL: '',
          };

      this.handleFile = this.handleFile.bind(this);
    }

    handleFile(file)
    {
        let props = this.props;
        let reader = new FileReader();
        reader.onloadend = function(e){
            let text = this.result;

            let trans = [];
            let index = 0;

            text.split("\n").forEach(line => {
                if(index != 0)
                {
                    let values = line.split(",");
                    let type = values[4];
                    let transDate = values[0];
                    let postDate = values[1];
                    let description = values[2];
                    let category = values[3];
                    let price = values[5];

                    trans.push(new Transaction(type, category, description, price, transDate, postDate));
                }

                index += 1;
        });
            props.onDataCompleted(trans);
        };

        reader.readAsText(file);
    }

    render() {
        return (
            <input type="file"
            id="file"
            className="input-file"
            accept=".csv"
            onChange={e => this.handleFile(e.target.files[0])}/>
        );
    }
}
