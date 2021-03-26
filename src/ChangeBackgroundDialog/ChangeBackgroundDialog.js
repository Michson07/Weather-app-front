import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function ChangeBackgroundDialog(props) {
    const [whiteMouseDown, setWhiteMouseDown] = useState(false);
    const [blackMouseDown, setBlackMouseDown] = useState(false);

    return (
        <Modal 
            size="lg"
            show={props.dialogOpen}
            onHide={() => props.setDialogOpen(false)}
            aria-labelledby="example-modal-sizes-title-md"
        >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">
            Zmień tło
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>
            <div onClick={() => props.setChoice("white")} onMouseOver={() => setWhiteMouseDown(!whiteMouseDown)} onMouseOut={() => setWhiteMouseDown(!whiteMouseDown)} style={{cursor: whiteMouseDown ? "pointer" : null, zoom: whiteMouseDown ? 1.1 : null}}>
                <img src="whiteBackground.png"/><br/>
                Biały (standardowy)<br/>
            </div>
            <br/>
            <div onClick={() => props.setChoice("black")} onMouseOver={() => setBlackMouseDown(!blackMouseDown)} onMouseOut={() => setBlackMouseDown(!blackMouseDown)} style={{cursor: blackMouseDown ? "pointer" : null, zoom: blackMouseDown ? 1.1 : null}}>
                <img src="blackBackground.png"/><br/>
                Ciemny
            </div>
        </Modal.Body>
      </Modal>
    )
}