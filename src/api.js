const fetchURI = "http://api.fixer.io/latest";

function fetchRatesFor(code = "USD") {
	return fetch(fetchURI + `?base=${code}`, { method: "get" }).then(response => response.json());
}

export { fetchRatesFor };
