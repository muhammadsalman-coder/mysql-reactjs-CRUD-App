import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [movieName, setmovieName] = useState("");
  const [movieReviews, setmovieReviews] = useState("");
  const [movieReviewList, setmovieReviewList] = useState([]);
  const [updateReview, setupdateReview] = useState();

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get").then((response) => {
      setmovieReviewList(response.data);
      // console.log(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3002/api/insert", {
      movieName: movieName,
      movieReviews: movieReviews,
    });
    alert("Successfully Insert Record");

    setmovieReviewList([
      ...movieReviewList,
      { movieName: movieName, movieReview: movieReviews },
    ]);
  };
  const deleteData = (id) => {
    Axios.delete(`http://localhost:3002/api/delete/${id}`);
  };

  const updateTuple = (id) => {
    console.log("working upadte Data");
    Axios.put("http://localhost:3002/api/update", {
      id: id,
      movieReviews: updateReview,
    });

    setupdateReview("");
  };
  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>

      <div className="form">
        <label>Movie Name: </label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setmovieName(e.target.value);
          }}
        />

        <label>Review: </label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setmovieReviews(e.target.value);
          }}
        />

        <button onClick={submitReview}>Submit</button>
        <div className="card-container">
          {movieReviewList.map((val) => {
            return (
              <div className="card" key={val.id}>
                <h2>{val.movieName}</h2>
                <p>{val.movieReview}</p>

                <button
                  onClick={() => {
                    deleteData(val.id);
                  }}
                >
                  Delete
                </button>
                <input
                  type="text"
                  id="updateInput"
                  onChange={(e) => {
                    setupdateReview(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateTuple(val.id);
                  }}
                >
                  Update
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
