import React, { useEffect, useState } from 'react';
import Search from '../Search';
import Forecast from '../Forecast';
import { Container } from 'reactstrap';
import { getCurrentCity } from '../helpers/getCurrentLocation';
import FilterDialog from '../MainWindow/FilterDialog';
import { Button } from 'react-bootstrap';

export default function WeatherCardTab() {
    const [searched, setSearched] = useState(false);
    const [cities, setCities] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        async function getCurrentLocation() {
            const currentCity = await getCurrentCity()
            setCities([currentCity]);
        }

        const citiesFromStorage = JSON.parse(sessionStorage.getItem("myCities"));
        if(citiesFromStorage) {
            setCities(citiesFromStorage);
        } else {
            getCurrentLocation();
        }
    
    }, [])

    return (
        <div style={{minHeight: 700}}>
            {cities.length > 0 || searched ? 
            <>
                <Search setSearched={setSearched} searched={searched} cities={cities} setCities={setCities}/><br/>
            </> : null}
            <div style={{marginLeft: '45%'}}>
                <Button onClick={setDialogOpen}>
                    Zmień parametry
                </Button>
            </div>
            <FilterDialog setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} cities={cities} setCities={setCities}/>
            <Container fluid>
                <Forecast searched={searched} setSearched={setSearched} cities = {cities} setCities = {setCities} showDelete={true}/>
            </Container>
        </div>
      );
}