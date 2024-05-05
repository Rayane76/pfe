"use client";
import { useState } from "react";
import "../../../styles/doctor/patient/radios.css";
import DocumentSvg from "@/app/utils/svg/documentSvg";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalAddAnalyse from "./ModalAddAnalyse";

export default function Analyses({patient_id}) {
  const analyses = [
    {
      nom: "Analyse1",
      date: "14-01-2018",
      document: "test.pdf",
      centre: "Bisker",
    },
    {
      nom: "Analyse2",
      date: "21-02-2020",
      document: "test.pdf",
      centre: "NomCentre",
    },
  ];

  analyses.sort((a, b) => {
    // Convert dates to Date objects for comparison
    const dateA = new Date(a.date.split("-").reverse().join("-"));
    const dateB = new Date(b.date.split("-").reverse().join("-"));
    // Sort in descending order (most recent first)
    return dateB - dateA;
  });

  const uniqueNoms = [...new Set(analyses.map((analyse) => analyse.nom))];

  const [filteredNom, setFilteredNom] = useState(undefined);
  const [selectedAnalyse,setSelectedAnalyse] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const handleChangeFilterNom = (e) => {
    setFilteredNom(e.target.innerText);
  };

  const handleClickAnalyse = (e,analyse)=>{
     setModalShow(true);
     setSelectedAnalyse(analyse);
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {selectedAnalyse != null && selectedAnalyse.nom}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div className="analyseModalDiv">
             {selectedAnalyse != null && 
              <embed
              src={"/" + selectedAnalyse.document}
              type="application/pdf"
              width="100%"
              height="100%"
            />
             
             }
           </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [showModalAdd,setShowModalAdd] = useState(false);


  return (
    <>
      <div className="radiosDiv">
        <div className="radiosDivTitleDiv">
          <div className="d-flex justify-content-center align-items-center">
          <DocumentSvg />
          <h1 className="radiosDivTitle">Analyses</h1>
          </div>
          <button
           onClick={() => setShowModalAdd(true)}
          title="Add"
          className="cssbuttons-io-button"
        >
          <svg
            height="25"
            width="25"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
              fill="currentColor"
            ></path>
          </svg>
          <span>Nouveau</span>
        </button>
        </div>
        <ModalAddAnalyse showModalAdd={showModalAdd} setShowModalAdd={setShowModalAdd} patient_id={patient_id} />
        <div className="analysesFilterDiv">
          <Autocomplete
            disablePortal
            onChange={(e) => handleChangeFilterNom(e)}
            id="combo-box-demo1"
            options={uniqueNoms}
            autoHighlight
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Nom" />}
          />
        </div>
        <div className="allRadiosDiv">
          <div className="tableTitleDivAnalyses">
            <label className="tableTitleLabel">Nom</label>
            <label className="tableTitleLabell">Date</label>
          </div>
          <div className="tableRowsAnalyses">
            {analyses.map((analyse,index)=>{
              if(filteredNom === analyse.nom || filteredNom === undefined){
              return(
              <div onClick={(e)=>handleClickAnalyse(e,analyse)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{analyse.nom}</label>
            <label className="labelRowPers1">{analyse.date}</label>
          </div>
              )
              }
            })}
          </div>
        </div>
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      </div>
    </>
  );
}
