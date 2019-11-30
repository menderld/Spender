import React from "react";
import AceEditor from "react-ace";
import {Collapse} from 'react-collapse';
import {setConfig} from '../actions/actions'
import {store} from '../config'
import SaveFileModalComponent from './SaveFileModalComponent'

var ace = require('ace-builds')
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import CatMapping from "../Models/CatMapping";


export default class PriceConfigEdit extends React.Component {
    constructor(props){
        super(props);

        this.prettyJson = this.prettyJson.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.saveConfig = this.saveConfig.bind(this);
        this.onModalHide = this.onModalHide.bind(this);

        this.state = {
            currentKey: "",
            currentConfig: this.prettyJson(store.getState().priceConfig.getMapping()),
            showModal: false
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
      }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
      }

    handleKeyPress(e) {
        this.setState({currentKey: e.keyCode});
        if((e.ctrlKey || e.metaKey) && e.keyCode === 83){
            e.preventDefault()
            if(this.saveConfig(this.state.currentConfig)){
                this.setState({showModal:true, message:"Config saved", success: true})
            }
            else{
                this.setState({showModal:true, message:"Failed to saved config", success: false})
            }
        }
      }

    saveConfig(config){
        try{
            store.dispatch(setConfig(new CatMapping(store.getState().priceConfig.id, JSON.parse(config))));
            return true
        }
        catch(error){
            console.log("cannot save json")
            return false
        }
    }

    onChange(newValue) {
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

    onModalHide(){
        this.setState({showModal:false})
    }

    render(){
        return (
            <div>
                {this.state.showModal && <SaveFileModalComponent onHide={this.onModalHide} message={this.state.message} success={this.state.success}/> }
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
            </div>
      );
    }
}
