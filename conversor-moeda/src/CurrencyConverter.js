import React, { useState } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
const [amount, setAmount] = useState(1);
const [fromCurrency, setFromCurrency] = useState('USD');
const [toCurrency, setToCurrency] = useState('BRL');
const [convertedAmount, setConvertedAmount] = useState(null);
const [error, setError] = useState(null);

const currencies = ['USD', 'BRL', 'EUR', 'GBP', 'JPY', 'AUD']; // Exemplo de moedas

const convertCurrency = () => {
const apiKey = '53c09037d174e438e9fe3fde'; // Sua chave da API
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

axios.get(url)
    .then(response => {
    const exchangeRate = response.data.conversion_rates[toCurrency];
    if (exchangeRate) {
        setConvertedAmount(amount * exchangeRate);
        setError(null);
    } else {
        setError('Erro na conversão');
        setConvertedAmount(null);
    }
    })
    .catch(err => {
    setError('Erro ao buscar dados da API');
    setConvertedAmount(null);
    });
};

return (
<div>
    <h1>Conversor de Moeda</h1>
    <div>
    <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
    />
    <select
        value={fromCurrency}
        onChange={e => setFromCurrency(e.target.value)}
    >
        {currencies.map(currency => (
        <option key={currency} value={currency}>
            {currency}
        </option>
        ))}
    </select>
    para
    <select
        value={toCurrency}
        onChange={e => setToCurrency(e.target.value)}
    >
        {currencies.map(currency => (
        <option key={currency} value={currency}>
            {currency}
        </option>
        ))}
    </select>
    <button onClick={convertCurrency}>Converter</button>
    </div>

    {error && <p>{error}</p>}
    {convertedAmount !== null && (
    <div>
        <p>
        {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
        </p>
    </div>
    )}
</div>
);
};

export default CurrencyConverter;
