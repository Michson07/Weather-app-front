import React, { useEffect, useState } from 'react';
import Forecast from '../Forecast';
import { getWeather } from '../helpers/getWeatherApi';

export default function MainWindow() {
    const [cities, setCities] = useState(["Warszawa", "Kraków", "Gdańsk", "Berlin", "Londyn", "Madryt", "Rzym", "Praga"]);
    
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
            <Forecast cities={cities} setCities={setCities}/>
        </>
    )
}