import React from 'react';

 export class TodoCreater extends React.Component {

    constructor(props){
        super(props);
        this.state={
            val:'',
            errMsg:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    handleChange(e){
        this.setState({
            val:e.target.value
        });
    }
    handleKeyUp(e){
        if(e.keyCode ===13 && e.shiftKey === true){
            const val = e.target.value;
            if(!val){
                this.setState({
                    errMsg:'＊入力が空です'
                })
            }else{
            this.setState({
                val:'',
                errMsg:''
            });
            this.props.callBackAddTask(val);
        }
      }
    }
    render(){
        const errMsg = (this.state.errMsg)? <span className="error">{this.state.errMsg}</span> :'';
        return(
            <div className="form">
                {errMsg}
                <div className="inputArea">
                    <input type="text"
                           className="input Text"
                           value={this.state.val}
                           onChange={(e)=>{this.handleChange(e)}}
                           onKeyUp={(e)=>{this.handleKeyUp(e)}}
                           placeholder="Enter todo !"
                    />
                    
                </div>
            </div>
        );
    }
 }

 export class Search extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            val:''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({
            val:e.target.value
        });
        this.props.callBackSearch(e.target.value);
    }
    render(){
        return(
            <div className="searchBox">
                <i className="fa fa-search searchBox__icon" aria-hidden="true" />
                <input type="text" className="searchBox__input" onChange={this.handleChange}
                value={this.state.val} placeholder="enter search keyword" />
            </div>
        );
    }
 }