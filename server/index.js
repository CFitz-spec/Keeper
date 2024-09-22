import pg from "pg";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

//Start up app
const app = express();
//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

//.env config
dotenv.config();
const port = process.env.port; //port set up

//Data Base Server running
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
db.connect();

// Get the data in the from the DB
async function notesDB() {
  try {
    const result = await db.query(`SELECT * FROM notes`);
    return result.rows;
  } catch (err) {
    console.log(`Error accessing database`, err);
  }
}
//code to add new note to data base
async function addNotes(newTitle, newContent) {
  try {
    await db.query("INSERT INTO notes(title, content) VALUES ($1, $2)", [
      newTitle,
      newContent,
    ]);
  } catch (err) {
    console.log("Error saving note to database", err);
  }
}

//delete function
async function deleteNote(noteId) {
  try {
    await db.query("DELETE FROM notes WHERE id = $1;", [noteId]);
  } catch (err) {
    console.log("Error deleting message", err);
  }
}

// Cors() this is short for Cross Origin Shared resource..
// Okay as I develop the app, the URL changes.
// So I can use the app.use(cors()) to allow all CORS requests.
// Makes life easier

//home page

app.get("/", async (req, res) => {
  const notes = await notesDB();
  res.json(notes);
});

app.post("/add", async (req, res) => {
  const { title, content } = req.body;
  addNotes(title, content);
  res.redirect("/");
});

//route for deleting a note on the users data base
app.delete("/delete", async (req, res) => {
  const deleteId = req.body.id;
  deleteNote(deleteId);
  res.redirect("/");
  //This would need to change to
});

app.listen(port, () => {
  console.log("Server running");
});
