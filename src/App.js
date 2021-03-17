import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherCardTab from './WeatherCardsTab/WeatherCardTab';
import { Nav } from 'react-bootstrap';
import MainWindow from './MainWindow/MainWindow';

function App() {
  const [tab, setTab] = useState("");

  return (
    <>
    <Nav variant="tabs">
      <Nav.Item>
        <Nav.Link onClick={() => setTab("")} disabled={tab === ""}>Strona Glowna</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => setTab("cards")} disabled={tab === "cards"}>Moje pogody</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => setTab("cards")} disabled={tab === "cards"}>Historia</Nav.Link>
      </Nav.Item>
    </Nav>
    {tab === "" && <MainWindow/>}
    {tab === "cards" && <WeatherCardTab/>}
    </>
  );
}

export default App;
