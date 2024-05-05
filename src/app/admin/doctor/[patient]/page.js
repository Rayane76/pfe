'use client'
import GeneralInfos from "@/app/components/doctor/generalInfos/GeneralInfos";
import "../../../styles/doctor/patient/all.css"
import Radios from "@/app/components/doctor/radios/Radios";
import Analyses from "@/app/components/doctor/analyses/Analyses";
import History from "@/app/components/doctor/history/History";
import Operations from "@/app/components/doctor/operations/Operations";
import Consultation from "@/app/components/doctor/consultation/Consultation";
import Modify from "@/app/components/doctor/modify/Modify";
import { useEffect , useState } from "react";
import axiosService from "@/app/helpers/axios";

export default function Patient() {

  const [patient,setPatient] = useState({});
  const path = window.location.pathname;

    // Split the path by '/' to get an array of path segments
    const segments = path.split('/');

    // The last segment contains the ID
    const id = segments.pop();

    console.log(id);
  useEffect(() => {
    // // Get the current URL path
    // const path = window.location.pathname;

    // // Split the path by '/' to get an array of path segments
    // const segments = path.split('/');

    // // The last segment contains the ID
    // const id = segments.pop();

    // console.log(id);

    // // Now you have access to the id variable which contains the ID from the URL
    
    axiosService.get(`/patient/${id}`).then((res) => {
      console.log(res.data);
      setPatient(res.data);
    }).catch((err) => {
      console.log(err);
    })


  }, []);
  return (
    <>
      <div className="doctorView">
        <div id="generalInfos" className="generalInfos active">
           <GeneralInfos patient={patient} />
        </div>
        <div id="modify" className="modify unActive">
           <Modify />
        </div>
        <div id="history" className="history unActive">
         <History />
        </div>
        <div id="radios" className="radios unActive">
         <Radios />
        </div>
        <div id="analyses" className="analyses unActive">
          <Analyses patient_id={id} />
        </div>
        <div id="operations" className="operations unActive">
         <Operations />
        </div>
        <div id="consultation" className="consultation unActive">
         <Consultation />
        </div>
      </div>
    </>
  );
}
