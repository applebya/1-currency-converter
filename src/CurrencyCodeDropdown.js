import React from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let { selectedCode, onSelect } = this.props;

    return (
      <ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {selectedCode || "Currency"}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Select a code</DropdownItem>
          {this.props.currencyCodes.filter(code => code !== selectedCode).map(code => {
            return (
              <DropdownItem key={code} onClick={() => onSelect(code)}>
                {code}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
