import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function Home(props) {
  return (
    <div className="container">
      <div className="row text-center heading">
        This platform adds various questions randomly from a question bank and prepares a quiz for you.
      </div>
      <br />
      <br />
      <div className="row text-center">
        <div className="col-12">
          <Link to="/quiz">
            <Button color="warning">Start Quiz</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
