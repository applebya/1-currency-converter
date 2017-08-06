import React, { Component } from "react";
import { Input, InputGroup, InputGroupButton } from "reactstrap";

import CurrencyCodeDropdown from "./CurrencyCodeDropdown";

export default function CurrencySelector({
  amount,
  selectedCode,
  currencyCodes,
  onSelectCode,
  onUpdateAmount,
  isLoading
}) {
  return (
    <div>
      <InputGroup>
        <InputGroupButton>
          <CurrencyCodeDropdown
            isLoading={isLoading}
            selectedCode={selectedCode}
            currencyCodes={currencyCodes}
            onSelect={onSelectCode}
          />
        </InputGroupButton>
        <Input value={amount} onChange={event => onUpdateAmount(event.target.value)} />
      </InputGroup>
    </div>
  );
}
