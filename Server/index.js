const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydemodb",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    console.log(result);
    res.send(result);
  });
});
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReviews;

  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});
app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "Delete FROM movie_reviews where id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const review = req.body.movieReviews;
  const sqlDelete = "UPDATE movie_reviews SET movieReview = ? WHERE id = ?";
  db.query(sqlDelete, [review, id], (err, result) => {
    if (err) console.log(err);
    else console.log(result);
  });
});

app.listen(3002, () => {
  console.log("running on port 3002");
});
