import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { getCurrentGeoLocation } from '../helpers/getCurrentLocation';
import { getAirPolution } from '../helpers/getWeatherApi';
import { toChartData, toMainData } from './toChartData';

export default function SettingsDialog(props) {
    const[searchedCity, setSearchedCity] = useState("");
    const[startDate, setStartDate] = useState(undefined);
    const[endDate, setEndDate] = useState(undefined);

    async function changeData() {
        const geoLocation = await getCurrentGeoLocation(searchedCity);
        const startDateAsDate = new Date(startDate);
        const endDateAsDate = new Date(endDate);
        const airPolution = await getAirPolution(geoLocation.x, geoLocation.y, startDateAsDate.getTime() / 1000, endDateAsDate.getTime() / 1000);
        
        const chartData = toChartData(airPolution);
        const mainDataResults = toMainData(airPolution);

        props.setMainData(mainDataResults);
        sessionStorage.setItem("airPolutionMain", JSON.stringify(mainDataResults));
        props.setData(chartData);
        sessionStorage.setItem("airPolution", JSON.stringify(chartData));
        sessionStorage.setItem("airPolutionParams", JSON.stringify({City: `${searchedCity}`, StartDate: `${startDate}`, EndDate: `${endDate}`}));

        props.setDialogOpen(false);
    }

    return (
        <Modal 
            size="md"
            show={props.dialogOpen}
            onHide={() => props.setDialogOpen(false)}
            aria-labelledby="example-modal-sizes-title-md"
        >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">
            Zmień parametry
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group>
                <Form.Label>Miasto</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={searchedCity}
                        onChange={event => setSearchedCity(event.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Data rozpoczęcia</Form.Label>
                    <Form.Control 
                        type="date" 
                        value={startDate}
                        onChange={event => setStartDate(event.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Data zakończenia</Form.Label>
                    <Form.Control 
                        type="date" 
                        value={endDate}
                        onChange={event => setEndDate(event.target.value)}
                    />
                </Form.Group>
                <Button onClick={ async event => { event.preventDefault(); await changeData(); }}>Szukaj</Button>
            </Form>
        </Modal.Body>
      </Modal>
    )
}