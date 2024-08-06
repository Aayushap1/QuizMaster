import React, { useState } from "react";
import { useEffect } from "react";
import { Progress, Button } from "reactstrap";
import ShowQuestions from "./ShowQuestions";
import Questions from "./Questions";

function randomShuffling(ques) {
  for (let i = ques.length - 1; i > ques.length - 11; i--) {
    // Math.random() return any value greater than or equal to 0 but strictly less than 1.
    let idx = Math.floor(Math.random() * (i + 1));
    let temp = ques[i];
    ques[i] = ques[idx];
    ques[idx] = temp;
  }
  return ques;
}

function ShowTime(props) {
  const { time } = props;
  return (
    <div className="container">
      <div className="text-center">{time === 0 ? "Time's Up" : time + " seconds left"}</div>
      <Progress value={100 - (100 * time) / 120} color="danger" />
    </div>
  );
}

function Timer(props) {
  const [time, setTime] = useState(120);
  const [active, setActive] = useState(true);
  const [cur, setCur] = useState(0);
  const [problems, setProblems] = useState(null);
  const [choosen, setChoosen] = useState([null, null, null, null, null, null, null, null, null, null]);

  const setOptionChoosen = function (index, choice) {
    if (active) {
      setChoosen((prev) => prev.map((value, i) => (i === index ? choice : value)));
    }
  };

  const endQuiz = function () {
    setActive(false);
    let score = 0;
    for (let i = 0; i < problems.length; i++) {
      if (problems[i].correct === choosen[i]) score++;
    }
    alert("Your score is " + score + " out of 10 ");
  };

  useEffect(
    function () {
      if (time === 0) {
        endQuiz();
      }
      if (active && time > 0) {
        setTimeout(function () {
          setTime(time - 1);
        }, 1000);
      }
    },
    [time]
  );

  useEffect(function () {
    setProblems(randomShuffling(Questions).splice(-10));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <ShowTime time={time} />
          <br />
          <br />
          <ShowQuestions
            idx={cur + 1}
            problem={!problems ? null : problems[cur]}
            active={active}
            optionChoosen={choosen[cur]}
            setOptionChoosen={setOptionChoosen}
          />
          {cur !== 0 && (
            <>
              <Button
                color="warning"
                onClick={function () {
                  setCur(cur - 1);
                }}
              >
                Previous
              </Button>{" "}
            </>
          )}
          {cur !== 9 && (
            <>
              <Button
                color="warning"
                onClick={function () {
                  setCur(cur + 1);
                }}
              >
                Next
              </Button>{" "}
            </>
          )}
          {active && (
            <>
              <Button
                color="success"
                onClick={function () {
                  endQuiz();
                }}
              >
                Submit
              </Button>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Timer;
