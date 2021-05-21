
import React from 'react';
import ClassNames from 'classnames';

export default class Task extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            id: this.props.id,
            text:this.props.text,
            idDone:this.props.isDone,
            editMode:false
        };
        this.handleClickToggleDone = this.handleClickToggleDone.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
        this.handleClickshowEdit = this.handleClickshowEdit.bind(this);
        this.handleKeyUpCloseEdit = this.handleKeyUpCloseEdit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
    }
    handleChangeText(e){
        this.setState({
            text:e.target.value
        });
    }
    handleClickToggleDone (e){
        this.setState({isDone:!isDone});
    }
    handleClickRemove(e){
        this.props.onRemove(this.state.id);
    }
    handleClickshowEdit(){
        this.setState({
            editMode:true
        });
    }
    handleKeyUpCloseEdit(e){
        if(e.keyCode === 13 && e.shiftKey === true){
            this.setState({
                text:e.target.value,
                editMode:false
            });
        }
    }
    componentWillUnmont(){
        console.log('componentWillUmmont');
    }
    render(){
        const classNameLi = ClassNames({
            'list__item':true,
            'list__item--done':this.state.isDone
        });
        const classNameIcon = ClassNames({
            'fa':true,
            'fa-curcle-thin':!this.state.isDone,
            'fa-check-circle':this.state.isDone,
            'list__item--done':this.state.isDone,
            'icon-check':true

        });
        const classNameColor = ClassNames({
            'list__item--done':this.state.isDone
        })
          const input = (this.state.editMode && !this.state.isDone) ?
          <input type="text" className="editText" value={this.state.text}
                onChange={this.handleChangeText} onKeyUp={this.handleKeyUpCloseEdit}
          />:
          <span className={classNameColor} onClick={this.handleClickshowEdit}>{this.state.text}</span>

        return(
            <li className={classNameLi}>
                <i classname={classNameIcon} onClick={this.handleClickToggleDone} aria-hidden="true"/>
                {input}
                <i className="fa fa-trash icon-trash" onClick={this.handleClickRemove} aria-hidden="true"/>

            </li>
        );
    }
}

import React from 'react';
import Task from './Task';

export default class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }
    handleRemove(id){
        this.props.callBackRemoveTask(id);
    }
    render(){
        let tasks = [];
        for(let i in this.props.data){
            tasks.push(<Task key={this.props.data[i].id}
                        id={this.props.data[i].id}
                        text={this.props.data[i].text}
                        isDone={this.props.data[i].isDone}
                        onRemove={this.handleRemove}
                        />);
                
        }
        return(
           <ul className="list js-todo_list">
               {tasks}
           </ul>  
        )
    }
}
