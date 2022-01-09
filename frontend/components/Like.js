import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { API_URL } from "../pages/index";

export function Like(props) {
  const [likes, incrementLikes] = useLikes(props.articleId);
  function handleClick() {
    incrementLikes(props.articleId);
  }
  return (
    <Button variant="light" onClick={handleClick} className="swipe">
      ❤️ {likes}
    </Button>
  );
}

Like.propTypes = {
  articleId: PropTypes.number,
};

function useLikes(articleId) {
  const LIKES_URL = `${API_URL}/likes`;

  const [likes, setLikes] = useState(0);
  useEffect(() => {
    fetch(`${LIKES_URL}?articleId=${articleId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        setLikes(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [articleId, LIKES_URL]);

  function incrementLikes(articleId) {
    setLikes(likes + 1);

    fetch(`${LIKES_URL}?articleId=${articleId}`, {
      method: "POST",
    });
  }

  return [likes, incrementLikes];
}
