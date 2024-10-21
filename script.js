const apiKey = '5fc45b314b230a01de635a85'; // Replace with your API key
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`; // Example API endpoint

document.addEventListener("DOMContentLoaded", function () {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const amountInput = document.getElementById("amount");
    const resultDiv = document.getElementById("result");
    const form = document.getElementById("converter-form");

    // Fetch currencies and populate select options
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const option1 = document.createElement("option");
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement("option");
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });
        });

    // Handle form submit for conversion
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (amount === "" || from === "" || to === "") {
            resultDiv.textContent = "Please fill in all fields.";
            return;
        }

        
        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rate;
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
            })
           
    });
});
