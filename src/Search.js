import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getWeather } from './helpers/getWeatherApi';
import SearchLocationDialog from './WeatherCardsTab/SearchLocationDialog';

const Search = (props) => {
    const [location, setLocation] = useState(props.cities.length >= 1 ? props.cities[0] : "");
    const [error, setError] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const citiesFromStorage = JSON.parse(sessionStorage.getItem("myCities"));
        if(!citiesFromStorage) {
            getLocationWeather(true);
        }
    }, [])

    async function getLocationWeather(isDefault = false) {
        try {
            if(!location) {
                return;
            }

            const city = await getWeather(location);

            if(isDefault || location != props.cities[0]) {
                if(city.location) {
                    let notDuplicatedCities = [];
                    if(isDefault) {
                        notDuplicatedCities.push(city);
                    } else {
                        notDuplicatedCities = props.cities.filter(c => c.location !== city.location);
                        notDuplicatedCities.push(city);
                    }
    
                    notDuplicatedCities = notDuplicatedCities.filter(c => c.location);
                    props.setCities(notDuplicatedCities);
                    sessionStorage.setItem("myCities", JSON.stringify(notDuplicatedCities));
                    props.setSearched(!props.searched);
                    setLocation("");
                    setError("");
                }
                else {
                    setError("Nie znaleziono miasta");
                }
            } 
        }
        catch(e)
        {
            setError("Wystąpił błąd łączności z serwerem");
        }
    }

    useEffect(() => {
        getLocationWeather();
    }, [location])

    return(
        <div style={{marginLeft: '46%', marginTop: 30}}>
                <Button onClick={setDialogOpen}>
                    Szukaj miasta
                </Button>
                <br/><p style={{color: 'red'}}>{error}</p>
            <SearchLocationDialog setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} location={location} setLocation={setLocation}/>
        </div>
    )
}

export default Search;