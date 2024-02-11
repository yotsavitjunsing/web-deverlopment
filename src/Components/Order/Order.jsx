import React,{useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import './Order.css'

import logo from '../Assets/picture/2YRONOBGAddress.png'
import dropdown from'../Assets/picture/down.png'
import pencill from '../Assets/picture/pencil.png'
import Acceptlogo from '../Assets/picture/check-mark.png'
import rejectlogo from '../Assets/picture/rejected.png'


const  Order = ()=> {

    const [textorin,setss]=useState(true);
    const [menudropdown,setmenudropdrow]=useState(true);
    const [phonenum, setphonenum] = useState(null);
    const [data_all, setdata] = useState(null);
    const [addressData, setAddressData] = useState(null);
    const [inputname,setname] =useState('');
    const [order,set_order]=useState('');
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
        fetch_order();           
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
    const fetch_order = async () => {
        let id = localStorage.getItem('Id');
        try {
            let response = await fetch(`http://localhost:3333/order-get/${id}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const data = await response.json();
            if (data.status === 'success') {
                set_order(data.data);
                console.log(data.data);
            } else {
                
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const submit_orders = async (id) => {
        let item={
            order_status:"รับสินค้าเรียบร้อย",
            order_id:id
        }
        
        try {
            let response = await fetch(`http://localhost:3333/summit_orders`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body:JSON.stringify(item)
            });
            const data = await response.json();
            if (data.status === 'success') {
               
            } else {
                
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
   
    

    return(
        <div className="Address-container">
            <div className="Address-body">
                <div className="Address-leftsidebody">
                    <form action="" className="Address-leftsidebody-form">
                    <div className="order_show_all_data">
                    {Array.isArray(order) ? (
                    order.map((item, index) => (
                        <div className="data_in_order" key={index} data={item}>
                            <div className="order_show_all_left"><img src={require(`../Assets/picture/${item.picture}`)} className='picture_inorder' alt="" /></div>
                            <div className="order_show_all_right">
                                <div>ชื่อสินค้า : {item.product_name}</div>
                                <div>จำนวนชิ้น : {item.bought} ชิ้น</div>
                                <div>ราคารวม : {item.total_price} บาท</div>
                                <div>สถานะ : {item.order_status}</div>
                                {item.order_status=='กำลังจัดส่ง'?<div className="order-show-all-button" onClick={()=>{submit_orders(item.order_id)}}>ยืนยัน</div>:<div></div>}
                                
                                
                            </div>
                        </div>
                    ))
                    ) : (
                    <p>ไม่มีออเดอร์.</p>
                    )}
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
                                <li className="Address-profilelistshownone-listonlist-sublist" onClick={()=>routepage('/profile')} >ข้อมูลผู้ใช้</li>
                                <li className="Address-profilelistshownone-listonlist-sublist" onClick={()=>routepage('/Address')}>ที่อยู่</li >
                                <li  className="Address-profilelistshownone-listonlist-sublist" onClick={()=>routepage('/Phone')}>เบอร์โทรศัพท์</li >
                            </ul>}
                            <div className="Address-profilelist-order">
                                รายการสั่งซื้อ
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Order