import { Container, Navbar, Nav } from "react-bootstrap";
import Image from 'next/image'
import Link from 'next/link'
import mm from "./m.png";
import kk from "./k.png";

export function NavBar(props) {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="/">
          <Image src={mm} alt="M" width={15}
            height={15} className="brand"></Image>
          <Image src={kk} alt="K" width={15}
            height={15} className="brand"></Image>
        </Navbar.Brand>
        <Nav className="me-auto">
        <Link href="/about">
          <a>About</a>
        </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
