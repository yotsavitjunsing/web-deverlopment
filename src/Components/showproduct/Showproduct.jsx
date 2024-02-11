import logo_img from '../Assets/picture/logo.png';

import { useNavigate } from 'react-router-dom';
import './Showproduct.css'
import { useEffect, useState  } from 'react';

import cart_icon from '../Assets/picture/cart.png'
import login_icon from '../Assets/picture/login-icon.png'

function Showproduct() {
    window.history.pushState(null, null, '/showproduct');
    const gogo=(number)=>
        {
            localStorage.setItem('product-one-show',number);
            routepage('/shop');
        }
    const [data_show,setdatashow]= useState(null);
    useEffect(() => {
        
        const getOnlyProduct = async () => {
            let product_id =localStorage.getItem('product-one-show');
            let show_item =localStorage.getItem('id_product');
            try {
                const result = await fetch(`http://localhost:3333/product-by-sub-id-and-index/${product_id}/${show_item}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
                const data = await result.json();
                if (data.status === 'success') {
                    setdatashow(data.productData);
                    console.log(data.productData);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error fetching product data.');
            }
        }
    
        getOnlyProduct();
       
    }, []); 
    const routepage = useNavigate();
    const [amout, setAmout] = useState(1);
    const [numberupdown, setNumberupdown] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [cost_all,set_cost_all]=useState("");
    const [pro_id,set_pro_id]=useState("");
    
    const [data_item,setdate_item] =useState(false);
    const [stateamout,setstateamout]=useState(false);
   
    if(amout <=0 ){
        setAmout(1)
    }
    const checkproducts= (remaining)=>{
        if(localStorage.getItem('token')==null){
            routepage('/login')
        }else{
            if(amout>remaining)
            {
                alert("สินค้าไม่เพียงพอ")
            }
            else {
                
                
                console.log(amout);
                console.log(pro_id[0]);
                console.log(cost_all)
                 
                update_product(remaining-amout,pro_id[0])
                update_order();
            }
                        
                        
                       
                    
            }
        
    }
    const update_order = async () => {
        let customer_id =localStorage.getItem('Id');
        let item ={
            order_status:"กำลังจัดส่ง"
            ,cus_id:customer_id
            
        }
        try {
            const result = await fetch(`http://localhost:3333/add-order`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body:JSON.stringify(item)
            });
            const data = await result.json();
            if (data.status === 'success') {
                update_orderdetail(data.ID);
                
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching product data.');
        }
    }
    const update_orderdetail = async (id) => {
        let customer_id =localStorage.getItem('Id');
        let item ={
            order_id:id,
            product_id:pro_id[0],
            total_price:cost_all,
             bought:amout
            
        }
        try {
            const result = await fetch(`http://localhost:3333/add-orderdetails`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body:JSON.stringify(item)
            });
            const data = await result.json();
            if (data.status === 'success') {
                
                
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching product data.');
        }
    }
    const update_product = async (decreace_pro,pro_id) => {
        let customer_id =localStorage.getItem('Id');
        let item ={
            remaining:decreace_pro,
            product_id:pro_id
            
        }
        try {
            const result = await fetch(`http://localhost:3333/add-update_products`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body:JSON.stringify(item)
            });
            const data = await result.json();
            if (data.status === 'success') {
               
                
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching product data.');
        }
    }
    
    return(
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
            <div className="container-showproduct">
                <div className="showproduct">
                    <div className="showproduct-img">
                        <img src={data_show?.map(item => require(`../Assets/picture/${item.picture}`))} className='picture-in-oneshowproduct' alt="" />
                    </div>
                    <div className="showproduct-data">
                        <h3>ชื่อสินค้า : {data_show?.map(item => item.product_name)}</h3>
                        <p>คำอธิบายสินค้า : {data_show?.map(item => item.description_product)}</p>
                        <div>ราคาต้นละ : {data_show?.map(item => item.product_prices)} บาท</div>
                        <div>คงเหลือ : {data_show?.map(item => item.remaining)}</div>
                        
                        
                        <div className="showproduct-data-bot">
                       
                            <div className="showproduct-updown">
                                <div className="showproductbox" onClick={() => { setAmout(amout - 1); setNumberupdown(true); setdate_item(false);}}>
                                    -
                                </div>
                                {numberupdown ? <div className="showproductbox" onClick={() => setNumberupdown(false)}>{amout}</div> : <input type="number" pattern="\d*" oninput="this.value = this.value.replace(/[^0-9]/g, '');" onChange={(e) => {setAmout(parseInt(e.target.value));setdate_item(false);}}></input>}
                                <div className="showproductbox" onClick={() => { setAmout(amout + 1); setNumberupdown(true);setdate_item(false); }}>
                                    +
                                </div>
                            </div>
                            
                            <div className="showproduct-addtocart">
                                {data_item?<button onClick={()=>{set_pro_id(data_show?.map(item => item.product_id));checkproducts(data_show?.map(item => item.remaining));setdate_item(false);}} >Add To Cart</button>:<div></div>}
                                <div className="subnit-amount" onClick={()=>{set_cost_all(data_show?.map(item => item.product_prices)*amout);set_pro_id(data_show?.map(item => item.product_id));setAmout(amout); setNumberupdown(true);setdate_item(true);}}>ยืนยันจำนวน</div>
                                
                            </div>
                            
                        </div>
                        <div className='total-price'><p>ราคารวม :{data_show?.map(item => item.product_prices)*amout} บาท</p></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Showproduct;