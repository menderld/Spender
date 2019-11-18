import React from "react";
import AceEditor from "react-ace";
import {Collapse} from 'react-collapse';

var ace = require('ace-builds')
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";


export default class PriceConfigEdit extends React.Component {
    constructor(props){
        super(props);

        this.prettyJson = this.prettyJson.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.saveConfig = this.saveConfig.bind(this);

        this.state = {
            currentKey: "",
            currentConfig: this.prettyJson(this.props.priceConfig)
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
      }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
      }

    componentDidUpdate(prevProps){
        if(prevProps != this.props){
            this.setState({currentConfig: this.prettyJson(this.props.priceConfig)});
        }
    }

    handleKeyPress(e) {
        this.setState({currentKey: e.keyCode});
        if(e.keyCode === 27) {
          console.log('You just pressed Escape!');
        }
        if((e.ctrlKey || e.metaKey) && e.keyCode === 83){
            e.preventDefault()
            this.saveConfig(this.state.currentConfig);
            console.log("control + s key")
        }
      }

    saveConfig(config){
        try{
            JSON.parse(config)
            this.props.updatePriceConfig(config);
        }
        catch(error){
            console.log("cannot save json")
        }

    }

    onChange(newValue) {
        //this.setState({currentConfig: updatedConfig})
        //this.saveConfig(newValue)
        this.setState({currentConfig:newValue})


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
                <Collapse isOpened={this.props.on}>
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
                        value={this.state.currentConfig}
                        width="100%"
                        />
                </Collapse>
      );
    }
}
