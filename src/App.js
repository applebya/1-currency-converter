import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Input,
  InputGroup
} from "reactstrap";

import { fetchCurrencyCodes } from "./api";
import CurrencyDropdown from "./CurrencyDropdown";

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isLoadingCodes: true,
      isOpen: false
    };
  }
  componentDidMount() {    
    fetchCurrencyCodes((currencyCodes, err) => {
      if (err) {
        throw new Error(err)
        alert("Unable to load currency codes, please check your network connection and try again")
        return
      }

      this.setState({
        currencyCodes,
        isLoadingCodes: false
      })
    );
  }
  toggle() {
    this.setState(state => {
      return {
        isOpen: !state.isOpen
      };
    });
  }
  render() {
    return (
      <div>
        <Navbar color="inverse" inverse toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">Currency Converter</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#TODO">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1>Source Currency</h1>
                <InputGroup>
                  <Input />
                </InputGroup>
              </Col>

              <Col>
                <h1>Target Currency</h1>
                <InputGroup>
                  <Input />
                </InputGroup>
              </Col>
            </Row>
            <Row>The rates are updated daily around 4PM CET.</Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
