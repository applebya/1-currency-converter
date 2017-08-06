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
  Button
} from "reactstrap";

import { fetchCurrencyCodes } from "./api";
import CurrencySelector from "./CurrencySelector";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingCodes: true,
      sourceCode: "CAD",
      targetCode: "USD",
      currencyCodes: [],
      sourceAmount: 0,
      isOpen: false
    };
  }
  componentDidMount() {
    fetchCurrencyCodes((currencyCodes, err) => {
      this.setState({
        currencyCodes,
        isLoadingCodes: false
      });
    });
  }
  toggle() {
    this.setState(state => {
      return {
        isOpen: !state.isOpen
      };
    });
  }
  updateSourceAmount(amount) {
    let sourceAmount = "";
    const numbers = "0123456789";

    // Strip out invalid numbers
    for (var i = 0; i < amount.length; i++) {
      if (numbers.indexOf(amount[i]) > -1) {
        sourceAmount += amount[i];
      }
    }

    // Convert to number
    // TODO: Ensure positive number
    sourceAmount = sourceAmount * 1;

    this.setState({ sourceAmount });
  }
  render() {
    let {
      isLoadingCodes,
      sourceCode,
      targetCode,
      currencyCodes,
      isOpen,
      sourceAmount
    } = this.state;

    let calculatedAmount = sourceAmount * 2;

    return (
      <div>
        <Navbar color="inverse" inverse toggleable>
          <NavbarToggler right onClick={() => this.toggle} />
          <NavbarBrand href="/">Currency Converter</NavbarBrand>
          <Collapse isOpen={isOpen} navbar>
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
                <CurrencySelector
                  amount={sourceAmount}
                  selectedCode={sourceCode}
                  currencyCodes={currencyCodes}
                  onSelectCode={sourceCode => this.setState({ sourceCode })}
                  onUpdateAmount={amount => this.updateSourceAmount(amount)}
                  isLoading={isLoadingCodes}
                />
              </Col>

              <Col>
                <h1>Target Currency</h1>
                <CurrencySelector
                  amount={calculatedAmount}
                  selectedCode={targetCode}
                  currencyCodes={currencyCodes}
                  onSelectCode={targetCode => this.setState({ targetCode })}
                  onUpdateAmount={sourceAmount => this.setState({ sourceAmount })}
                  isLoading={isLoadingCodes}
                />
              </Col>
            </Row>
            <Row>
              <br />
              Rates are updated daily around 4PM CET.
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
