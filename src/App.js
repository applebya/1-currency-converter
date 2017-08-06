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
  Alert
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
      navIsOpen: false,
      errorMsg: null
    };
  }
  componentDidMount() {
    fetchRatesFor(this.state.baseCode)
      .then(({ base, rates }) => {
        this.setState({
          isLoaded: true,
          baseCode: base,
          rates
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errorMsg: "Unable to load exchange rates, please check your network connection."
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
      .catch(err => {
        console.error(err);
        this.setState({
          errorMsg: "Unable to load exchange rates, please check your network connection."
        });
      });
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
      .catch(err => {
        console.error(err);
        this.setState({
          errorMsg: "Unable to load exchange rates, please check your network connection."
        });
      });
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
    let { navIsOpen, errorMsg } = this.state;

    return (
      <div>
        <Navbar color="inverse" inverse toggleable>
          <NavbarToggler right onClick={() => this.toggleNav()} />
          <NavbarBrand href="/">Currency Converter</NavbarBrand>
          <Collapse isOpen={navIsOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  href="https://github.com/applebya/1-currency-converter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron>
          {errorMsg &&
            <Alert
              color="danger"
              isOpen={!!errorMsg}
              toggle={() => this.setState({ errorMsg: null })}
            >
              {errorMsg}
            </Alert>}
          <RatesCalculator
            onSelectBaseCode={code => this.updateRates(code)}
            onSelectTargetCode={code => this.updateTargetCode(code)}
            onUpdateBaseAmount={amount => this.updateBaseAmount(amount)}
            onReverseCodes={() => this.reverseCodes()}
            {...this.state}
          />
          <div style={{ textAlign: "center", opacity: "0.5" }}>
            <br />
            Rates are updated daily around 4PM CET
            <br />
          </div>
        </Jumbotron>
        <footer style={{ textAlign: "center" }}>
          <br />
          Made with &lt;3 by{" "}
          <a href="http://www.applebya.com" target="_blank" rel="noopener noreferrer">
            Andrew Appleby
          </a>
        </footer>
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
    return <h5>Loading...</h5>;
  }

  let exchangeRate = rates[targetCode],
    calculatedAmount = baseAmount * exchangeRate,
    currencyCodes = [baseCode, ...Object.keys(rates)];

  return (
    <Container>
      <Row>
        <Col lg="5">
          <h3>Source Currency</h3>
          <br />
        </Col>
        <Col lg="2" />
        <Col lg="5">
          <h3>Target Currency</h3>
          <br />
        </Col>
      </Row>
      <Row>
        <Col lg="5">
          <CurrencySelector
            amount={baseAmount}
            selectedCode={baseCode}
            currencyCodes={currencyCodes}
            onSelectCode={onSelectBaseCode}
            onUpdateAmount={onUpdateBaseAmount}
          />
        </Col>
        <Col lg="2" style={{ textAlign: "center" }}>
          <Button onClick={onReverseCodes}>Reverse</Button>
        </Col>
        <Col lg="5">
          <CurrencySelector
            amount={calculatedAmount}
            selectedCode={targetCode}
            currencyCodes={currencyCodes}
            onSelectCode={onSelectTargetCode}
            onUpdateAmount={() => {}}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
