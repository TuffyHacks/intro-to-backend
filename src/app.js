const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;

const notes = [];
let id = 0;

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", { title: "Notes App", notes });
});

app.post("/add-note", (req, res) => {
  const { title, author, content } = req.body;
  id += 1;
  notes.push({ id, title, author, content });
  //   res.send({ status: "success" });
  res.redirect("/");
});

app.get("/all-notes", (req, res) => {
  res.send({ data: notes });
});

app.get("/one-note", (req, res) => {
  const id = parseInt(req.query.id);
  const note = notes.find((n) => n.id === id);
  res.send({ data: note });
});

app.listen(port, () => {
  console.log(`The server is available at http://localhost:${port}`);
});
