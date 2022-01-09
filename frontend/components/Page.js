import { Container, Row, Col } from "react-bootstrap";
import { NavBar } from "./navbar/Navbar";

export function Page(props) {
    return (
      <>
      <NavBar/>
        <Container>
          <Row>
            <br></br>
            <br></br>
          </Row>
          <Col>
            <div>{props.children}</div>
          </Col>
          <Row>
            <br></br>
            <br></br>
          </Row>
        </Container>
      </>
    );
  }