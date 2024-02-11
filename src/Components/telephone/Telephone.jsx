import React,{useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import './Telephone.css'

import logo from '../Assets/picture/2YRONOBGAddress.png'
import dropdown from'../Assets/picture/down.png'
import pencill from '../Assets/picture/pencil.png'
import Acceptlogo from '../Assets/picture/check-mark.png'
import rejectlogo from '../Assets/picture/rejected.png'
import trash from '../Assets/picture/trash-can.png'
const  Telephone =()=>{

    const [textorin,setss]=useState(-1);
    const [menudropdown,setmenudropdrow]=useState(true);
    //แก้ไขข้อมูล
    const [phomealter,setphomealter]=useState(null);
    const [phonenum, setphonenum] = useState(null);
    const [statephone,setstatephone] =useState(-1);
    // ลบข้อมูล
    const[deletephone,setdeletephon] =useState(-1);

//เพิ่มข้อมูลเบอร์
    const [addphone,setaddphone] = useState(true);
    const [phoneinput,setphoneinput] =useState(null);
    const [useStatephoneadd,setuseStatephonead] =useState(true);
    
   
    
    if(localStorage.getItem('Addressshow')==null){
        localStorage.setItem('Addressshow',0);
    }
    const routepage = useNavigate();
    
    useEffect (()=>{
        const detectoken =async()=>
            {
                const token = localStorage.getItem('token')
                let id =localStorage.getItem('Id');
                try{
                       const result = await fetch("http://localhost:3333/authenize",{
                        method:'POST',
                        mode:'cors',
                        headers:{
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            'Authorization': 'Bearer ' + token
                        }
                        
                       }) 
                       const data = await result.json();
                       if (data.status === 'authen success') {
                        // Token ถูกต้อง
                        fetchphonenum();
                        
                      
                        // recieveData(data.emailintoken);
                        
                        
                      } else {
                        // Token ไม่ถูกต้อง
                        alert(data.message);
                        localStorage.removeItem('token');
                        window.location = '/login';
                      }

                }catch(error){
                        console.error('Error:', error);
                // จัดการข้อผิดพลาดที่นี่ (เช่น alert หรือลิงค์ไปหน้า login)
                        alert('Authentication error. Please log in again.');
                         window.location = '/login';
                }
            }        
            detectoken(); 
           
                  
    },[]);
    const fetchphonenum =async()=>{
        let Id =localStorage.getItem('Id');
        try{ let result = await fetch(`http://localhost:3333/address-info-profile-phone/${Id}`,{
            method:'GET',
            mode:'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            let data =await result.json();
            if (data.status === 'success') {
                setphonenum(data.data);
                } else {
                    alert(data.message);
                }

        }catch(error)
        {
            console.error('Error:', error);
            alert('Error fetching address data.');
        }

    }
    const add_phone_num =async()=>{
        let Id = localStorage.getItem('Id');
        let item ={
            phone_num:phoneinput,
            cus_id:Id 
        }
        try{ let result = await fetch(`http://localhost:3333/add-phone-number/`,{
            method:'POST',
            mode:'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                    },
            body:JSON.stringify(item
            )})
            alert('เพิ่มเบอร์'+phoneinput+'เรียบร้อยแล้ว');
            window.location.reload();

        }catch(error){
            console.error('Error:', error);
            alert('Error fetching address data.');
        }

    }
    const alrterphone =async()=>{
        
        let item ={
            phone_new:phoneinput
        }
        try{ let result = await fetch(`http://localhost:3333/update-address-phone/${phomealter}`,{
            method:'PUT',
            mode:'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                    },
            body:JSON.stringify(item)
            })
            
            alert('แก้ไขเรียบร้อย');
            window.location.reload();
        }catch(error){
            console.error('Error:', error);
            alert('Error fetching address data.');
        }

        
    }
    const delete_mphone = async()=>
    {   
        try{ let result = await fetch(`http://localhost:3333/delete/phonenum/${phomealter}`,{
            method:'DELETE',
            mode:'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                    }
            
            })
            alert('ลบเบอร์'+phomealter+'เรียบร้อยแล้ว');
            window.location.reload();

        }catch(error){
            console.error('Error:', error);
            alert('Error fetching address data.');
        }

        
        

    }
    

    return(
        <div className="Address-container">
            <div className="Address-body">
                <div className="Address-leftsidebody">
                    <form action="" className="Address-leftsidebody-form">
                        <div className="show-phone-container">
                        <div className="header-phoneshow">เบอร์โทรศัพท์</div>
                        {phonenum && phonenum.map((phone_num, index) => (
                                (<div key={index} className="phone_show-intele">
                                    <div className="telephone-container-phone-num">
                                    {!(statephone==index)?<div className="phone-sp">{phone_num.phone_num}</div>:<input type="text" onChange={(e)=>{setphoneinput(e.target.value);setphomealter(phone_num.phone_num);console.log(phone_num.phone_num);}}/>}
                                    {!(textorin==index)?(<img src={pencill} alt="" className="Address-pencil" onClick={()=>{setss(index);setstatephone(index);}}/>)
                                :(<div className="telephone-address-button-ck"><img src={Acceptlogo} alt=" " className="Address-button-ck" onClick={()=>{alrterphone();setstatephone(-1);setss(-1);}}/>
                                <img src={rejectlogo} alt="" className="Address-button-ck" onClick={()=>{setstatephone(-1);setss(-1);}}/>
                                </div>)}
                                {!(deletephone==index)?(<img src={trash} alt="" className="Address-pencil" onClick={()=>{setphomealter(phone_num.phone_num);setdeletephon(index);}}/>)
                                :(<div className="telephone-address-button-ck"><img src={Acceptlogo} alt=" " className="Address-button-ck" onClick={()=>{delete_mphone();setdeletephon(-1);}}/>
                                <img src={rejectlogo} alt="" className="Address-button-ck" onClick={()=>{setdeletephon(-1);}}/>
                                </div>)}</div>
                                </div>)   
                            ))}
                            {addphone?<div></div>:<input type="text" className="telephone-input-number" onChange={(e)=>{setphoneinput(e.target.value);}} onClick={()=>{setuseStatephonead(false);}}></input>}
                            {addphone?<div className="summit-button-telephoneadd" onClick={()=>{setaddphone(!addphone)}}>เพิ่มเบอร์โทร</div>:<div className="summit-button-telephoneadd" onClick={()=>{setaddphone(!addphone);setuseStatephonead(true);}}>ยกเลิก</div>}</div>
                            {(useStatephoneadd)?(<div></div>):(<div className="show-phone-containerx"><img src={Acceptlogo} alt=" " className="telephone-button-ck" onClick={()=>{add_phone_num();setaddphone(!addphone);setuseStatephonead(!useStatephoneadd);}}/>
                                <img src={rejectlogo} alt="" className="telephone-button-ck" onClick={()=>{setuseStatephonead(!useStatephoneadd);setaddphone(!addphone);}}/></div>)}
                    </form>
                </div>
                <div className="Address-rightsidebody">
                    <div className="Address-rightsidebody-header">
                        <img src={logo} alt="" className="Addresslogo" onClick={()=>routepage('/')} />
                    </div>
                    <div className="Address-profilelist">
                        <img src={dropdown} alt="" className={menudropdown?"Address-profilelist-dropdown":"Address-profilelist-dropdown-click"}  onClick={()=>setmenudropdrow(!menudropdown)}/>
                        {/* <img src= {require('../Assets/picture/hide.png')} alt="" /> */}
                            <div className="Address-profilelistshow">
                                บัญชีผู้ใช้
                                { menudropdown ? <div className="Address-profilelistshownone"></div>:
                                <ul className="Address-profilelistshownone-listonlist">
                                    <li className="Address-profilelistshownone-listonlist-sublist" onClick={()=>routepage('/profile')}>ข้อมูลผู้ใช้ </li>
                                    <li className="Address-profilelistshownone-listonlist-sublist" onClick={()=>routepage('/Address')}>ที่อยู่</li >
                                    <li  className="Address-profilelistshownone-listonlist-sublist">เบอร์โทรศัพท์</li >
                                </ul>}
                                <div className="Address-profilelist-order" onClick={()=>routepage('/order')}>รายการสั่งซื้อ</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
export default Telephone