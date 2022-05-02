import { Page } from "../components/Page"
import { Article } from "../components/Article"
import { Button, Badge, Card, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { API_URL } from "../pages/index";
import { Toggle } from "../components/Toggle";

export default function LearningSpanishPage() {
  const articleId = 4;
  const [recommendations, setRecommendations] = useState([]);
  const [name, setName] = useState("");
  const [sex, setSex] = useState('M');

  const radios = [
    { name: 'Male', value: 'M' },
    { name: 'Female', value: 'F' },
  ];
  function makeRequest() {
    const BABY_NAME_RECOMMENDATIONS = `${API_URL}/babyNameRecommendations`;

    return fetch(`${BABY_NAME_RECOMMENDATIONS}?name=${name}&sex=${sex}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.recommendations) {
          setRecommendations([])
          setRecommendations(res.recommendations)
        }
      })
      .then((res) => {
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
        <Card className="text-center">
          <Card.Header>Version 1</Card.Header>
          <Card.Body>
          <Stack gap={3} className="col-md-5 mx-auto" >
            <h6>Enter a <i>first name</i> you like and select the <i>sex</i> of the names I will recommend for you</h6>
            <input 
            variant="primary"
            placeholder="Enter a first name" 
            onChange={e => setName(e.target.value.toLowerCase())}></input>
            <Toggle radios={radios} radioValue={sex} setRadioValue={setSex} />
            <LoadingButton buttonText={"Get me recommendations"}
              makeRequest={makeRequest}
            />
            <h6>Your recommended names</h6>
            <ul style={{ "listStyleType": "none" }}>
              {listItems}
            </ul>
          </Stack>
            
          </Card.Body>
        </Card>
        <p></p>
        <h4>How does this work?</h4>
        <p>I am using <b>Machine Learning</b> to cluster names based on features of the name. Using this, I can fetch names belonging to the same cluster to suggest similar names to the one you enter. This recommender system has been trained on 890626 names from 1900 to 2019 recorded in the US. It is using clustering to find similar names.</p>

        <h5>Version 1 <Badge bg="primary">Current</Badge></h5>
        <p>I am using unspervised learning to cluster names (K-means clustering) based on the features:
        </p>
        <ul>
          <li>Sex</li>
          <li>First letter of the name</li>
          <li>Length of the name</li>
          <li>Number of syllables</li>
        </ul>

        <h5>Version 2 <Badge bg="secondary">Work in progress</Badge></h5>
        <p>I will use unspervised learning to cluster names (K-means clustering) using additional features:</p>
        <ul>
          <li>Name phonetics</li>
          <li>Origin of the name</li>
        </ul>

        <h5>Version 3 <Badge bg="secondary">Planned</Badge></h5>
        <p>I will collect user feedback for these recommended names to identify which names people like.
          This data can then be used to train a supervised learning model.
        </p>

        <h5>Version 4 <Badge bg="secondary">Planned</Badge></h5>
        <p>I will build a reinforcement learning model that will use online learning. As users provide feedback for these recommended names, the model can learn and adapt on the fly. This type of learning will be slow (dependent on the number of users providing feedback).
        </p>
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