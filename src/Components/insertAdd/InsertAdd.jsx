import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import './InsertAdd.css'
import pencill from '../Assets/picture/pencil.png'
import logo from '../Assets/picture/2YRONOBGAddress.png'
import dropdown from'../Assets/picture/down.png'
import pencil from '../Assets/picture/pencil.png'
import Acceptlogo from '../Assets/picture/check-mark.png'
import rejectlogo from '../Assets/picture/rejected.png'
import trash from '../Assets/picture/trash-can.png'

const  InsertAdd =()=>{

    const [openpen,setop]=useState(-1);
    const [menudropdown,setmenudropdrow]=useState(true);
    const [iemail,setemail] =useState('');
    const [addressData, setAddressData] = useState(null);
    const [house_num,sethouse_num]=useState(null);
    //ใช้สำหรับปรับ ภาค
    const [geo_state,setgeo]=useState(null);
    const [editgeo,seteditgeo]=useState(-1);
    const [selectedGeo, setSelectedGeo] = useState('');
    //ใช้สำหรับปรับ จังหวัด 
    const [provinces,setprovinces]  =useState(null);
    const [stateprovinces,setstateprovinces]  =useState(-1);
    const [recipo,setrecipo]  =useState('');
    //ใช้สำหรับปรับ อำเภอ
    const [district,setdistrict]  =useState(null);
    const [statedistrict,setsdistrict]  =useState(-1);
    const [recidistrict,setrecidistrict]  =useState('');
    //ใช้สำหรับปรับ ตำบล 
    const [subdistrict,setsubdistrict]  =useState(null);
    const [substatedistrict,setssubdistrict]  =useState(-1);
    const [subrecidistrict,setrecisubdistrict]  =useState('');
    //เปลี่ยนสถานะปุ่ม submit
    const [statusbuttons,setstatus] = useState(true);
    //แก้ไขหมู่บ้าน
    const [villagestate,setvillagestate] =useState(-1);
    const [village_num,setvillnum] = useState(1);
    const [villageth,setvillageth]=useState('');
    const [villageng,setvillageng]=useState('');
    //เพิ่มข้อมูลในที่อยู่
    const [address_button,setaddress_button] =useState(true);
    const [addstate,setaddresss] = useState(true);
    const [address_pro,setaddress_pro] =useState(true);
    const [address_dis,setaddress_dis] =useState(true);
    const [address_sub,setaddress_sub] =useState(true);
    const [address_house,setaddress_house] =useState('');
    const [address_village,setaddress_village] =useState('');
    const [address_villageth,setaddress_villageth] =useState('');
    const [address_villageen,setaddress_villageen] =useState('');
    const [address_geo,setaddress_geo] = useState('');
    //ลบข้อมูล
    const [address_delete,setdelete]=useState(null);
    const [address_deletestate,setdeletestate]=useState(true);
    


    
    
    
    const routepage =useNavigate();
    const handleChangeGeo = (e) => {
      const selectedValue = e.target.value;
      provinces_getdata(selectedValue);
      setSelectedGeo(selectedValue);
      const selectedGeoObject = geo_state.find((geo) => geo.name_geo === selectedValue);
            if (selectedGeoObject) {
              setaddress_geo(selectedGeoObject.id_geo);
              console.log(address_geo);
            }
      };
    const handleChangeprovince =(e)=>{
      const selectedValue = e.target.value;
      disticts_getdata(selectedValue);
      setrecipo(selectedValue)
      

    }
    const handleChangedistrict =(e)=>{
      const selectedValue = e.target.value;
      subdisticts_getdata (selectedValue);
      setrecipo(selectedValue)
      
        setstatus(false);
      
      

    }
    
    const resetvaliue =()=>{
          
          seteditgeo(-1);
          setSelectedGeo('');
          setprovinces(null);
          setstateprovinces(-1);
          setrecipo('');
          setsdistrict(-1);
          setrecidistrict('');
          setsubdistrict(null);
          setssubdistrict(-1);
          setrecisubdistrict('');
          setaddress_pro(true);
          setaddress_dis(true);
          setaddress_sub(true);
          setaddress_button(true);
          localStorage.removeItem('Addressshow');
      

    }
    
    
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
              
              fetchAddressData(data.emailintoken);
              setemail(data.emailintoken);
              console.log(data.emailintoken)
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
        geo_getdata();
        
        
      }, []);
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
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching address data.');
        }
    };
    const updatehouse_num = async()=>{
      let id =localStorage.getItem('Addressshow')
      let house_numr ={
        house_num:house_num
      }
      try{ let result = await fetch(`http://localhost:3333/update-address-profile/${iemail}/${id}`,{
          method:'PUT',
          mode:'cors',
          headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"

          },
          body:JSON.stringify(house_numr)
          })
          const data = await result.json();
            if (data.status === 'success') {
              console.log(data.message)
              alert("แก้ไขสำเร็จ");
              window.location.reload();
            } else {
                alert(data.message);
            }


      }catch(error)
      {   console.error('Error:', error);
          alert('Error fetching address data.');
          }

    }
    const geo_getdata = async () => {
      try {
          let result = await fetch(`http://localhost:3333/recieve_geo`, {
              method: 'GET',
              mode: 'cors',
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
              }
          });

          const data = await result.json();
          if (data.status === 'success') {
              setgeo(data.data);
              console.log(geo_state);
              
          } else {
              alert(data.message);
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Error fetching address data.');
      }
  };
  const provinces_getdata = async (selectedGeo_A) => {
    
    
    try {
        let result = await fetch(`http://localhost:3333/recieve_provinces?geo_name=${selectedGeo_A}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            
        });
        

        const data = await result.json();
        console.log(data);
        setprovinces(data.data);
        if (data.status === 'success') {
          if(address_pro){
            setaddress_pro(false)
          }
          setstateprovinces(localStorage.getItem('Addressshow'));
            console.log(provinces);
            
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching address data.');
    }
};
const disticts_getdata = async (recidata) => {
    
    
  try {
      let result = await fetch(`http://localhost:3333/recieve_distisct?provinces_name=${recidata}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          
      });
      

      const data = await result.json();
      console.log(data);
      setrecidistrict(data.data);
      
      if (data.status === 'success') {
        if(address_dis){
          setaddress_dis(false)
        }
        console.log(recidistrict)
        setsdistrict(localStorage.getItem('Addressshow'));
         
          
      } else {
          alert(data.message);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Error fetching address data.');
  }
};
const subdisticts_getdata = async (recieve_distisct) => {
    
    
  try {
      let result = await fetch(`http://localhost:3333/recieve_subdistisct?distisct_name=${recieve_distisct}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
          
      });
      

      const data = await result.json();
      console.log(data);
      setrecisubdistrict(data.data);
      
      if (data.status === 'success') {
        if(address_sub){
          
          setaddress_sub(false)
        }
        console.log(subrecidistrict)
        setssubdistrict(localStorage.getItem('Addressshow'));
         
          
      } else {
          alert(data.message);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Error fetching address data.');
  }
};
const updatehouse_address = async()=>{
  let id =localStorage.getItem('Addressshow')
  let subdistict ={
    sub_dist:subdistrict
  }
  try{ let result = await fetch(`http://localhost:3333/update-address-alterall/${iemail}/${id}`,{
      method:'PUT',
      mode:'cors',
      headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"

      },
      body:JSON.stringify(subdistict)
      })
      const data = await result.json();
        if (data.status === 'success') {
          
          console.log(data.message)
          alert("แก้ไขสำเร็จ");
          window.location.reload();
          resetvaliue();
        } else {
            alert(data.message);
        }


  }catch(error)
  {   console.error('Error:', error);
      alert('Error fetching address data.');
      }

};
const update_village = async()=>{
  let id =localStorage.getItem('Addressshow')
  let village ={
    village:village_num,
    village_th:villageth,
    village_eng:villageng
    
  }
  try{ let result = await fetch(`http://localhost:3333/update-address-village/${iemail}/${id}`,{
      method:'PUT',
      mode:'cors',
      headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"

      },
      body:JSON.stringify(village)
      })
      const data = await result.json();
        if (data.status === 'success') {
          console.log(data.message)
          alert("แก้ไขสำเร็จ");
          window.location.reload();
        } else {
            alert(data.message);
        }


  }catch(error)
  {   console.error('Error:', error);
      alert('Error fetching address data.');
      }

}
const add_address = async()=>{
  let id =localStorage.getItem('Id')
  let address ={
    house_num:address_house,
    id_geo:address_geo,
    village: address_village,
    vilth_name: address_villageth,
    vileng_name: address_villageen,
    subdis_id: subdistrict,
    cus_id: id
    
  }
  try{ let result = await fetch(`http://localhost:3333/insert-address-input`,{
      method:'POST',
      mode:'cors',
      headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"

      },
      body:JSON.stringify(address)
      })
      const data = await result.json();
        if (data.status === 'success') {
          console.log(data.message)
          alert("เพิ่มสำเร็จ");
          window.location.reload();
        } else {
            alert(data.message);
        }


  }catch(error)
  {   console.error('Error:', error);
      alert('Error fetching address data.');
      }

}
const delete_adress = async()=>{
 
  try{ let result = await fetch(`http://localhost:3333/delete-address/${address_delete}`,{
      method:'DELETE',
      mode:'cors',
      headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"

      }
    
      })
      const data = await result.json();
        if (data.status === 'success') {
          console.log(data.message)
          alert("ลบสำเร็จ");
          window.location.reload();
        } else {
            alert(data.message);
        }


  }catch(error)
  {   console.error('Error:', error);
      alert('Error fetching address data.');
      }

}
  
    
    

    return(
        <div className="Address-container">
           
            <div className="Address-body">
                
                
                    <div className="Address-leftsidebody">
                        
                        <form action="" className="InsertAdd-leftsidebody-form">
                          <div className="header-inform-address">
                        <div className="Insert-Address-from">ที่อยู่</div>
                        {addstate?<div className="Add-address-insert" onClick={()=>{setaddresss(!addstate);resetvaliue();}}>เพิ่มที่อยู่</div>:<div className="Add-address-insert" onClick={()=>{setaddresss(!addstate);resetvaliue();}}>ยกเลิก</div>}
                        {(address_button)?<div></div>:<div className="Add-address-insert" onClick={()=>{add_address();setaddresss(!addstate);resetvaliue();}}>บันทึก</div>}
                        </div>
                       {addstate?<div className="add-address-form"></div>
                       :<div className="input-address-inform"><input className="name-input-address" placeholder="กรอกบ้านเลขที่" onChange={(e)=>{setaddress_house(e.target.value)}} ></input>
                       <input className="name-input-address" placeholder="กรอกเลขหมู่" onChange={(e)=>{setaddress_village(parseInt(e.target.value))}}></input>
                       <input className="name-input-address" placeholder="ชื่อหมู่บ้านภาษาไทย" onChange={(e)=>{setaddress_villageth(e.target.value)}}></input>
                       <input className="name-input-address" placeholder="ชื่อหมู่บ้านภาษาอังกฤษ" onChange={(e)=>{setaddress_villageen(e.target.value)}}></input>
                                  <div className="adress-input-change-provinces">
                                  <div className="adress-input-change-provinces">
                                
                                       
                                {(address_sub)?  <div> </div>:<div className="select-option-geo"><select value={subdistrict} onChange={(e) => setsubdistrict(e.target.value)} onClick={()=> setaddress_button(false)} > <option value="">เลือกภูมิภาค</option>
                                  {subrecidistrict.map((subrecidistrict,index) => (
                                      <option key={index} value={subrecidistrict.subdis_id}>
                                        {subrecidistrict.namesub_th}
                                        {console.log(subdistrict)}
                                      </option>
                                  ))}</select></div>}
                                    </div>
                                    <div className="adress-input-change-provinces">
                                
                                        
                                          {(address_dis)? <div></div>:<div className="select-option-geo"><select value={district} onClick={handleChangedistrict} onChange={handleChangedistrict} > <option value="">เลือกภูมิภาค</option>
                                          {recidistrict.map((recidistrict,index) => (
                                          <option key={index} value={recidistrict.nameth}>
                                          {recidistrict.nameth}
                                         
                                        </option>
                                      ))}</select></div>}
                                   </div>
                                        
                                      {(address_pro)? <div> </div>:<div className="select-option-geo"><select value={recipo} onClick={handleChangeprovince} onChange={handleChangeprovince}  > <option value="">เลือกภูมิภาค</option>
                                        {provinces.map((provinces,index) => (
                                          <option key={index} value={provinces.name_thai}>
                                            {provinces.name_thai}
                                          
                                          </option>
                                        ))}</select>
                                      </div>}
                                  </div>
                                  
                                   <div className="select-option-geo"><select value={selectedGeo} onChange={handleChangeGeo} onClick={handleChangeGeo} > <option value="">เลือกภูมิภาค</option>
                                      {geo_state.map((geo) => (
                                        <option key={geo.id_geo} value={geo.name_geo}>
                                          {geo.name_geo}
                                          
                                        </option>
                                      ))}</select></div>
                                   
                       
                       </div>}
                       
                        {addressData && addressData.map((address, index) => (
                        <div key={index} className="Insert-Addressinprofile-Address">
                            
                              <div className="adress-input-change-housenum">
                                        {!(openpen==index)?(<div >เลขที่บ้าน: {address.house_num}</div>):(<div className="input-change-name"><input type="text" className='nameinform-input' onChange={(e)=>{sethouse_num(e.target.value)}} /></div>)}
                                        {!(openpen==index)?(<img src={pencill} alt="" className="Address-pencil" onClick={()=>{localStorage.setItem('Addressshow',index);setop(index)}}/>):(<div><img src={Acceptlogo} alt=" " className="Address-button-ck" onClick={()=>{updatehouse_num();setop(-1);}}/>
                                              <img src={rejectlogo} alt="" className="Address-button-ck" onClick={()=>{sethouse_num(null);setop(-1);console.log(address.address_id);}}/></div>)}
                              </div>
                              <div className="alter-village">
                              {!(villagestate==index)?<div><div>หมู่:{address.village}</div>
                              <div>หมู่บ้าน: {address.vilth_name} ({address.vileng_name})</div>
                              </div>:<div><input type="text" placeholder="กรอกหมายเลขหมู่" onChange={(e)=>setvillnum(e.target.value)} /><input type="text" placeholder="ชื่อหมู่บ้านไทย" onChange={(e)=>setvillageth(e.target.value)}/><input type="text" placeholder="ชื่อหมู่บ้านอังกฤษ" onChange={(e)=>setvillageng(e.target.value)}/></div>}
                              {!(villagestate==index)?(<img src={pencill} alt="" className="Address-pencil" onClick={()=>{setvillagestate(index);localStorage.setItem('Addressshow',index);}}/>):(<div><img src={Acceptlogo} alt=" " className="Address-button-ck" onClick={()=>{update_village();setvillagestate(-1);}}/>
                                              <img src={rejectlogo} alt="" className="Address-button-ck" onClick={()=>{setvillagestate(-1);}}/></div>)}
                              </div>
                              <div>รหัสไปรษณ์: {address.postcode} </div>
                              <div className="adress-input-change-provinces">
                                {!(substatedistrict==index)?  <div>ตำบล: {address.namesub_th} </div>:<div className="select-option-geo"><select value={subdistrict} onChange={(e) => setsubdistrict(e.target.value)} > <option value="">เลือกภูมิภาค</option>
                                  {subrecidistrict.map((subrecidistrict,index) => (
                                    <option key={index} value={subrecidistrict.subdis_id}>
                                      {subrecidistrict.namesub_th}
                                      {console.log(subdistrict)}
                                    </option>
                                  ))}</select>{statusbuttons?<div></div>:<button onClick={()=>{updatehouse_address(); resetvaliue();}}>บันทึก</button>}</div>}
                                    </div>

                              <div className="adress-input-change-provinces">
                                
                                        
                                    {!(statedistrict==index)? <div>อำเภอ: {address.nameth} </div>:<div className="select-option-geo"><select value={district} onClick={handleChangedistrict} onChange={handleChangedistrict} > <option value="">เลือกภูมิภาค</option>
                                      {recidistrict.map((recidistrict,index) => (
                                        <option key={index} value={recidistrict.nameth}>
                                          {recidistrict.nameth}
                                         
                                        </option>
                                      ))}</select></div>}
                                        </div>
                              

                              <div className="adress-input-change-provinces">
                                
                                        
                                      {!(stateprovinces==index)? <div>จังหวัด: {address.name_thai} </div>:<div className="select-option-geo"><select value={recipo} onClick={handleChangeprovince} onChange={handleChangeprovince}  > <option value="">เลือกภูมิภาค</option>
                                        {provinces.map((provinces,index) => (
                                          <option key={index} value={provinces.name_thai}>
                                            {provinces.name_thai}
                                          
                                          </option>
                                        ))}</select>
                                      </div>}
                                        </div>
                              <div className="adress-input-change-housenum">
                                     {!(editgeo==index)? <div>ภาค: {address.name_geo} <img src={pencil} alt="" className="pencil-insertAddress" onClick={()=>{seteditgeo(index);localStorage.setItem('Addressshow',index);}} /> </div>:<div className="select-option-geo"><select value={selectedGeo} onChange={handleChangeGeo} onClick={handleChangeGeo} > <option value="">เลือกภูมิภาค</option>
                                      {geo_state.map((geo) => (
                                        <option key={geo.id_geo} value={geo.name_geo}>
                                          {geo.name_geo}
                                          
                                        </option>
                                      ))}</select><img src={rejectlogo} alt="" className="Address-button-ck" onClick={()=>{resetvaliue()}}/></div>}
                                    
                              </div>
                              <div className="button-set-address-main">
                                <div onClick={()=>{localStorage.removeItem('Addressshow');localStorage.setItem('Addressshow',index); alert('ตั้งเป็นที่อยู่แรกแล้ว');routepage('/profile');}} className="button-set-address">ตั้งเป็นที่อยู่แรก</div>
                                {address_deletestate?<img src={trash} alt="" className="trash-button-delete-address" onClick={()=>{setdelete(address.address_id);setdeletestate(!address_deletestate);}}/>:(<div><img src={Acceptlogo} alt=" " className="Address-button-ck" onClick={()=>{delete_adress();setdeletestate(!address_deletestate)}}/>
                                              <img src={rejectlogo} alt="" className="Address-button-ck" onClick={()=>{setdelete(null);setdeletestate(!address_deletestate);}}/></div>)}
                                
                                
                                </div> 
                              </div>
                        ))}
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
                                        <li className="Address-profilelistshownone-listonlist-sublist" onClick={()=>routepage('/profile')} >ข้อมูลผู้ใช้</li>
                                        <li className="Address-profilelistshownone-listonlist-sublist" >ที่อยู่</li >
                                        <li  className="Address-profilelistshownone-listonlist-sublist" onClick={()=>routepage('/Phone')}>เบอร์โทรศัพท์ </li >
                                    </ul>}
                                    <div className="Address-profilelist-order" onClick={()=>routepage('/order')}>
                                รายการสั่งซื้อ
                                 </div>
                                    </div>
                                </div>
                               
                        
                    
                        
                    </div>
               
                
            </div>

        </div>
        
    );
}
export default InsertAdd