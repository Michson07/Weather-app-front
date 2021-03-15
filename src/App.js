import React, { useEffect, useState } from 'react';
import './App.css';
import Search from './Search';
import Forecast from './Forecast';
import ErrorBoundary from './ErrorBoundary';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCurrentCity } from './helpers/getCurrentLocation';

function App() {
  const [searched, setSearched] = useState(false);
  const [cities, setCities] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      const currentCity = await getCurrentCity()
      setCurrentLocation(currentCity);
      setCities([currentCity]);
    }

    getCurrentLocation();
  }, [])
  
  return (
    <div className="App">
      <ErrorBoundary>
        <Search setSearched={setSearched} cities = {cities} setCities = {setCities}/><br/>
      </ErrorBoundary>
      <Container fluid>
        <Forecast searched={searched} setSearched={setSearched} cities = {cities} setCities = {setCities}/>
      </Container>  
    </div>
  );
}

export default App;
