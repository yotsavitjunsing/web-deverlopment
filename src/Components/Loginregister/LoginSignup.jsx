import React,{useEffect, useState} from "react";
import './Loginregis.modules.css'

import e_icon from '../Assets/picture/envelope.png'
import p_icon from '../Assets/picture/password.png'
import eyepass from '../Assets/picture/view.png'
import eyepassslash from '../Assets/picture/hide.png'
import logo from '../Assets/picture/2YRONOBG.png'
import {  useNavigate } from 'react-router-dom';


const LoginSignup =() =>{
    
    
    const [vistionpass,setvision]= useState(false)
    const routepage = useNavigate();
    
    const [inputemail,setemail] = useState('');
    const [inputpass,setpass] = useState('');
    
    
async function login(){
    console.warn(inputemail,inputpass);
    let item={
        email:inputemail,
        password:inputpass
    }
    let result = await fetch("http://localhost:3333/login-api",{
        method:'POST',
        mode: 'cors',
        headers:{
            "Content-Type":"application/json"
            ,"Accept":"application/json"
        },
        body:JSON.stringify(item)
        
    });
    
    const data = await result.json();
        
         if (data.status === 'valid') {
            alert(data.message)
            localStorage.setItem("token", JSON.stringify(data.tokens));
            localStorage.setItem("Id", JSON.stringify(data.cus_id));
            console.log('success');
            routepage('/')
        } else {
            // ล็อกอินไม่สำเร็จ
            alert(data.message)
            console.log('unsuccess');
        }
     }
 




    

    return (
    <div className="container">
        <div className="regis-header">
        <img src={logo} alt="Logo" className="logo" />
            
            <div className="under"></div>
        </div>
        <div className="inputs">
            
            
            <div className="input">
                <img src={e_icon} alt="" className="icon" />
                <input type="email" placeholder="email" onChange={(e)=>setemail(e.target.value)}/>
            </div>
            <div className="input">
                <img src={p_icon} alt="" className="icon" />
                <input type={vistionpass===false ?"password":"text"} placeholder="password" onChange={(e)=>setpass(e.target.value)}/>
                <img src={vistionpass ? eyepass : eyepassslash} alt="" className="eyeicon" onClick={()=>{setvision(!vistionpass)}}/>
                
               
            </div>
            
            <div className="signup" onClick={()=>{routepage('/register');}}>สมัครสมาชิก</div>
            
            <div className="submit-container">
                
                <div className="submit" onClick={login}>Login</div>
            </div>
            
            
            
            
        </div>
       
           




    </div>)
}
export default LoginSignup