import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function FilterDialog(props) {
    const[sortBy, setSortBy] = useState("Nazwie");
    const[direction, setDirection] = useState("rosnąco");

    async function changeData() {
        let newCities = [];
        switch(sortBy) {
            case "Nazwie":
                newCities = props.cities.sort((prev, curr) => prev.location.localeCompare(curr.location));
                break;
            case "Temperaturze dzisiaj":
                newCities = props.cities.sort((prev, curr) => { return prev.weather[0].Temp - curr.weather[0].Temp });
                break;
            case "Ilości opadów":
                newCities = props.cities.sort((prev, curr) => { return prev.weather[0].RainMm - curr.weather[0].RainMm });
                break;
            default:
                newCities = props.cities;
                break;
        }

        newCities = direction === "rosnąco" ? newCities : newCities.reverse();

        props.setCities(newCities);
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
            Sortuj
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group>
                <Form.Label>Posortuj po</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={sortBy}
                        onChange={event => setSortBy(event.target.value)}>
                        <option>Nazwie</option>
                        <option>Temperaturze dzisiaj</option>
                        <option>Ilości opadów</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Kolejność</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={direction}
                        onChange={event => setDirection(event.target.value)}>
                        <option>rosnąco</option>
                        <option>malejąco</option>
                    </Form.Control>
                </Form.Group>
                <Button onClick={ async event => { event.preventDefault(); await changeData(); }}>Szukaj</Button>
            </Form>
        </Modal.Body>
      </Modal>
    )
}