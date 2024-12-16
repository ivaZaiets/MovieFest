import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import sprite from "../../public/sprite.svg";
import "../styles/components/Navbar.scss";

const Navbar = ({
  query,
  setQuery = () => {},
  isMoviePage,
}: {
  query?: string;
  setQuery?: (value: string) => void;
  isMoviePage?: boolean;
}) => {
  return (
    <div className="navbar-container">
      <BootstrapNavbar expand="lg" className="bg-body-tertiary">
        <Container>
          <BootstrapNavbar.Brand className="d-flex">
            <svg width="30" height="30">
              <use fill="white" xlinkHref={`${sprite}#movie-roll`} />
            </svg>
            MovieFest
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav">
            <span></span>
            <span></span>
            <span></span>
          </BootstrapNavbar.Toggle>
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-lg-3">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/watchlist">
                WatchList
              </Nav.Link>
            </Nav>

            {!isMoviePage && (
              <Form className="d-flex form">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <svg width="25" height="25" className="search-icon">
                  <use stroke="#5a5a5a" xlinkHref={`${sprite}#search`} />
                </svg>
              </Form>
            )}
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </div>
  );
};

export default Navbar;
