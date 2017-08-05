function fetchCurrencyCodes(cb) {
	fetch("http://api.fixer.io/latest", {
		method: "get"
	})
		.then(response => response.json())
		.then(json => {
			let { base, rates } = json,
				currencyCodes = [base, ...Object.keys(json)].sort();

			cb(currencyCodes);
			return;
		})
		.catch(error => {
			cb(null, error);
			return;
		});
}

export { fetchCurrencyCodes };
