import React from 'react';
import {
    Card, CardBody,
    CardTitle, Row, Col
  } from 'reactstrap';
import WeatherNextDays from './WeatherNextDays';
import WeatherToday from './WeatherToday';
import {TiDelete} from 'react-icons/ti';
import CardSubtitle from 'reactstrap/lib/CardSubtitle';

const Forecast = (props) => {
    function getHoursDifferenceBetweenDays(date1, date2) {
        return (date1 - date2) / 36e5;
    }

    const checkDate = (date, day) => {
        return ((date.getDate() === day.getDate()) || (date.getDate() === new Date(day.getDate() + 1) && getHoursDifferenceBetweenDays(date, day) < 6)) &&
            date.getMonth() === day.getMonth() &&
            date.getFullYear() === day.getFullYear()
    }

    const onCityDeleteClick = city => {
        props.setCities(props.cities.filter(w => w.location !== city));
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
                    <Card style={{backgroundColor: 'lightcyan'}}>
                        {
                            props.showDelete ? 
                            <button className="btn" style={{"width": "10%", "fontSize": "30px"}} onClick={() => onCityDeleteClick(city.location)}><TiDelete/></button>
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
