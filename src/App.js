import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherCardTab from './WeatherCardsTab/WeatherCardTab';
import { Nav } from 'react-bootstrap';

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
    </Nav>
    {tab === "cards" && <WeatherCardTab/>}

    </>
  );
}

export default App;
