import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = (props) => {
    const [location, setLocation] = useState(props.cities[0]);
    const [error, setError] = useState("");

    useEffect(() => {
        getLocationWeather(true);
    }, [])

    async function getLocationWeather(isDefault = false) {
        try {
            if(!location) {
                return;
            }

            const resp = await axios.get(`/api/forecast/${location}`);
            const city = {
                location: resp.data.City,
                weather: resp.data.Weathers
            };

            if(city.location) {
                if(isDefault) {
                    props.setCities([city]);
                } else {
                    const notDuplicatedCities = props.cities.filter(c => c.location !== city.location);
                    notDuplicatedCities.push(city);
                    props.setCities(notDuplicatedCities);
                }

                props.setSearched(true);
                setLocation("");
                setError("");
            } else {
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
        <input
            type="text"
            value={props.searched ? location : ""}
            onChange={event => setLocation(event.target.value)}
            placeholder="Szukaj miasta"
            required
        />
        <button>Szukaj</button><br/>
        {error}
        </form>
    )
}

export default Search;