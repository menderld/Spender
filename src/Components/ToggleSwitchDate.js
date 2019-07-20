import 'bootstrap/dist/css/bootstrap.css';
import 'css-toggle-switch/dist/toggle-switch.css'
import React from "react"

export default class ToggleSwitchDate extends React.Component{
    constructor(props){
        super(props);
        this.state = {checked :{'day':false, 'week':false, 'month':true, 'year': false}};
        this.inputOnChange = this.inputOnChange.bind(this);
    }

    inputOnChange(e, option){
        let checked = this.state.checked;
        for(var key in checked){
            checked[key] = false
        }

        checked[option] = true

        this.setState({checked: checked});
        this.props.onDateOptionChange(option);
    }

    render(){
        return (
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className={"btn btn-secondary " + (this.state.checked["day"] ? "active" : "")}>
                    <input id="day" name="options" type="radio"  onChange={(e)=> this.inputOnChange(e, "day")}/>
                    Day
                </label>
                <label className={"btn btn-secondary " + (this.state.checked["week"] ? "active" : "" )}>
                    <input id="week" name="options" type="radio" checked={this.state.checked["week"]} onChange={(e)=> this.inputOnChange(e, "week")}/>
                    Week
                </label>
                <label className={"btn btn-secondary " + (this.state.checked["month"] ? "active" : "" )}>
                    <input id="month" name="options" type="radio" checked={this.state.checked["month"]} onChange={(e)=> this.inputOnChange(e, "month")}/>
                    Month
                </label>
                <label className={"btn btn-secondary " + (this.state.checked["year"] ? "active" : "" )}>
                    <input id="year" name="options" type="radio" checked={this.state.checked["year"]} onChange={(e)=> this.inputOnChange(e, "year")}/>
                    Year
                </label>
            </div>
        );
    }
}