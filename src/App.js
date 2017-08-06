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

import { fetchRatesFor } from "./api";
import CurrencySelector from "./CurrencySelector";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      baseCode: "CAD",
      targetCode: "USD",
      baseAmount: 1,
      navIsOpen: false
    };
  }
  componentDidMount() {
    fetchRatesFor(this.state.baseCode).then(({ base, rates }) => {
      this.setState({
        isLoaded: true,
        baseCode: base,
        rates
      });
    });
  }
  toggleNav() {
    this.setState(state => {
      return {
        navIsOpen: !state.navIsOpen
      };
    });
  }
  updateRates(baseCode) {
    // Skip update if already same code
    if (baseCode === this.state.baseCode) {
      return;
    }

    fetchRatesFor(baseCode)
      .then(({ rates }) => {
        this.setState({
          rates,
          baseCode
        });
      })
      .catch(err => console.error(err));
  }
  reverseCodes() {
    let baseCode = this.state.targetCode,
      targetCode = this.state.baseCode;

    fetchRatesFor(baseCode)
      .then(({ rates }) => {
        this.setState({
          rates,
          baseCode,
          targetCode
        });
      })
      .catch(err => console.error(err));
  }
  updateTargetCode(targetCode) {
    this.setState({ targetCode });
  }
  updateBaseAmount(amount) {
    let baseAmount = "";
    const numbers = ".0123456789";

    // Strip out invalid numbers
    for (var i = 0; i < amount.length; i++) {
      if (numbers.indexOf(amount[i]) > -1) {
        baseAmount += amount[i];
      }
    }

    this.setState({ baseAmount });
  }
  render() {
    let { navIsOpen } = this.state;

    return (
      <div>
        <Navbar color="inverse" inverse toggleable>
          <NavbarToggler right onClick={() => this.toggleNav()} />
          <NavbarBrand href="/">Currency Converter</NavbarBrand>
          <Collapse isOpen={navIsOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#TODO">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <RatesCalculator
          onSelectBaseCode={code => this.updateRates(code)}
          onSelectTargetCode={code => this.updateTargetCode(code)}
          onUpdateBaseAmount={amount => this.updateBaseAmount(amount)}
          onReverseCodes={() => this.reverseCodes()}
          {...this.state}
        />
      </div>
    );
  }
}

function RatesCalculator({
  isLoaded,
  baseAmount,
  baseCode,
  targetCode,
  rates,
  onSelectBaseCode,
  onSelectTargetCode,
  onUpdateBaseAmount,
  onReverseCodes
}) {
  // Still loading initial list?
  if (!isLoaded) {
    return (
      <Jumbotron>
        <h5>Loading...</h5>
      </Jumbotron>
    );
  }

  let exchangeRate = rates[targetCode],
    calculatedAmount = baseAmount * exchangeRate,
    currencyCodes = [baseCode, ...Object.keys(rates)];

  return (
    <Jumbotron>
      <Container>
        <Row>
          <Col>
            <h2>Source Currency</h2>
            <CurrencySelector
              amount={baseAmount}
              selectedCode={baseCode}
              currencyCodes={currencyCodes}
              onSelectCode={onSelectBaseCode}
              onUpdateAmount={onUpdateBaseAmount}
            />
          </Col>
          <Col>
            <Button onClick={onReverseCodes}>Reverse</Button>
          </Col>
          <Col>
            <h2>Target Currency</h2>
            <CurrencySelector
              amount={calculatedAmount}
              selectedCode={targetCode}
              currencyCodes={currencyCodes}
              onSelectCode={onSelectTargetCode}
              onUpdateAmount={() => {}}
            />
          </Col>
        </Row>
        <Row>
          <br />
          Rates are updated daily around 4PM CET.
        </Row>
      </Container>
    </Jumbotron>
  );
}

export default App;
