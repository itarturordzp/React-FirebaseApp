import React, {Component} from "react";
import './index.css';

class Note extends Component{
    constructor(props){
        super(props);
        this.noteContent = props.noteContent
        this.noteId = props.noteId
    }

    handleRemove(id){
        const response = window.confirm('Estas seguro de querer eliminar?')
        if(response){
        this.props.removeNote(id)
        }
        return;
    }


render(){
    return(
    <div className="Note">
        <span onClick={()=>this.handleRemove(this.noteId)}>
            &times;</span>
        <p>{this.noteContent}</p>
    </div>
    )
};

}

export default Note;