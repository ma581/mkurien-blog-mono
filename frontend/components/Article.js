import { Container, Row, Col } from "react-bootstrap";
import Feedback from "./Feedback";
import { Footer } from "./Footer";
export function Article(props) {
    return (
      <>
        <Row>
          <h1>{props.heading}</h1>
          <h4>{props.subheading}</h4>
          <h5 className="light">{props.date ? props.date : today()}</h5>
          <br />
          <div>{props.children}</div>
        </Row>
        <Row>
          <Feedback {...props} />
        </Row>
        <Row>
          <Footer {...props} />
        </Row>
      </>
    );
  }

  function today() {
    const todayDate = new Date();
    return `${getMonthNameShort(
      todayDate
    )} ${new Date().getDate()}, ${new Date().getFullYear()}`;
  }
  
  const getMonthNameShort = (date) => monthShortNames[date.getMonth()];
  
  const monthShortNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];