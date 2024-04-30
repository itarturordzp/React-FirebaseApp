import React, { Component } from 'react';
import './App.css';
import Note from './Components/Note';
import NoteForm from './Components/NoteForm/NoteForm.jsx';
import firebase from 'firebase';
import 'firebase/database';
import{DB_CONFIG} from'./config/config.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: [
        //{ noteId: 1, noteContent: 'note 1' },
        //{ noteId: 2, noteContent: 'note 2' }
      ]
    };

    if (!firebase.apps.length) {
      this.app = firebase.initializeApp({DB_CONFIG})
    }else{
     this.app =firebase.app()
    }

    this.db = this.app.database().ref().child('notes')



    this.addNote = this.addNote.bind(this)
    this.removeNote = this.removeNote.bind(this)
  }

  componentDidMount(){
    const {notes}=this.state.notes;
    this.db.on('child_added',snap=>{
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      })
      this.setState({notes})

    })
    this.db.pm('child_remove', snap =>{
      for(let i= 0; i<notes.length; i++){
        if(notes[i].noteId === snap.key){
          notes.splice(i,i)
        }
      }
      this.setState()
    })
  }
  removeNote(noteId){
    this.db.child(noteId.remove())
  }

  addNote(note){
    //let {notes} = this.state
    //notes.push({
      //noteId: note.length +1 ,
      //noteContent: note
    //})
  //this.setState({notes})
   this.db.push().set({noteContent: note})

  }

  render() {
    return (
      <div className="notesContainer">

        <div className='notesHeader'>

            <h1>React & Firebase App</h1>
        
        </div>

        <div className='notesBody'>
          <ul>
            {
            this.state.notes.map(note => {
              return (
                <Note
                noteContent={note.noteContent}
                noteId={note.noteId}
                key={note.noteId} />
              );
            })}
          </ul>
        </div>
        <div className='notesFooter'>
          <NoteForm addNote ={this.addNote}/>
          
        </div>
      </div>
    );
  }
}

export default App;

