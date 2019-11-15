import React from "react";
import AceEditor from "react-ace";
import {Collapse} from 'react-collapse';

var ace = require('ace-builds')
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";


export default class PriceConfigEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open : false
        }

        this.prettyJson = this.prettyJson.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(newValue) {
        try{
            JSON.parse(newValue)
            this.props.updatePriceConfig(newValue);
        }
        catch(error){
            //console.log("invalid json")
        }
    }

    prettyJson(text){
        if(typeof text === 'string'){
            text = JSON.parse(text)
        }
        return JSON.stringify(text,function(k,v){
            if(v instanceof Array){
               return v;
            }
            return v;
         },2)
    }

    render(){
        return (
            <div>
                <button onClick={()=> this.setState({open:!this.state.open})}>as</button>
                <Collapse isOpened={this.state.open} >
                        <AceEditor
                        mode="json"
                        theme="monokai"
                        onChange={this.onChange}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={this.prettyJson(this.props.priceConfig)}
                        width="100%"
                        />
                </Collapse>
            </div>
      );
    }

}
