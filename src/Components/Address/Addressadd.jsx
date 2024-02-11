import React,{useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import './Addressadd.css'

import logo from '../Assets/picture/2YRONOBGAddress.png'
import dropdown from'../Assets/picture/down.png'
import pencill from '../Assets/picture/pencil.png'
import Acceptlogo from '../Assets/picture/check-mark.png'
import rejectlogo from '../Assets/picture/rejected.png'


const  Addressadd = ()=> {

    const [textorin,setss]=useState(true);
    const [menudropdown,setmenudropdrow]=useState(true);
    const [phonenum, setphonenum] = useState(null);
    const [data_all, setdata] = useState(null);
    const [addressData, setAddressData] = useState(null);
    const [inputname,setname] =useState('');
    
    if(localStorage.getItem('Addressshow')==null){
        localStorage.setItem('Addressshow',0);
    }
    const routepage = useNavigate();
    
    useEffect (()=>{
        const detectoken =async()=>{
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
                if(data.status === 'authen success'){
                    // Token ถูกต้อง
                    console.log(data.emailintoken)
                    recieveData(data.emailintoken);
                    fecthphoneNumber(id);
                    fetchAddressData(data.emailintoken);  
                } 
                else{
                    // Token ไม่ถูกต้อง
                    alert(data.message);
                    localStorage.removeItem('token');
                    window.location = '/login';
                }
            }
            catch(error){
                console.error('Error:', error);
                // จัดการข้อผิดพลาดที่นี่ (เช่น alert หรือลิงค์ไปหน้า login)
                alert('Authentication error. Please log in again.');
                 window.location = '/login';
            }
        }        
        detectoken();            
    },[]);
    const recieveData = async (email)=>{
        try{
            let data_get = await fetch(`http://localhost:3333/address-info-profile/${email}`,{
                method:'GET',
                mode:'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const data = await data_get.json();
            console.log(data);
            if (data.status === 'success'){
                console.log(data.status);
                setdata(data.data);
                console.log(data_all);
                let id = data_all?.[0]?.cus_id;
                console.log(id); 
            } else{
                alert(data.message);
            }
        } catch(error){
            console.error('Error:', error);
        }
    }
    const fecthphoneNumber = async (Id)=> {
        try{ let resphone = await fetch(`http://localhost:3333/address-info-profile-phone/${Id}`,{
            method:'GET',
            mode:'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        const data = await resphone.json();
        if(data.status === 'success'){
            setphonenum(data.data);
            
            console.log(phonenum);
        }else {
            console.log('error')
        }}
        catch(error){
            console.error('Error:', error);
            alert('Error fetching address data.');
        }
    }
    const fetchAddressData = async (email) => {
        try {
            let response = await fetch(`http://localhost:3333/address-info/${email}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const data = await response.json();
            if (data.status === 'success') {
                setAddressData(data.addressData);
            } else {
                
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const altername =async ()=>{
        let id=localStorage.getItem('Id');
        try{    
            console.warn(inputname);
            let item={
                name:inputname
            }
            let usenamr = await fetch(`http://localhost:3333/update-customer-name/${id}`,{
                method:'PUT',
                mode:'cors',
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body:JSON.stringify(item)
            })
            const data = await usenamr.json();
            if(data.status=="success"){
                console.log(data.message);
                alert('แก้ไขชื่อสำเร็จ');
                window.location.reload();
            }
            else {
                console.log(data.status);
            }
        }catch(error){
            console.error('Error:', error);
        }
    }
    

    return(
        <div className="Address-container">
            <div className="Address-body">
                <div className="Address-leftsidebody">
                    <form action="" className="Address-leftsidebody-form">
                        <div className="Address-head"> 
                            <div className="Address-head-text">
                                <text className="Address-text1"> ข้อมูลส่วนตัว</text>
                                <text className="Address-text2">จัดการข้อมูลส่วนตัวเพื่อความปลอดภัย</text>
                            </div>
                        </div>
                        <div className="nameAddressinform">
                            <text className="nameinform">ชื่อ</text>
                            <div className="Address-managename">
                                {textorin ?(<text className="class-getname">{data_all?.map(item => item.cus_name).join(', ')}</text>) :(<div className="input-change-name"><input type="text" className='nameinform-input' onChange={(e)=>{setname(e.target.value)}} /></div>)}
                                {textorin ?(<img src={pencill} alt="" className="Address-pencil" onClick={()=>setss(!textorin)}/>) :(<div><img src={Acceptlogo} alt=" " className="Address-button-ck" onClick={()=>{altername();setss(!textorin);recieveData(data_all?.map(item => item.cus_email).join(', '));window.location.reload();}}/><img src={rejectlogo} alt="" className="Address-button-ck" onClick={()=>{setname(null);setss(!textorin);}}/></div>)}
                            </div>
                        </div>
                        <div className="emailAddressinform">
                            <text className="emailinform">อีเมล</text>
                            <div className="Address-manageemail">
                                <text  className="emailinform-input">{data_all?.map(item => item.cus_email).join(', ')}</text>
                            </div>
                        </div>
                        <div className="Address-Addressinprofile">
                            <div className="Address-Addressinprofileheader">
                                ที่อยู่
                            </div>
                            <div className="Address-Addressinprofile-Address">
                                {addressData && addressData.length > 0 && (
                                <div className="Insert-Addressinprofile-Address">
                                    <div>เลขที่บ้าน : {addressData[localStorage.getItem('Addressshow')].house_num}</div>
                                    <div>หมู่ : {addressData[localStorage.getItem('Addressshow')].village}</div>
                                    <div>หมู่บ้าน : {addressData[localStorage.getItem('Addressshow')].vilth_name} ({addressData[localStorage.getItem('Addressshow')].vileng_name})</div>
                                    <div>รหัสไปรษณ์ : {addressData[localStorage.getItem('Addressshow')].postcode} </div>
                                    <div>ตำบล : {addressData[localStorage.getItem('Addressshow')].namesub_th} </div>
                                    <div>อำเภอ : {addressData[localStorage.getItem('Addressshow')].nameth} </div>
                                    <div>จังหวัด : {addressData[localStorage.getItem('Addressshow')].name_thai} </div>
                                    <div>ภาค : {addressData[localStorage.getItem('Addressshow')].name_geo} </div>
                                </div>)}    
                            </div>
                        </div>
                            <div className="Address-telephonshow">
                                <div className="Address-telephone-header">
                                    เบอร์โทรศัพท์
                                    </div>
                                    <div className="Address-telephone-shownumberon">{phonenum?.map(item => item.phone_num).join(', ')}</div>
                            </div>
                    </form>
                </div>
                <div className="Address-rightsidebody">
                    <div className="Address-rightsidebody-header">
                        <img src={logo} alt="" className="Addresslogo" onClick={()=>routepage('/')}/>
                    </div>
                    <div className="Address-profilelist">
                        <img src={dropdown} alt="" className={menudropdown?"Address-profilelist-dropdown":"Address-profilelist-dropdown-click"}  onClick={()=>setmenudropdrow(!menudropdown)}/>
                        <div className="Address-profilelistshow">
                            บัญชีผู้ใช้
                            { menudropdown ? <div className="Address-profilelistshownone" />:
                            <ul className="Address-profilelistshownone-listonlist">
                                <li className="Address-profilelistshownone-listonlist-sublist" >ข้อมูลผู้ใช้</li>
                                <li className="Address-profilelistshownone-listonlist-sublist" onClick={()=>routepage('/Address')}>ที่อยู่</li >
                                <li  className="Address-profilelistshownone-listonlist-sublist" onClick={()=>routepage('/Phone')}>เบอร์โทรศัพท์</li >
                            </ul>}
                            <div className="Address-profilelist-order" onClick={()=>routepage('/order')}>
                                รายการสั่งซื้อ
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Addressadd