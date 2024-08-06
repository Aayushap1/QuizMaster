import React from "react";
import { Form, Spinner, FormGroup, Label, Input, Alert } from "reactstrap";

function ShowQuestions(props) {
  const { idx, problem, active, optionChoosen, setOptionChoosen } = props;
  if (!problem) {
    return <Spinner color="tertiary" />;
  }

  const { question, correct, choices, image, desc } = problem;

  return (
    <div className="container">
      {image !== "None" && (
        <div className="row">
          <div className="col-12 text-center">
            <img src={image} />
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-12 text-center">
          <h4>{idx + ". " + question}</h4>
        </div>
      </div>
      {choices.map((option, i) => (
        <Form key={i.toString()}>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name={"radio" + i}
                checked={optionChoosen === i + 1}
                onChange={function () {
                  setOptionChoosen(idx - 1, i + 1);
                }}
              />
              {option}
            </Label>
          </FormGroup>
        </Form>
      ))}
      {!active &&
        (correct === optionChoosen ? (
          <Alert color="success">
            <b> Correct answer: </b> {correct}
            <div>
              <b> Description: </b>
              {desc}
            </div>
          </Alert>
        ) : (
          <Alert color="danger">
            <b> Correct answer: </b> {correct}
            <div>
              <b> Description: </b>
              {desc}
            </div>
          </Alert>
        ))}
    </div>
  );
}

export default ShowQuestions;
