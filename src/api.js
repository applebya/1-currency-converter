function fetchCurrencyCodes(cb) {
	fetch("http://api.fixer.io/latest", {
		method: "get"
	})
		.then(response => response.json())
		.then(json => {
			let { base, rates } = json,
				currencyCodes = [base, ...Object.keys(rates)].sort();

			cb(currencyCodes);
			return;
		})
		.catch(error => {
			alert(
				"Unable to load currency codes, please check your network connection and try again"
			);
			throw new Error(error);
			return;
		});
}

export { fetchCurrencyCodes };
