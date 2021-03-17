import React, { useEffect, useState } from 'react';
import Search from '../Search';
import Forecast from '../Forecast';
import { Container } from 'reactstrap';
import { getCurrentCity } from '../helpers/getCurrentLocation';

export default function WeatherCardTab() {
    const [searched, setSearched] = useState(false);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        async function getCurrentLocation() {
        const currentCity = await getCurrentCity()
        setCities([currentCity]);
        }

        getCurrentLocation();
    }, [])

    return (
        <div className="App">
            {cities.length > 0 || searched ? <><Search setSearched={setSearched} searched={searched} cities = {cities} setCities = {setCities}/><br/></> : null}
            <Container fluid>
                <Forecast searched={searched} setSearched={setSearched} cities = {cities} setCities = {setCities} showDelete={true}/>
            </Container>
        </div>
      );
}