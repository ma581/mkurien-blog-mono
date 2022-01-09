import { Button } from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";
import { Like } from "./Like";

export function Footer(props) {
  return (
    <div>
      <br></br>
      <br></br>
      <Like {...props} />{" "}
      <Button variant="light" href="https://twitter.com/mshokk">
        🐦 Follow me on Twitter
      </Button>
    </div>
  );
}

Footer.propTypes = {
  heading: PropTypes.string,
  articleId: PropTypes.number,
};
