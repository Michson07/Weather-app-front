import React from 'react';
import {
    Card, CardBody,
    CardTitle, Row, Col
  } from 'reactstrap';
import WeatherNextDays from './WeatherNextDays';
import WeatherToday from './WeatherToday';
import { TiDelete } from 'react-icons/ti';
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import { getImageForWeather } from './CardsBackgrounds/backgroundImage';

const Forecast = (props) => {
    const checkDate = (date, today) => {
        const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        return (date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()) || 
            (date.getFullYear() === tomorrow.getFullYear() &&
            date.getMonth() === tomorrow.getMonth() &&
            date.getDate() === tomorrow.getDate() && 
            date.getHours() - 12 <= tomorrow.getHours());
    }

    const onCityDeleteClick = city => {
        const citiesWithoutDeleted = props.cities.filter(w => w.location !== city);
        props.setCities(citiesWithoutDeleted);
        sessionStorage.setItem("myCities", JSON.stringify(citiesWithoutDeleted));
    }

    const checkWeatherDomination = city => {
        const descriptionsArray = city.weather.map(w => w.Description);
        return descriptionsArray.reduce((a, b, i, arr) =>
            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b), null)
    } 

    if(props.cities.length > 0) {
        let cities = props.cities.map(city => {
            return (
            <Col sm="3" key={city.location}>
                {
                    city.location ?
                    <Card style={{backgroundImage: `url(${getImageForWeather(city.weather[0].Main)})`, backgroundSize: 'cover',
                        overflow: 'hidden', textAlign: "center", marginTop: 20, fontWeight: 'bold', height: 600}}>
                        {
                            props.showDelete && props.cities.length > 1 ? 
                            <button className="btn" style={{width: "10%", fontSize: 30}} onClick={() => onCityDeleteClick(city.location)}><TiDelete/></button>
                            : null
                        }
                        <CardBody>
                            <CardTitle style={{fontSize: '35px'}}>{city.location}</CardTitle>
                        </CardBody>
                        <CardSubtitle>
                            W dniu dzisiejszym przewaga: {checkWeatherDomination(city)}
                        </CardSubtitle>
                        <CardBody>
                            <WeatherToday weather = {city.weather} checkDate = {checkDate}/>
                            <WeatherNextDays weather = {city.weather} checkDate = {checkDate}/>
                        </CardBody>
                    </Card> : null
                }
            </Col>
            )
        })

        return (
        <div>
            <Row>
                {cities}
            </Row>
        </div>
        )
    }

    return (
        <div>
            {props.searched && props.cities.length > 0 ? <span>Nie znaleziono miasta</span> : null}
        </div>
    );
}

export default Forecast;
