'use client'
import "../../styles/doctor/home.css";
import { useState } from "react";

export default function Doctor() {
  return (
    <>
      <div>
        <div className="homeDiv">
          <form>
          <label>
            Entrer Matricule du patient : 
          </label>
          <input placeholder="matricule ..." required></input>
          </form>
        </div>
      </div>
    </>
  );

}