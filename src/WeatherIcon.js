import React from 'react';
import * as allIcons from 'react-icons/ti';
import { WiFog } from 'react-icons/wi';  

const WeatherIcon = (props) => {
    const icons = {
        Clear: <allIcons.TiWeatherSunny/>,
        Clouds: <allIcons.TiWeatherCloudy/>,
        Rain: <allIcons.TiWeatherDownpour/>,
        Thunderstorm: <allIcons.TiWeatherStormy/>,
        Drizzle: <allIcons.TiWeatherShower/>,
        Fog: <WiFog/>,
        Mist: <WiFog/>
    }
    return(
        <>{icons[props.weather]}</>
    );
};

export default WeatherIcon;
