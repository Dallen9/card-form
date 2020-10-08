import React, {useState, useEffect} from 'react'
import {Button, Modal} from 'react-bootstrap';
import html2canvas from 'html2canvas';

const Success = ({onSubmit, name, notValid}) => {

    const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const refreshPage = () => {
      window.location.reload(false);
    }

    const downloadImage = () => {
      let container = document.getElementById("FrontSide"); 

      html2canvas(container, {
        height: window.outerHeight + window.innerHeight, 
      }).then(function (canvas) {

          let link = document.createElement("a");
          document.body.appendChild(link);
          link.download = `${name}'s-card.png`;
          link.href = canvas.toDataURL();
          link.click();

          document.body.removeChild(link);

      });
    }

    
    useEffect(() => {
      if(onSubmit) {
        handleShow();
      }
    }, [onSubmit])

    return (
        <>
        <Modal
          show={show}
          onHide={refreshPage}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Congratulations {name}, you have successfully created your new credit card.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Would you like to save your newly custom designed credit card?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={downloadImage}>
              Save
            </Button>
            <Button onClick={refreshPage} variant="secondary" >
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default Success
