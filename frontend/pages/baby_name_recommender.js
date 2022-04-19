import { Page } from "../components/Page"
import { Article } from "../components/Article"
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { API_URL } from "../pages/index";

export default function LearningSpanishPage() {
  const articleId = 4;
  const [recommendations, setRecommendations] = useState([]);
  const [name, setName] = useState("");
  const [sex, setSex] = useState("F");

  function makeRequest() {
    const BABY_NAME_RECOMMENDATIONS = `${API_URL}/babyNameRecommendations`;

    return fetch(`${BABY_NAME_RECOMMENDATIONS}?name=${name}&sex=${sex}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.recommendations)
        if (res && res.recommendations) {
          setRecommendations([])
          setRecommendations(res.recommendations)
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
  };
  const listItems = recommendations.map(r =>
    <li key={r.name}>{r.name} ({r.matchPercentage}% match)</li>
  );

  return (
    <Page>
      <Article
        heading={"Baby name recommender"}
        articleId={articleId}
      >
        <p>This recommender system has been trained on 890626 names from 1900 to 2019 recorded in the US. It is using clustering to find similar names.</p>
        <p>{' '}</p>
        <h6>Enter a first name you like and select the sex of the name</h6>
        <input placeholder="Enter a first name" onChange={e => setName(e.target.value.toLowerCase())}></input>
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" size="sm" onClick={() => setSex("M")}>Male</Button>
          <Button variant="primary" size="sm" onClick={() => setSex("F")}>Female</Button>
        </ButtonGroup>
        <br />
        <LoadingButton buttonText={"Get me recommendations"}
          makeRequest={makeRequest}
        />
        <p>{' '}</p>

        <h6>Your recommended names</h6>
        <ul>
          {listItems}
        </ul>
      </Article>
    </Page>
  );
}




function LoadingButton({ buttonText, makeRequest }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;               // note mutable flag

    if (isLoading) {
      makeRequest()
        .then(() => {
          setLoading(false);
        });
    }
    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant="success"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? 'Loading…' : buttonText}
    </Button>
  );
}