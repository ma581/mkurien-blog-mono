import * as React from "react";
import { Input, Textarea } from "./Input";
import { Button, Alert } from "react-bootstrap";
import { API_URL } from "../pages/index.tsx";

export default function Feedback(props) {
  const [feedback, setFeedback] = React.useState("");

  const [serverState, setServerState] = React.useState({
    submitting: false,
    submitted: false,
    error: false,
  });

  function onChange(e) {
    setFeedback(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    setServerState({ submitting: true, submitted: false, error: false });
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());

    fetch(`${API_URL}/feedback?articleId=${props.articleId}`, {
      method: "PUT",
      body: JSON.stringify({
        feedback: value.feedback,
        email: value.email,
        twitterHandle: value.twitter,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setServerState({
            submitting: false,
            submitted: true,
            error: false,
          });
          form.reset();
          setFeedback("");
        } else {
          response.json().then((data) => {
            setServerState({
              submitting: false,
              submitted: true,
              error: data.error,
            });
          });
        }
      })
      .catch((err) => {
        console.error(`oh no ${err}`);
        setServerState({
          submitting: false,
          submitted: true,
          error: err,
        });
      });
  }

  return (
    <div style={{ backgroundColor: "#ecf0f1" }}>
      <br />
      <h5>Feedback</h5>
      <p className="text-tertiary">
        Was anything I wrote confusing or incorrect? Please let me know! Just
        write a few words below and I’ll be sure to fix it.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 space-y-4">
        <input
          type="hidden"
          value={`New comment on ${props.title}`}
          id={props.title}
          name="_subject"
          readOnly
        />
        <Textarea
          onChange={onChange}
          value={feedback}
          id="feedback"
          name="feedback"
          placeholder="What should I know? (250 char)"
          maxLength="250"
        ></Textarea>

        <div className="fill-space-2">
          <Input
            id="feedback-email"
            name="email"
            placeholder="(Optional) Email"
            type="email"
            maxLength="50"
          />

          <Input
            id="twitter"
            name="twitter"
            placeholder="(Optional) Twitter handle"
            type="text"
            maxLength="50"
          />
        </div>
        <div className="justify-end">
          <Button disabled={serverState.submitting || !feedback} type="submit">
            Send feedback
          </Button>
        </div>
        {serverState.submitted &&
          (serverState.error ? (
            <Alert variant="danger"> Oh no! That did not work :( </Alert>
          ) : (
            <Alert>Thanks for taking the time to leave a note!</Alert>
          ))}
      </form>
    </div>
  );
}

// curl -v -X POST \
//   'endpoint' \
//   -H 'content-type: application/json' \
//   -d '{ "feedback": "evening" }'
