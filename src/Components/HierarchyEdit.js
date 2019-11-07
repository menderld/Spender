import React from "react";
import {ListedCategories} from '../Helpers/helper'

import AceEditor from "react-ace";

var ace = require('ace-builds')

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";


export default class HierachyEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             text :this.prettyJson(ListedCategories)
        }

        this.prettyJson = this.prettyJson.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(newValue) {
        this.setState({text:this.prettyJson(newValue)});
    }

    prettyJson(text){
        return JSON.stringify(text,function(k,v){
            if(v instanceof Array)
               return JSON.stringify(v);
            return v;
         },2)
    }

    render(){
        return (
            <AceEditor
            mode="json"
            theme="github"
            onChange={this.onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            value={this.state.text}
            width="100%"
            />
      );
    }

}
