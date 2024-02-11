import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Showstonk.css'
import logo1 from '../Assets/picture/2YRONOBGshop.png';
import logo_img from '../Assets/picture/logo.png';
import cart_icon from '../Assets/picture/cart.png'
import login_icon from '../Assets/picture/login-icon.png'



const Showstonk = () => {

    const gogo=(number)=>
        {
            localStorage.setItem('product-one-show',number);
            routepage('/shop');
        }
    
    const [datindex, setdataindex] = useState([]);
    let categories;
    
    if (localStorage.getItem('product-one-show') == 1) {
   
      categories = [
        
        { id: 1, name: 'ไม้ยืนต้น' },
        { id: 2, name: 'ไม้พุ่ม' },
        { id: 3, name: 'ไม้คลุมดิน' },
        { id: 4, name: 'ไม้ประดับ' },
        { id: 5, name: 'ไม้เลื้อย' },
        { id: 6, name: 'ไม้น้ำ' },
        { id: 7, name: 'พืชสวนครัว' },
        { id: 8, name: 'พืชสมุนไพร' },
        { id: 9, name: 'ไม้ดอก' },
        { id: 10, name: 'ไม้มงคล' },
      ];
    }
      if (localStorage.getItem('product-one-show') == 2){
        
        categories = [
            { id: 11, name: 'อุปกรณ์เพาะปลูก' },
            { id: 12, name: 'อุปกรณ์ตัดแต่ง' },
            { id: 13, name: 'อุปกรณ์ดูแลสวน' },
            
          ];
        }
     if((localStorage.getItem('product-one-show') == 3)){
        
        categories = [
            { id: 14, name: 'ปุ๋ยอินทรีย์' },
            { id: 15, name: 'ปุ๋ยเคมี' },
            { id: 16, name: 'ดิน' },
            { id: 17, name: 'แกลบ' },
            
          ];
        }
 if((localStorage.getItem('product-one-show') == 4)){
        
        categories = [
            { id: 18, name: 'สารเคมีใช้กำจัดแมลง' },
            { id: 19, name: 'สารกำจัดสัตว์ฟันแทะ' },
            { id: 20, name: 'สารกำจัดเชื้อรา' },
          ];
    }
    
    const routepage =useNavigate();
    const [dataShows, setDataShows] = useState([]);
    const [databutton, setdatabutton] = useState([]);
    

    useEffect(() => {

        
        if(localStorage.getItem('product-one-show')==1){
            setdataindex(1);
        }
        if(localStorage.getItem('product-one-show')==2){
            setdataindex(11);
        }
        if(localStorage.getItem('product-one-show')==3){
            setdataindex(14);
        }
        if(localStorage.getItem('product-one-show')==4){
            setdataindex(18);
        }
        //ดึงข้อมูลมาmap เพื่อสร้างปุ่ม
        const fetchDatabuttonCategory = async () => {
            let id = localStorage.getItem('product-one-show')
            try {
                const result = await fetch(`http://localhost:3333/products-by-id/${id}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
                const data = await result.json();
                if (data.status === 'success') {
                    setdatabutton(data.productData);
                } else {
                    console.log("oopp");
                    alert(data.message);
                    return [];
                }
            } catch (error) {
                console.error('Error:', error);
                
                
            }
        }
        

        //ดึงค่า สินค้าข้างในมาแสดง
        const fetchDataForCategory = async (categoryId) => {
            try {
                const result = await fetch(`http://localhost:3333/products-by-sub-id/${categoryId}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
                const data = await result.json();
                if (data.status === 'success') {
                    return data.productData;
                } else {
                    alert(data.message);
                    return [];
                }
            } catch (error) {
                console.error('Error:', error);
                
                
            }
        }

        const fetchDataForAllCategories = async () => {
            const promises = categories.map(category => fetchDataForCategory(category.id));
            const data = await Promise.all(promises);
            setDataShows(data);
        }

        fetchDataForAllCategories();
        fetchDatabuttonCategory();
    }, []);

    return (
        <>
            <header className='app-header'>
                <div className="header-bar">
                    <a href=''>
                        <img src={logo_img} alt='logo' className='logo-img'  onClick={() => routepage('/')}/>
                    </a>
                    <div className="menu-bar">
                        <ul>
                            <li><a href="" onClick={()=>gogo(1)}>พรรณไม้</a></li>
                            <li><a href="" onClick={()=>gogo(2)}>อุปกรณ์แต่งสวน</a></li>
                            <li><a href="" onClick={()=>gogo(3)}>ปุ๋ย</a></li>
                            <li><a href="" onClick={()=>gogo(4)}>สารเคมี</a></li>
                        </ul>
                    </div>
                    <div className="app-header-right">
                        {(localStorage.getItem('token')!=null)?(<img src={login_icon} alt="" className='login-icon' />):(<a href="" className='login-header' onClick={()=>routepage('/login')}>Log in</a>)}
                        <img src={cart_icon} alt="cart-icon" className='cart-header'/>
                        
                    </div>
                    {localStorage.getItem('token')==null?<div></div>:(<div className="show-user-menu">
                            <div className="show-route-profile" onClick={()=>{routepage('/profile')}}>โปรไฟล์</div>
                            <div className="show-route-profile" onClick={()=>{localStorage.removeItem('token');localStorage.removeItem('Id');localStorage.removeItem('Addressshow'); window.location.reload();}}>ออกจากระบบ</div>
                    </div>)}
                </div>
            </header>
            <div className="Show-stonk-container">
                <div className="show-body-container">
                    <div className="showstonk-menubar">
                        <div className="header-in-menubar">ประเภทของต้นไม้</div>
                            {databutton && dataShows && databutton.map((buttonItem, buttonIndex) => (
                            <div key={buttonIndex} className="button-type-showstonk">
                                {buttonItem.sub_product_type}
                            </div>))}
                    </div>
                    <div className="showstonk-menu">
                        {categories.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="header-all-product" id="yourId">
                                <div className="header-name-product">{category.name}</div>
                                <div className="product-row">
                                    {dataShows[categoryIndex] && dataShows[categoryIndex].map((product, index) => (
                                        <div key={index} className="product-row-box" onClick={()=>{{localStorage.setItem('product-one-show',categoryIndex+datindex);localStorage.setItem('id_product',index);routepage('/showproduct');}}}>
                                            <p>{product.product_name}</p>
                                            <img src={require(`../Assets/picture/${product.picture}`)} className='picture-in-oneshowproduct' alt="" />
                                            <p>คงเหลือ : {product.remaining}</p>
                                            <p>ราคา : {product.product_prices} บาท</p>
                                        </div>))}
                                </div>
                            </div>))}
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default Showstonk;
