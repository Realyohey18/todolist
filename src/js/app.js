import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/Todolist';
import _ from 'lodash';
import {TodoCreater} from './components/creater_search';
import {Search} from './components/creater_search';


class TodoApp extends React.Component {

    constructor(){
        super();
        this.state={
            data:[
                {
                    id:this.createHashId(),
                    text:'sample todo1'
                },
                {
                    id:this.createHashId(),
                    text:'sample todo2'
                }
            ],
            searchText:''
        };
        this.callBackRemoveTask = this.callBackRemoveTask.bind(this);
        this.callBackAddTask = this.callBackAddTask.bind(this);
        this.callBackSearch = this.callBackSearch.bind(this);
        this.filterCollection = this.filterCollection.bind(this);


    }
    // method
    createHashId(){
        return Math.random().toString(36).slice(-16);
    }
    callBackSearch(val){
        this.setState({
            searchText:val
        });
    }
    callBackAddTask(val){
        let nextData = this.state.data;
        nextData.push({id:this.createHashId(),text:val});
        this.setState({
            data:nextData
        });
    }
    callBackRemoveTask(id){
    let data = _.reject(this.state.data, { 'id': id });
    this.setState({
      data: data
    });
  }
    filterCollection(elm){
        const regexp = new RegExp('^'+this.state.searchText,'i');
        return (elm.text.match(regexp));
    }
    
    render(){
        const data = (this.state.searchText)?this.state.data.filter(this.filterCollection) : this.state.data;
        return(
           <div> 
            <TodoCreater callBackAddTask={this.callBackAddTask} />

            <Search callBackSearch={this.callBackSearch} />
            
            <TodoList data={data} callBackRemoveTask={this.callBackRemoveTask} />
           </div> 
        );
    }
}

ReactDOM.render(
    <TodoApp/>,document.getElementById('app')
);