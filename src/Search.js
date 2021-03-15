import React, { useState } from 'react';
import axios from 'axios';

const Search = (props) => {
    const [location, setLocation] = useState([]);
    const [error, setError] = useState(false);
    const eventHandler = async (event) => {
        try {
            event.preventDefault();
            const resp = await axios.get(`/api/forecast/${location}`);
            let city = {
                location: resp.data.City,
                weather: resp.data.Weathers
            };
            props.setCities(props.cities.filter(c => c.location !== city.location))
            if(city.location !== undefined)
            {
                props.setCities(previous => [...previous, city]);
            }
            props.setSearched(true);
            setLocation("");
            setError(false);
        }
        catch(e)
        {
            setError(true);
        }
    }
console.log(props)
    return(
        <form onSubmit={eventHandler}>
        <input 
            type="text" 
            value={location}
            onChange={event => setLocation(event.target.value)}
            placeholder="Szukaj miasta" 
            required 
        />
        <button>Szukaj</button><br/>
        {error ? <span>Wystąpił błąd łączności z serwerem</span> : null}
        </form>
        
    )
}

export default Search;