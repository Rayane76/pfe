'use client'
import "../../styles/navbar.css"
import { FaBars } from "react-icons/fa";
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Navbar(){
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    return(
        <>
         <div className="navbar">
           <div className="logoDiv">
              <h1>NomProjet</h1>
           </div>
           <div className="navBtnsDiv">
             <a href="/" className="navBtn navBtnMrg">Home</a>
             <a href="/contact" className="navBtn navBtnMrg">Contact</a>
             <a href="/register" className="navBtn">Register</a>
             <FaBars className="menuIcon" onClick={handleShow} />
             <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
           <div className="canvasBtnsDiv">
             <a href="/" className="navBtnCanvas">Home</a>
             <a href="/contact" className="navBtnCanvas">Contact</a>
             <a href="/register" className="navBtnCanvas">Register</a>
            </div> 
        </Offcanvas.Body>
      </Offcanvas>
           </div>
         </div>
        </>
    )
}