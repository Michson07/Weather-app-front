import React from 'react';
import WeatherIcon from './WeatherIcon';

const WeatherNextDays = (props) => {
    const day = new Date();
    let days = [];
    let weekday = new Array(7);
    weekday[0] = "Niedziela";
    weekday[1] = "Poniedziałek";
    weekday[2] = "Wtorek";
    weekday[3] = "Środa";
    weekday[4] = "Czwartek";
    weekday[5] = "Piątek";
    weekday[6] = "Sobota";

    for(let i = 1; i <= 5; i++)
    {
        let weathers = props.weather?.filter(d => props.checkDate(new Date(d.Date),
                                                                new Date(day.getTime() + 24 * i * 60 * 60 * 1000)))
        if(weathers && weathers.length > 0)
        {
            let TempMax = Math.max.apply(Math, weathers.map((o) => o.TempMax ));
            let TempMin = Math.min.apply(Math, weathers.map((o) => o.TempMin ));
            let Main = weathers[3]?.Main;
            let Day = new Date(weathers[0].Date);

            days.push(
                <tr key={Day}>
                    <td>{weekday[Day.getDay()]}
                        &nbsp;<WeatherIcon weather = {Main}/>
                        <span style={{color: 'red'}}>{TempMax} &#8451; &nbsp;</span>
                        <span style={{color: 'blue'}}>{TempMin} &#8451; &nbsp;</span>
                    </td>
                </tr>
            );
        }
    }
    return(
        <>
        <table style={{marginRight:"auto", marginLeft:"auto"}}>
            <tbody>
                {days}
            </tbody>
        </table>
        </>
    )
}

export default WeatherNextDays;
