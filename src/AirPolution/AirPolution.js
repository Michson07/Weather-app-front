import React, { useEffect, useState } from 'react';
import { getCurrentLocation } from '../helpers/getCurrentLocation';
import { getAirPolution } from '../helpers/getWeatherApi';
import { Doughnut, Line, Bar } from '@reactchartjs/react-chart.js'
import SettingsDialog from './SettingsDialog';
import { Button, Card, ListGroup } from 'react-bootstrap'
import { toChartData, toMainData } from './toChartData';

export default function AirPolution() {
    const [data, setData] = useState({});
    const [mainData, setMainData] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        async function getData() {
            const geoLocation = await getCurrentLocation();
            const airPolution = await getAirPolution(geoLocation.x, geoLocation.y);

            const chartData = toChartData(airPolution);
            setData(chartData);

            const mainDataResults = toMainData(airPolution);
            setMainData(mainDataResults);
        }

        const airPolutionMainFromStorage = JSON.parse(sessionStorage.getItem("airPolutionMain"));
        const airPolutionFromStorage = JSON.parse(sessionStorage.getItem("airPolution"));
        
        if(airPolutionMainFromStorage && airPolutionFromStorage) {
            setData(airPolutionFromStorage);
            setMainData(airPolutionMainFromStorage);
        } else {
            getData();
        }
        
    }, [])

    const options = {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day'
                }
            }],
            yAxes: [
            {
                type: 'linear',
                display: true,
                position: 'left',
            }]
        },
        responsive: true
    }

    return(
        <div style={{minHeight: 1000}}>
            <div style={{marginLeft: '45%', marginTop: 30, marginBottom: 30}}>
                <Button onClick={setDialogOpen}>
                    Zmień parametry
                </Button>
            </div>
            <SettingsDialog 
                setData={setData}
                setMainData={setMainData}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
            />
            <div>
                { data &&
                    <>
                    {
                        JSON.parse(sessionStorage.getItem("airPolutionParams")) ? 
                        <div>
                            <Card style={{ width: '18rem', position: 'fixed', marginTop: '10%' }}>
                                <Card.Header>Aktualne parametry</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Miasto: {JSON.parse(sessionStorage.getItem("airPolutionParams")).City}</ListGroup.Item>
                                    <ListGroup.Item>Data rozpoczęcia: {JSON.parse(sessionStorage.getItem("airPolutionParams")).StartDate}</ListGroup.Item>
                                    <ListGroup.Item>Data zakończenia: {JSON.parse(sessionStorage.getItem("airPolutionParams")).EndDate}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </div> : null
                    }
                        <div style={{width: 800, height: 400, margin: 'auto'}}>
                            {JSON.parse(sessionStorage.getItem("airPolutionParams")) ? 
                                <>
                                    <Line 
                                        data={data} 
                                        options={options}
                                    />
                                    <br/><br/>
                                    <Doughnut
                                        data={mainData} 
                                    />
                                </> : 
                                <>
                                    <Bar 
                                        data={data} 
                                    />
                                    <Doughnut
                                        data={mainData} 
                                    />
                                </>
                            }
                            
                        </div>
                    </>
                }
            </div>
        </div>
    )
}