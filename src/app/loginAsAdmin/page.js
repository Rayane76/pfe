'use client'
import { useRouter } from "next/navigation";
import "../styles/register.css"
import { useState } from "react";
import axios from "axios";


export default function LoginAsAdmin(){

    const router = useRouter();

    // const handleSubmit = async (e) => {

    //     e.preventDefault();
    //     router.push("/admin/doctor")
    // }

    const [data,setData] = useState({
        id:"",
        password:"",
    })

    const handleSubmit = (e) =>{
        e.preventDefault()

        console.log("DATA",data)
        axios
        .post("http://127.0.0.1:8000/api/login/",data)
        .then((res)=>{
            localStorage.setItem("auth",JSON.stringify({
                id:res.data.id,
                refresh:res.data.refresh,
                access:res.data.access,
                role:res.data.role
            }))

            router.push("/admin/doctor")



        })
        .catch((err)=>{
            console.log('err',err.request.response)
        })

    }

    const handleInput = (e) => {
        setData((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    return(
        <>
<div className="container">
        <header>Sign Up</header>
        <div className="form-outer">
            <form action="#">
                <div className="slide">
                    <div className="field">
                        <div className="label">Matricule</div>
                        <input type="text" name="id" onChange={(e)=>handleInput(e)} />
                    </div>
                    <div className="field">
                        <div className="label">Password</div>
                        <input type="password" name="password" onChange={(e)=>handleInput(e)} />
                    </div>
                    <div className="field">
                        <button type="sumbit" className="next" onClick={(e)=>handleSubmit(e)}>Submit</button>
                    </div>
                    </div>
                    </form>
                    </div>
        </div>
        </>
    )
}