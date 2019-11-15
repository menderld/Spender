import React from "react";
import PriceConfigEdit from './PriceConfigEdit'
import SpendingPieChart from './SpendingPieChart'
import FileUpload from './FileUpload'
import { connect } from 'react-redux';
import {setTrans} from '../actions/actions'

const mapStateToProps = function(state){
      return {
         trans: state.trans,
    }
}

const mapDispatchToProps = dispatch => ({
    ...setTrans,
    dispatch                // ← Add this
 })

// const mapDispatchToProps = dispatch => ({
//     setTransactions: (trans) => { dispatch({type:'SET_TRANSACTIONS', trans}); },
//   });


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            trans : []
        }
        this.onDataCompleted = this.onDataCompleted.bind(this);
    }

    componentDidMount() {
    }

    onDataCompleted(transactions){
        this.props.dispatch(setTrans(transactions));
        this.setState({trans: transactions});
    }

    render(){
        return (
            <div>
                <div style={{"float": "left", "marginLeft": "13%", "marginTop": "2%"}}>
                    <FileUpload onDataCompleted={this.onDataCompleted} />
                </div>
                <div>
                    <SpendingPieChart style={{zIndex:20}} transactions={this.props.trans} priceConfig={this.props.priceConfig}/>
                </div>
                <div style={{right:"0px", marginTop:"30px", float:"left", position: "fixed", zIndex: 999, height:"20%", "backgroundColor": "#cfc", color:"blue"}}>
                    <PriceConfigEdit priceConfig={this.props.priceConfig} updatePriceConfig={this.props.updatePriceConfig}/>
                </div>
            </div>
            );
    }

}

//export default connect(mapStateToProps, mapDispatchToProps)(Home)
export default connect(mapStateToProps, mapDispatchToProps)(Home)
