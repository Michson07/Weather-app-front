import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherCardTab from './WeatherCardsTab/WeatherCardTab';
import { Nav, Button, Form, Navbar } from 'react-bootstrap';
import MainWindow from './MainWindow/MainWindow';
import AirPolution from './AirPolution/AirPolution';
import ChangeBackgroundDialog from './ChangeBackgroundDialog/ChangeBackgroundDialog';
import Pdf from "./Pomoc.pdf";

function App() {
  const [choice, setChoice] = useState("white");
  const [tab, setTab] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div style={{backgroundColor: choice === "black" ? "#282c34" : null, height: "100%", width: "100%"}}>
      <Navbar bg={choice === "black" ? "dark" : "light"} variant="light">
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link style={{ color: choice === "black" ? "white" : "none" }} onClick={() => setTab("")} disabled={tab === ""}><img width="30" height="30" src="sunicon.webp"/></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link style={{ color: choice === "black" ? "white" : "none" }} onClick={() => setTab("")} disabled={tab === ""}>Strona Glowna</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link style={{ color: choice === "black" ? "white" : "none" }} onClick={() => setTab("cards")} disabled={tab === "cards"}>Moje pogody</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link style={{ color: choice === "black" ? "white" : "none" }} onClick={() => setTab("airPolution")} disabled={tab === "airPolution"}>Stan powietrza</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link style={{ color: choice === "black" ? "white" : "none" }} href={Pdf} target="_blank" style={{color: "rgba(0,0,0,.5)"}}>Pomoc</Nav.Link>
          </Nav.Item>
        </Nav>
        <Form inline>
          <Button onClick={event => { event.preventDefault(); setDialogOpen(!dialogOpen) }}>Zmiana tła</Button>
        </Form>
      </Navbar>

      {tab === "" && <MainWindow/>}
      {tab === "cards" && <WeatherCardTab/>}
      {tab === "airPolution" && <AirPolution/>}
      <ChangeBackgroundDialog setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} choice={choice} setChoice={setChoice}/>
    </div>
  );
}

export default App;
