import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Forecast from '../Forecast';
import { getWeather } from '../helpers/getWeatherApi';
import FilterDialog from './FilterDialog';

export default function MainWindow() {
    const [cities, setCities] = useState(["Warszawa", "Kraków", "Gdańsk", "Berlin", "Londyn", "Madryt", "Rzym", "Praga"]);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        async function getWeathers() {
            const citiesWithWeathersPromises = cities.map(async city => await getWeather(city))
            await Promise.all(citiesWithWeathersPromises).then(citiesWithWeathers => {
                setCities(citiesWithWeathers);
                sessionStorage.setItem("mainWindowCities", JSON.stringify(citiesWithWeathers));
            }); 
        }

        const citiesFromStorage = JSON.parse(sessionStorage.getItem("mainWindowCities"));
        if(citiesFromStorage) {
            setCities(citiesFromStorage)
        } else {
            getWeathers();
        }
        
    }, [])

    return(
        <>
            <div style={{marginLeft: '45%', marginTop: 30, marginBottom: 30}}>
                <Button onClick={setDialogOpen}>
                    Zmień parametry
                </Button>
            </div>
            <FilterDialog setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} cities={cities} setCities={setCities}/>
            <Forecast cities={cities} setCities={setCities}/>
        </>
    )
}