import React, {Component} from "react";
import './index.css';

class Note extends Component{
    constructor(){
        super();
    }


render(){
    return(
    <div className="Note">
        <li>{this.noteId} - {this.noteId}</li>
    </div>
    )
};

}

export default Note;