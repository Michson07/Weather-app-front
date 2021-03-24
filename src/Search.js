import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { getWeather } from './helpers/getWeatherApi';

const Search = (props) => {
    const [location, setLocation] = useState(props.cities.length === 1 ? props.cities[0] : "");
    const [error, setError] = useState("");

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

            if(city.location) {
                let notDuplicatedCities = [];
                if(isDefault) {
                    notDuplicatedCities.push(city);
                } else {
                    notDuplicatedCities = props.cities.filter(c => c.location !== city.location);
                    notDuplicatedCities.push(city);
                }

                props.setCities(notDuplicatedCities);
                sessionStorage.setItem("myCities", JSON.stringify(notDuplicatedCities));
                props.setSearched(true);
                setLocation("");
                setError("");
            } else {
                console.log('ss')
                setError("Nie znaleziono miasta");
            }
        }
        catch(e)
        {
            setError("Wystąpił błąd łączności z serwerem");
        }
    }

    const eventHandler = async (event) => {
        event.preventDefault();
        await getLocationWeather();
    }

    return(
        <form onSubmit={eventHandler}>
            <div style={{width: 800, margin: 'auto', marginTop: 30}}>
            <InputGroup className="mb-3">
                <FormControl
                    type="text"
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    placeholder="Szukaj miasta"
                    required
                />
                <InputGroup.Append>
                    <Button variant="primary">Szukaj</Button>
                </InputGroup.Append>
            </InputGroup>
            </div>
        {error}
        </form>
    )
}

export default Search;