'use client'
import { useEffect, useRef, useState } from "react";
import "../styles/reg.css";
import axios from "axios";
import { useRouter } from "next/navigation";


function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters[randomIndex];
    }
  
    return result;
  }

export default function RegisterHealthCare() {

    const [currentStep, setCurrentStep] = useState(0);

    const router = useRouter();


    const [allInfos,setAllInfos] = useState({
        first_name: "",  //medecin
        last_name: "",   //medecin
        nom: "",       //labo
        email: "",    
        numero_tel: "",
        address: "",
        carte_id: "",   //medecin
        password: "",
        role:"",
        certificat: "",
        specialite: "",   //medecin
        isValide: false,
    })

    const handleInput = (e) => {
        setAllInfos((prev)=>({...prev,[e.target.name]:e.target.value}));
      }

      const [cfrm,setCfrm] = useState("");

      const [fil,setFil]= useState(null);

      function getCurrentDateFormatted() {
        const today = new Date();
      
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JavaScript
        const year = today.getFullYear();
      
        return `${day}${month}${year}`;
      }

      const date = getCurrentDateFormatted();

      const randomString = useRef(generateRandomString(10));


      const handleChangeCertificat = (e) => {

        
        setAllInfos((prev)=>({...prev,certificat:randomString.current + date + e.target.files[0].name}));
        setFil(e.target.files[0]);
      }

    const medecinSteps = [
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Nom : </label>
          <input required name="last_name" className="input" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Prénom : </label>
          <input required name="first_name" className="input" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Email : </label>
          <input required name="email" type="email" className="input" onChange={(e)=>handleInput(e)} />
        </div>
      </div>,
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Adresse : </label>
          <input required={currentStep === 1 ? true : false} name="address" className="input" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Numéro de téléphone : </label>
          <input  required={currentStep === 1 ? true : false}  name="numero_tel" className="input" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Spécialité : </label>
          <input  required={currentStep === 1 ? true : false}  name="specialite" className="input" onChange={(e)=>handleInput(e)} />
        </div>
      </div>,
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Diplome : </label>
          <input required={currentStep === 2 ? true : false}  name="certificat" className="input" type="file" onChange={(e)=>handleChangeCertificat(e)} />
        </div>
      </div>,
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Numéro d'identification national : </label>
          <input required={currentStep === 3 ? true : false} name="carte_id" className="input" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Mot de passe : </label>
          <input type="password" required={currentStep === 3 ? true : false} onChange={(e)=>handleInput(e)} name="password" className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Confirmer mot de passe : </label>
          <input type="password" required={currentStep === 3 ? true : false} onChange={(e)=>setCfrm(e.target.value)} className="input" />
        </div>
      </div>
    ];


    
    const laboSteps = [
        <div className="inputStep">
          <div className="oneInputDiv">
            <label className="label">Nom : </label>
            <input required name="nom" className="input" onChange={(e)=>handleInput(e)} />
          </div>
          <div className="oneInputDiv">
            <label className="label">Email : </label>
            <input required name="email" type="email" className="input" onChange={(e)=>handleInput(e)} />
          </div>
        </div>,
    
        <div className="inputStep">
          <div className="oneInputDiv">
            <label className="label">Adresse : </label>
            <input required={currentStep === 1 ? true : false} name="address" className="input" onChange={(e)=>handleInput(e)} />
          </div>
          <div className="oneInputDiv">
            <label className="label">Numéro de téléphone : </label>
            <input  required={currentStep === 1 ? true : false}  name="numero_tel" className="input" onChange={(e)=>handleInput(e)} />
          </div>
        </div>,
    
        <div className="inputStep">
          <div className="oneInputDiv">
          <label className="label">Certificat : </label>
          <input required={currentStep === 2 ? true : false}  name="certificat" className="input" type="file" onChange={(e)=>handleChangeCertificat(e)} />
        </div>
        </div>,
    
        <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Mot de passe : </label>
          <input type="password" required={currentStep === 3 ? true : false} onChange={(e)=>handleInput(e)} name="password" className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Confirmer mot de passe : </label>
          <input type="password" required={currentStep === 3 ? true : false} onChange={(e)=>setCfrm(e.target.value)} className="input" />
        </div>
        </div>
      ];




      const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentStep < medecinSteps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
        else{
          if(allInfos.password === cfrm){
            const formData = new FormData();
            formData.append("file",fil);
            formData.append("random",randomString.current);
           await axios.post(
            "/api/users/addDocument",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }).then(async (res)=>{
                if(res.data.success === true){
                    let url = ""
                    if(allInfos.role === "medecin"){
                     url = "/api/users/medecin/createMedecin"
                    }
                    else if(allInfos.role === "labo"){
                        url = "/api/users/labo/createLabo"
                    }
                    else if (allInfos.role === "centre"){
                        url = "/api/users/centre/createCentre"
                    }
                    await axios
                    .post(url,{allInfos : allInfos})
                    .then((res)=>{
                                if(res.data.success === true){
                                  alert("Demande enregistre avec success ! Vous pouvez utiliser le compte une fois il sera valide")  
                                  router.push('/');
                                }
                                else{
                                  console.log(res);
                                }
                          }).catch((err)=>{
                            console.log('err',err)
                          })
                }
                else{
                    console.log(res);
                }
            }).catch((e)=>{
                console.log(e);
            })
        }
        else{

        }
      }
    }
    
      const handleBack = (e) => {
        e.preventDefault();
        if (currentStep > 0) {
          setCurrentStep(currentStep - 1);
        }
      };


  return (
    <div className="regPage">
      <div className="progressBar">
        <div className="pBarSteps">
          <div className="stepTitle">
          Nom
          <div className={currentStep >= 1 ? "step activeStep" : "step"}>1</div>
          </div>
          <div  className="stepTitle">
          Contact
          <div className={currentStep >= 2 ? "step activeStep" : "step"}>2</div>
          </div>
          <div className="stepTitle">
          Certificat
          <div className={currentStep >= 3 ? "step activeStep" : "step"}>3</div>
          </div>
          <div className="stepTitle">
          Soumettre
          <div className="stepl">4</div>
          </div>
        </div>
      </div>



     <form onSubmit={(e)=>handleSubmit(e)}>
      <div className="regDiv">
        
        <h1 className="ttl">Inscription</h1>

        <div className="oneInputDiv">
            <label className="label">Choisir specialite : </label>
            <select required name="role" value={allInfos.role} className="input" onChange={(e)=>{setAllInfos({
        first_name: "",  //medecin
        last_name: "",   //medecin
        nom: "",       //labo
        email: "",    
        numero_tel: "",
        address: "",
        carte_id: "",   //medecin
        password: "",
        role: e.target.value,
        certificat: "",
        specialite: "",   //medecin
        isValide: false,
            })}}>
            <option value="" hidden>Choisir specialite : </option>
            <option value="medecin">Medecin</option>
            <option value="labo">Laboratoire d'analyses</option>
            <option value="centre">Centre d'imagerie</option>
          </select>
            </div>


        {allInfos.role === "" ? "" 
        : 
        allInfos.role === "medecin" ? 
        medecinSteps.map((step, index) => (
        <div key={index} className={`inputStep ${index === currentStep ? 'inStep' : 'notInStep'}`}>
          {step}
        </div>
      ))
       : 
       laboSteps.map((step, index) => (
        <div key={index} className={`inputStep ${index === currentStep ? 'inStep' : 'notInStep'}`}>
          {step}
        </div>
      ))
        }


        <div className="buttonsDiv">
          <button onClick={handleBack} disabled={currentStep === 0} className="retourBtn">Retour</button>
          <button type="submit" className="continuerBtn">
          {currentStep === medecinSteps.length -1 ? "Submit" : "Continuer"}
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}
