
import { Login, Token } from '@mui/icons-material';
import React,{useEffect, useState} from "react";
import './App.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const App = ()=> {
  
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
  
      try {
        let response = await fetch("http://localhost:3333/authenize", {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': 'Bearer ' + token
          }
        });
  
        const data = await response.json();
  
        if (data.status === 'authen success') {
          // Token ถูกต้อง
          alert(data.status);
        } else {
          // Token ไม่ถูกต้อง
          alert(data.message);
          localStorage.removeItem('token');
          window.location = '/login';
        }
      } catch (error) {
        console.error('Error:', error);
        // จัดการข้อผิดพลาดที่นี่ (เช่น alert หรือลิงค์ไปหน้า login)
        alert('Authentication error. Please log in again.');
        window.location = '/login';
      }
    }
  
    checkToken();
  }, []);
  return (
    <div className='App-container'> {(console.log(localStorage.getItem('token')==null))}
        <button className='App-bottonc' onClick={()=>{localStorage.removeItem('token');localStorage.removeItem('Id');localStorage.removeItem('Addressshow'); window.location.reload();}}>X</button>
    </div>
  );
}

export default App;
