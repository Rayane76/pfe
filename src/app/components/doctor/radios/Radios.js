"use client";
import "../../../styles/doctor/patient/radios.css";
import DocumentSvg from "@/app/utils/svg/documentSvg";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import AddModal from "./AddModal";
import AddDemandeeModal from "./AddDemandeeModal";



export default function Radios() {


  const radios = [
    {
      nom: "Radio1",
      date: "14-12-2018",
      demande: false,
      type: "irm",
      categorie: "Vasculaire",
      document: "test.pdf",
      rapport: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      centre: "YAKER"
    },
    {
      nom: "Radio2",
      date: "05-11-2020",
      demande: false,
      type: "scanner",
      categorie: "Thorax-Abdomen-Pelvis",
      document: "test.pdf",
      rapport: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like",
      centre: "MASSINISSA"
    },
    {
      nom: "Radio3",
      date: "12-01-2023",
      demande: false,
      type: "radiologie",
      categorie: "Thorax-Abdomen-Pelvis",
      document: "test.pdf",
      rapport: "",
      centre: "MASSINISSA"
    },
    {
      nom: "Radio4",
      date: "12-04-2024",
      demande: true,
      type: "echographie",
      categorie: "Thorax-Abdomen-Pelvis",
      document: "",
      rapport: "",
      centre: "DR. Hammou Ilyas",
    }
  
  
  ];

  radios.sort((a, b) => {
    // Convert dates to Date objects for comparison
    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    // Sort in descending order (most recent first)
    return dateB - dateA;
  });

  const uniqueCategories = [...new Set(radios.map((radio) => radio.demande === false && radio.categorie))];
  const filteredArrayCats = uniqueCategories.filter(item => item !== false);
  const uniqueTypes = [...new Set(radios.map((radio)=> radio.demande === false && radio.type))];
  const filteredArrayTypes = uniqueTypes.filter(item => item !== false);
  const [modalShowRadio, setModalShowRadio] = useState(false);
  const [modalShowAdd, setModalShowAdd] = useState(false);


  const[filteredCat,setFilteredCat] = useState(undefined);
  const[filteredType,setFilteredType] = useState(undefined);
  const[selectedRadio,setSelectedRadio] = useState(null);

  const handleChangeFilterCat = (e)=>{
    setFilteredCat(e.target.innerText);
}

const handleChangeFilterType = (e)=>{
   setFilteredType(e.target.innerText);
}

const handleClickRadio = (e,radio) =>{
   setModalShowRadio(true);
   setSelectedRadio(radio);
}


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modalOfHistorique"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {selectedRadio != null && selectedRadio.nom}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalDiv">
          <div className="modalBodyDiv1">
            <h5>{selectedRadio != null && "Ajoute par : " + selectedRadio.centre}</h5>
            <h5>{selectedRadio != null && "le : " + selectedRadio.date}</h5>
            <h5>{selectedRadio != null && "Type : " + selectedRadio.type}</h5>
            <h5>{selectedRadio != null && "Categorie : " + selectedRadio.categorie}</h5>
            {selectedRadio != null && selectedRadio.rapport!="" && 
            <>
            <h5>Rapport : </h5>
            <p>{selectedRadio.rapport}</p>
            </>
            }
          </div>
          <div className="modalBodyDiv2">
          {selectedRadio != null && 
          <embed
              src={"/" + selectedRadio.document}
              type="application/pdf"
              width="100%"
              height="100%"
            />
          }
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


const [activeDiv,setActiveDiv] = useState("realises");

  
  const handleSwitch = (e, selected, button, otherBtn) => {
    e.preventDefault();
    const clickedOne = document.getElementById(selected);
    const activeOne = document.getElementsByClassName("activeOneInRadios");
    const selectedbtn = document.getElementById(button);
    const notSelected = document.getElementById(otherBtn);
    const nvBtn = document.getElementById("nouveauBtnRadios");
    setActiveDiv(selected);
    if(selected != 'realises'){
       nvBtn.style.display = 'none'
    }
    else{
      nvBtn.style.display = 'flex';
    }

    if (clickedOne.classList.contains("unActive")) {
      activeOne[0].classList.add("unActive");
      activeOne[0].classList.remove("activeOneInRadios");
      clickedOne.classList.remove("unActive");
      clickedOne.classList.add("activeOneInRadios");

      selectedbtn.classList.toggle("activeHistoriqueBtn");
      selectedbtn.classList.toggle("notActiveHistoriqueBtn");

      notSelected.classList.toggle("activeHistoriqueBtn");
      notSelected.classList.toggle("notActiveHistoriqueBtn");
      setFilteredCat(undefined);
      setFilteredType(undefined);
    }
  };

  const [modalAddDemande,setModalAddDemande] = useState(false);

  const handleAddDemandee = (e,radio) =>{
     setSelectedRadio(radio);
     setModalAddDemande(true);
  }
  
  return (
    <>
      <div className="radiosDiv">
      <div className="radiosDivTitleDiv">
        <div className="d-flex justify-content-center align-items-center">
        <DocumentSvg />
        <h1 className="radiosDivTitle">Radios</h1>
        </div>
        <button
          onClick={() => setModalShowAdd(true)}
          title="Add"
          className="cssbuttons-io-button"
          id="nouveauBtnRadios"
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
        <AddModal modalShowAdd={modalShowAdd} setModalShowAdd={setModalShowAdd}   />
      </div>
      <div className="historiquebtnsDiv">
        <button
          id="realisesBtn"
          onClick={(e) =>
            handleSwitch(
              e,
              "realises",
              "realisesBtn",
              "demandesBtn"
            )
          }
          className="historiqueBtns activeHistoriqueBtn"
        >
          Realisées
        </button>
        <button
          id="demandesBtn"
          onClick={(e) =>
            handleSwitch(e, "demandes", "demandesBtn", "realisesBtn")
          }
          className="historiqueBtns notActiveHistoriqueBtn"
        >
          Demandées
        </button>
      </div>
      {activeDiv === "realises" && 
      <div className="radiosFilterDiv">
      <Autocomplete
      disablePortal
      onChange={(e)=>handleChangeFilterType(e)}
      // className="medecinFilter"
      id="combo-box-demo1"
      options={filteredArrayTypes}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Type" />}
    />

      <Autocomplete
      disablePortal
      onChange={(e)=>handleChangeFilterCat(e)}
      id="combo-box-demo"
      options={filteredArrayCats}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Categorie" />}
    />
      </div>
      }

      <div id="realises" className="allRadiosDiv activeOneInRadios">
      <div className="tableTitleDivPersonnel">
          <label className="tableTitleLabel">Nom</label>
          <label className="tableTitleLabel">Date</label>
          <label className="tableTitleLabel">Type</label>
          <label className="tableTitleLabell">Catégorie</label>
        </div>
        <div className="tableRowsPersonnel">
          { filteredCat === undefined && filteredType === undefined ?
            radios.map((radio,index)=>{
            if(radio.demande === false){  
            return(
              <div onClick={(e)=>handleClickRadio(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.type}</label>
            <label className="labellast">{radio.categorie}</label>
          </div>
            )
            }
          }) :
          filteredCat != undefined && filteredType === undefined ?
          radios.map((radio,index)=>{
            if(radio.categorie === filteredCat && radio.demande === false){
            return(
              <div onClick={(e)=>handleClickRadio(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.type}</label>
            <label className="labellast">{radio.categorie}</label>
          </div>
            )
            }
          }) : 
          filteredCat === undefined && filteredType != undefined ?
          radios.map((radio,index)=>{
            if(radio.type === filteredType && radio.demande === false){
            return(
              <div onClick={(e)=>handleClickRadio(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.type}</label>
            <label className="labellast">{radio.categorie}</label>
          </div>
            )
            }
          }) : 
          radios.map((radio,index)=>{
            if(radio.type === filteredType && radio.categorie === filteredCat && radio.demande === false){
            return(
              <div onClick={(e)=>handleClickRadio(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.type}</label>
            <label className="labellast">{radio.categorie}</label>
          </div>
            )
            }
          }) 
          }
        </div>
      </div>
      
      <div id="demandes" className="allRadiosDiv unActive">
      <div className="tableTitleDivPersonnel">
          <label className="tableTitleLabel">Nom</label>
          <label className="tableTitleLabel">Date</label>
          <label className="tableTitleLabel">Type</label>
          <label className="tableTitleLabell">Catégorie</label>
        </div>
        <div className="tableRowsPersonnel">
        {radios.map((radio,index)=>{
            if(radio.demande === true){  
            return(
              <div onClick={(e)=>handleAddDemandee(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.type}</label>
            <label className="labellast">{radio.categorie}</label>
          </div>
            )
            }
          })
        }
        </div>
      </div>

      <MyVerticallyCenteredModal
        show={modalShowRadio}
        onHide={() => setModalShowRadio(false)}
      />
      <AddDemandeeModal modalAddDemande={modalAddDemande}  setModalAddDemande={setModalAddDemande}  radio={selectedRadio} />
      </div>
    </>
  );
}
