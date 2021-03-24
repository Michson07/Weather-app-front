import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherCardTab from './WeatherCardsTab/WeatherCardTab';
import { Nav } from 'react-bootstrap';
import MainWindow from './MainWindow/MainWindow';
import AirPolution from './AirPolution/AirPolution';

function App() {
  const [tab, setTab] = useState("");

  return (
    <>
    <Nav variant="tabs">
      <Nav.Item>
        <Nav.Link onClick={() => setTab("")} disabled={tab === ""}><img src="mainwindow.jpg"/></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => setTab("")} disabled={tab === ""}>Strona Glowna</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => setTab("cards")} disabled={tab === "cards"}>Moje pogody</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => setTab("airPolution")} disabled={tab === "airPolution"}>Stan powietrza</Nav.Link>
      </Nav.Item>
    </Nav>
    {tab === "" && <MainWindow/>}
    {tab === "cards" && <WeatherCardTab/>}
    {tab === "airPolution" && <AirPolution/>}
    </>
  );
}

export default App;
