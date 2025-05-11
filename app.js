import { useEffect, useState } from 'react';
import './App.css';

function App() {
const [valor, setValor] = useState('');
const [de, setDe] = useState('BRL');
const [para, setPara] = useState('USD');
const [resultado, setResultado] = useState('');
const [taxas, setTaxas] = useState({});
const [carregando, setCarregando] = useState(true);

useEffect(() => {
const fetchTaxas = async () => {
    try {
        const res = await fetch('https://v6.exchangerate-api.com/v6/53c09037d174e438e9fe3fde/latest/BRL');
    const data = await res.json();
    setTaxas(data.conversion_rates);
    setCarregando(false);
    } catch (err) {
    setResultado('Erro ao buscar taxas. Verifique sua conexão ou API Key.');
    setCarregando(false);
    }
};

fetchTaxas();
}, []);

const converter = () => {
const num = parseFloat(valor);
if (isNaN(num)) {
    setResultado('Digite um número válido!');
    return;
}
const taxa = taxas[para] / taxas[de];
const convertido = num * taxa;
setResultado(`${convertido.toFixed(2)} ${para}`);
};

return (
<div className="container">
    <h2>Conversor de Moeda 🌍</h2>

    {carregando ? (
    <p>Carregando taxas...</p>
    ) : (
    <>
        <input
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Digite o valor"
        />
        <br />
        <select value={de} onChange={(e) => setDe(e.target.value)}>
        {Object.keys(taxas).map((moeda) => (
            <option key={moeda} value={moeda}>{moeda}</option>
        ))}
        </select>
        <span> ➡️ </span>
        <select value={para} onChange={(e) => setPara(e.target.value)}>
        {Object.keys(taxas).map((moeda) => (
            <option key={moeda} value={moeda}>{moeda}</option>
        ))}
        </select>
        <br /><br />
        <button onClick={converter}>Converter</button>
        <p className="resultado">{resultado}</p>
    </>
    )}
</div>
);
}

export default App;
