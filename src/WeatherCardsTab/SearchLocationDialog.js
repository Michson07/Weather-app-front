import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { possibleCountries, suggestedForCountry } from './findLocation';

export default function SearchLocationDialog(props) {
    const [searchedCountry, setSearchedCountry] = useState("");
    const [searchedCity, setSearchedCity] = useState("");

    async function changeData() {
        props.setLocation(searchedCity);
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
            Szukaj miasta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group>
                <Form.Label>Państwo</Form.Label>
                    <Typeahead
                        value={searchedCountry}
                        onChange={selected => { setSearchedCountry(selected[0]) }}
                        onInputChange={setSearchedCountry}
                        options={possibleCountries}
                    />
                </Form.Group>
                <br/><br/>
                <Form.Group>
                    <Form.Label>Miasto (obowiązkowe)</Form.Label>
                    <Typeahead
                        value={searchedCity}
                        onChange={selected => setSearchedCity(selected[0])}
                        onInputChange={setSearchedCity}
                        options={suggestedForCountry(searchedCountry)}
                    />
                </Form.Group>
                <br/><br/>
                <Button onClick={ async event => { event.preventDefault(); await changeData(); }}>Szukaj</Button>
            </Form>
        </Modal.Body>
      </Modal>
    )
}