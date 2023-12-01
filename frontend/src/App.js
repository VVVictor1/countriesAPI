import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [countryInput, setCountryInput] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCountryInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/users/${countryInput}`);

      if (response.ok) {
        const data = await response.json();
        setCountryInfo(data);
      } else {
        console.error('Country not found');
      }
    } catch (error) {
      console.error('Error fetching country information:', error);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h1 className="mb-4 text-center">Country Information App</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter country name"
            value={countryInput}
            onChange={(e) => setCountryInput(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={fetchCountryInfo}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Country Information'}
          </button>
        </div>
  
        {countryInfo && (
  <div className="card p-4 info">
    <div className="card-container">
      <div className="container-img">
        <p className="flag">
          <img src={countryInfo.flags?.png} alt="Flag" className="flag-img" />
        </p>
        <h2 className="text-center">{countryInfo.name?.official}</h2>
      </div>
      <div className="country-details">
        <p>
          <strong>Capital:</strong> {countryInfo.capital}
        </p>
        <p>
          <strong>Region:</strong> {countryInfo.region}
        </p>
        <p>
          <strong>Subregion:</strong> {countryInfo.subregion}
        </p>
        <p>
          <strong>Population:</strong> {countryInfo.population}
        </p>
        <p>
          <strong>Languages:</strong>{' '}
          {countryInfo.languages
            ? Object.values(countryInfo.languages).join(', ')
            : ''}
        </p>
        <p>
          <strong>Currencies:</strong>{' '}
          {countryInfo.currencies
            ? Object.entries(countryInfo.currencies).map(
                ([code, currency]) => (
                  <span key={code}>
                    {currency.name} ({currency.symbol})
                  </span>
                )
              )
            : ''}
        </p>
        <p>
          <strong>Area:</strong> {countryInfo.area} square kilometers
        </p>
        <p>
          <strong>Timezones:</strong>{' '}
          {countryInfo.timezones
            ? countryInfo.timezones.join(', ')
            : ''}
        </p>
        {countryInfo.latlng && (
  <p className="mt-3">
    <strong>Location:</strong>{' '}
    <a
     href={`https://www.openstreetmap.org/?mlat=${countryInfo.latlng[0]}&mlon=${countryInfo.latlng[1]}&zoom=6`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-decoration-none text-primary ms-2"
    >
      Open Map
    </a>
  </p>
)}

      </div>
    </div>
  </div>
)}

      </div>
    </div>
  ); 
}

export default App;