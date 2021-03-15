import React from 'react';
import WeatherIcon from './WeatherIcon';

const WeatherToday = (props) => {
    const day = new Date();
    const nextHours = props.weather ? props.weather.filter(d => props.checkDate(new Date(d.Date), day)).map((w) =>
    {
        const hour = new Date(w.Date).getHours() === day.getUTCHours() + 2 ? 'Teraz' : new Date(w.Date).getHours();
        return(
            <td key={w.Date}>
                <WeatherIcon weather = {w.Main}/> 
                {w.Temp}&#8451;<br/> 
                {hour}
            </td>
        )
    }) : null

    return(
        <>
        {
            nextHours ? 
                <div>
                    <table style={{marginRight:"auto", marginLeft:"auto"}}>
                        <tbody>
                            <tr>
                                {nextHours}
                            </tr>
                        </tbody>
                    </table> 
                    Temperatura minimalna: {props.weather[0].TempMin} &#8451;<br/>
                    Temperatura maksymalna: {props.weather[0].TempMax} &#8451;<br/>
                    Temperatura odczuwalna: {props.weather[0].FeelsLike} &#8451;<br/>
                    Ciśnienie: {props.weather[0].Pressure} hPa<br/>
                    Prędkość wiatru: {props.weather[0].WindSpeed} km/h<br/>
                    Deszcz: {props.weather[0].RainMm} mm <br/><br/>
                </div> : null
        }
        </>
    )
};

 export default WeatherToday;
