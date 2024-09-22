import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import InputArea from "./components/InputArea";
import Note from "./components/Note";
import Footer from "./components/Footer";
import axios from "axios";

/*
What I want it to do
  Get notes saved in the database //done
  Post notes to the database//done 
  Delete notes in the back end // Done! 
*/

//render app
function App() {
  /*
Set States. 
So far only needs notes state to be set.
Likely to need another one for login functionality.  
*/
  const [notes, setNotes] = useState([]);
  const [render, setRender] = useState([]);

  /*
  This was a bastard to work out. 
  useEffect happens on render. 
  Calls the async function that gets the data from local host3000 
  Then calls SetNotes and iterates through the array of objects 
  CB function loadDataBase is within the useffect function. 

  But the [] is the count of iteration. An empty array means only once. Otherwise this will keep calliing the api. 
  */

  useEffect(() => {
    loadDataBase();
  }, [render]); // [] is needed so the use effect only runs once on render.[render] means every time this state is updated it runs
  async function loadDataBase() {
    try {
      const response = await axios.get("http://localhost:3000/");
      const result = response.data;
      console.log("apicalled");

      setNotes(
        result.map((element) => ({
          id: element.id,
          title: element.title,
          content: element.content,
        }))
      );
    } catch (err) {
      console.log("Client to Server error");
    }
  }

  function onAdd(note) {
    AddDB(note);
  }

  //This part was annoying to work out. So I was trying to send the information as a header instead of form urlencoded data.
  //This in turn lead to the req.body being blank as no body was being sent
  //I found this out by looking at the code snipped provided by the POSTman app to help with API calls and the Axios docs.
  async function AddDB(note) {
    try {
      console.log(note);
      await axios({
        method: "post",
        url: "http://localhost:3000/add/",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          title: note.title,
          content: note.content,
        },
      });
      setRender([]);
    } catch (err) {
      console.log("error adding to database", err);
    }
  }

  //Here I noticed that I don't actually need to have the orginal code that I made from the course.
  // As I'm using the database. I can just delete and refresh
  function deleteNote(databaseid) {
    deleteFromDB(databaseid);
  }

  //This gets the right info sent over. But the issue I'm having is matching the id of the notes to the ids saved in the database.
  //solution rather than get funky with props. Just make another id called databaseid.
  //This one is the same as db id, and then the original delete function doesn't need overhauling.
  //Something that's interesting. This gets an error message, but still does what it needs too. Soooooo fails sucessfully?
  async function deleteFromDB(id) {
    const deleteID = id;
    try {
      await axios({
        method: "delete",
        url: "http://localhost:3000/delete",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          id: deleteID,
        },
      });
      console.log("deleted");
    } catch (err) {
      console.log("error deleting from Database", err);
    }
    setRender([]);
  }

  return (
    <div>
      <Header />

      <InputArea addNote={onAdd} />
      <div className="noteFlex">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              title={noteItem.title}
              content={noteItem.content}
              databaseid={noteItem.id}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
