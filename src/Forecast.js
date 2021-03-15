import React from 'react';
import {
    Card, CardBody,
    CardTitle, CardSubtitle, Row, Col
  } from 'reactstrap';
import WeatherNextDays from './WeatherNextDays';
import WeatherToday from './WeatherToday';
import {TiDelete} from 'react-icons/ti';
  
const Forecast = (props) => {
    const checkDate = (date, day) => {
        return date.getDate() === day.getDate() &&
            date.getMonth() === day.getMonth() &&
            date.getFullYear() === day.getFullYear()
    }

    const onCityDeleteClick = (city) => {
        props.setCities(props.cities.filter(w => w.location !== city));
        
        if(props.cities.length) {
            props.setSearched(false);
        }
    }

    if(props.cities.length) {
        let cities = props.cities.map(city => {
            return (
            <Col sm="3" key={city.location}>
                <Card style={{backgroundColor: 'lightcyan'}}>
                    <button className="btn" style={{"width": "10%", "fontSize": "30px"}} onClick={() => onCityDeleteClick(city.location)}><TiDelete/></button>
                    <CardBody>
                        <CardTitle style={{fontSize: '35px'}}>{city.location}</CardTitle>
                    </CardBody>
                    <CardBody>
                        <WeatherToday weather = {city.weather} checkDate = {checkDate}/>
                        <WeatherNextDays weather = {city.weather} checkDate = {checkDate}/>
                    </CardBody>
                </Card>
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
            {props.searched ? <span style={{color: "red"}}>Nie znaleziono miasta</span> : null}
        </div>
    );
}

export default Forecast;
