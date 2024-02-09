
import React,{useState} from "react";
import './Loginregis.modules.css'
import u_icon from '../Assets/picture/user.png'
import e_icon from '../Assets/picture/envelope.png'
import p_icon from '../Assets/picture/password.png'
import eyepass from '../Assets/picture/view.png'
import eyepassslash from '../Assets/picture/hide.png'
import logo from '../Assets/picture/2YRONOBG.png'
import { useNavigate } from 'react-router-dom';
const Register =() =>{
   
    const [vistionpass,setvision]= useState(false) //สถานะรูป icon password และการเปลี่ยน ประเภทของรหัสผ่าน
    const routepage =useNavigate();//การ route ให้ไปยังหน้าต่างๆ ต้อง import useNavigate จาก react-router-dom
   
    const [inputemail,setemail] = useState('');
    const [inputpass,setpass] = useState('');
    const [intputn,setname]=useState(null);

    async function register(){
        console.warn(inputemail,inputpass,intputn);
        let item ={
            email:inputemail,
            password:inputpass,
            name:intputn
        }
        let anwser = await fetch("http://localhost:3333/register-api",{
            method:'POST',
            mode:'cors',
            headers:{
                "Content-Type":"application/json"
            ,"Accept":"application/json"
            },
            body:JSON.stringify(item)
            

        })
        const data = await anwser.json();
        
         if (data.state === 'success') {
            alert(data.message)
            routepage('/login')
        } else if(data.message.errno==1062) {
            let datamis ="have email already";
            alert(datamis)
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
                <img src={u_icon} alt="" className="icon" />
                <input type="text" placeholder="Fisrtname-lastname" onChange={(e)=>{setname(e.target.value)}} />
            </div>
            
            <div className="input">
                <img src={e_icon} alt="" className="icon" />
                <input type="email" placeholder="email"  onChange={(e)=>{setemail(e.target.value)}}/>
            </div>
            <div className="input">
                <img src={p_icon} alt="" className="icon" />
                <input type={vistionpass===false ?"password":"text"} placeholder="password" onChange={(e)=>{setpass(e.target.value)}} />
                <img src={vistionpass ? eyepass : eyepassslash} alt="" className="eyeicon" onClick={()=>{setvision(!vistionpass)}}/>
                
               
            </div>
            
            <div className="input input-date">
            <input type= "date" />
            </div>
           <div className="login" onClick={()=>{routepage('/Login');}}>ล็อคอิน</div>
           
            <div className="policy">นโยบายความเป็นส่วนตัว</div>
            
            <div className="submit-container">
                <button className="submit" onClick={register} >Sign Up</button>
               
            </div>
            
            
            
            
        </div>
       
           




    </div>
    )
}
export default Register